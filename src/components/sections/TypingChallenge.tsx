"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Timer,
  Zap,
  Target,
  Trophy,
  RotateCcw,
  Medal,
  Flame,
  CheckCircle2,
  AlertCircle,
  Keyboard,
  ArrowRight,
  Sparkles,
  X,
  Loader2,
} from "lucide-react";
import { ShinyText } from "@/components/ui/ShinyText";
import { supabase } from "@/lib/supabase";

// =============================================================================
// TYPING PASSAGES
// Predefined natural, engaging sentences referencing Prabhav's actual engineering,
// projects (AgentLens, Artist Color Lab, AEROVA), software architecture, and design.
// =============================================================================
const PORTFOLIO_PASSAGES = [
  "Architecting autonomous AI observability platforms requires intercepting model prompts, instrumenting background tool calls, and visualizing decision tree flow graphs in real time without introducing UI latency.",
  "Translating digital screen palettes into physical acrylic mixing recipes bridges computational color algorithms with tactile studio inventory, calculating exact proportional paint ratios for working artists.",
  "Real-time domestic airfare indexing captures high-frequency yield management shifts, transforming DGCA passenger traffic volume and advance purchase booking horizons into transparent economic intelligence.",
  "Exceptional digital products emerge when clean architectural state management, responsive layout composition, and human-centered design principles unite into one cohesive, accessible experience.",
  "Decomposing complex distributed problems into intuitive interfaces requires disciplined frontend engineering, modular component systems, and relentless performance optimization under load.",
  "From rapid hackathon prototyping to production grade web architecture, true software craftsmanship lies in building tools that solve genuine problems with elegance and measurable impact.",
  "Interactive web applications feel alive when smooth micro-animations, intentional typography hierarchy, and subtle glassmorphic lighting harmonize into a compelling narrative.",
  "Solving challenging algorithmic problems demands clear mathematical reasoning, resilient data structures, and the persistent curiosity to explore what lies beyond standard solutions.",
];

export interface LeaderboardEntry {
  id: string;
  name: string;
  wpm: number;
  accuracy: number;
  characters?: number;
  duration?: number;
  created_at?: string;
}

// Deduplicate leaderboard entries by person's name (case-insensitive) keeping only their single highest score
function deduplicateLeaderboard(entries: LeaderboardEntry[]): LeaderboardEntry[] {
  const map = new Map<string, LeaderboardEntry>();
  for (const entry of entries) {
    const key = entry.name.trim().toLowerCase();
    const existing = map.get(key);
    if (!existing) {
      map.set(key, entry);
    } else {
      if (
        entry.wpm > existing.wpm ||
        (entry.wpm === existing.wpm && entry.accuracy > existing.accuracy)
      ) {
        map.set(key, entry);
      }
    }
  }
  return Array.from(map.values()).sort(
    (a, b) => b.wpm - a.wpm || b.accuracy - a.accuracy
  );
}

export function TypingChallenge() {
  // Game states: 'idle' (enter name) | 'playing' (30s sprint) | 'completed' (show result)
  const [gameState, setGameState] = useState<"idle" | "playing" | "completed">("idle");
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");

  // Passage & Typing progress
  const [passageIndex, setPassageIndex] = useState(0);
  const [typedText, setTypedText] = useState("");

  // Cumulative tracking for typists who complete an entire passage within 30s
  const [completedCorrectChars, setCompletedCorrectChars] = useState(0);
  const [completedTotalChars, setCompletedTotalChars] = useState(0);

  // 30-Second Countdown Timer
  const CHALLENGE_DURATION = 30;
  const [timeLeft, setTimeLeft] = useState(CHALLENGE_DURATION);

  // Refs for rock-solid timing and state consistency across events/visibility
  const startTimeRef = useRef<number | null>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const hasCompletedRef = useRef<boolean>(false);

  // Synchronized refs for event callbacks & tab visibility listeners
  const typedTextRef = useRef<string>("");
  const passageRef = useRef<string>("");
  const nameRef = useRef<string>("");
  const completedCorrectRef = useRef<number>(0);
  const completedTotalRef = useRef<number>(0);

  // Hidden typing input ref
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll Parallax (Continuous, bidirectional, responsive to up/down)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const yBackground = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const yHeader = useTransform(scrollYProgress, [0, 1], [-12, 12]);
  const yCard = useTransform(scrollYProgress, [0, 1], [18, -18]);
  const yLeaderboard = useTransform(scrollYProgress, [0, 1], [10, -10]);

  // Leaderboard data & state
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isLoadingLeaderboard, setIsLoadingLeaderboard] = useState(false);
  const [isSubmittingScore, setIsSubmittingScore] = useState(false);
  const [isSubmittedSuccess, setIsSubmittedSuccess] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [userSubmittedId, setUserSubmittedId] = useState<string | null>(null);
  const [userRank, setUserRank] = useState<number | null>(null);
  const [finalStats, setFinalStats] = useState<{
    wpm: number;
    accuracy: number;
    charsTyped: number;
  } | null>(null);

  // Select current passage
  const currentPassage = useMemo(() => {
    return PORTFOLIO_PASSAGES[passageIndex % PORTFOLIO_PASSAGES.length];
  }, [passageIndex]);

  // Keep refs synchronized
  useEffect(() => {
    typedTextRef.current = typedText;
  }, [typedText]);

  useEffect(() => {
    passageRef.current = currentPassage;
  }, [currentPassage]);

  useEffect(() => {
    nameRef.current = name;
  }, [name]);

  useEffect(() => {
    completedCorrectRef.current = completedCorrectChars;
  }, [completedCorrectChars]);

  useEffect(() => {
    completedTotalRef.current = completedTotalChars;
  }, [completedTotalChars]);

  // Check if Supabase client is genuinely configured with non-placeholder credentials
  const isSupabaseLive = useMemo(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    return Boolean(url && key && !url.includes("placeholder-url"));
  }, []);

  // Fetch top 10 leaderboard entries from Supabase (deduplicated per person)
  const loadLeaderboard = useCallback(async () => {
    if (!isSupabaseLive) return;
    setIsLoadingLeaderboard(true);
    try {
      // 1. Try querying the dedicated typing_leaderboard view (already distinct per person)
      const { data: viewData, error: viewError } = await supabase
        .from("typing_leaderboard")
        .select("id, name, wpm, accuracy, characters, duration, created_at")
        .order("wpm", { ascending: false })
        .order("accuracy", { ascending: false })
        .limit(10);

      if (!viewError && viewData) {
        setLeaderboard(deduplicateLeaderboard(viewData as LeaderboardEntry[]).slice(0, 10));
        return;
      }

      // 2. Fallback to raw typing_scores table with client-side deduplication
      const { data: tableData, error: tableError } = await supabase
        .from("typing_scores")
        .select("id, name, wpm, accuracy, characters, duration, created_at")
        .order("wpm", { ascending: false })
        .order("accuracy", { ascending: false })
        .limit(50);

      if (!tableError && tableData) {
        setLeaderboard(deduplicateLeaderboard(tableData as LeaderboardEntry[]).slice(0, 10));
      }
    } catch {
      // Graceful fallback
    } finally {
      setIsLoadingLeaderboard(false);
    }
  }, [isSupabaseLive]);

  // Initial leaderboard fetch on mount
  useEffect(() => {
    let isSubscribed = true;
    const fetchScores = async () => {
      if (!isSupabaseLive) return;
      setIsLoadingLeaderboard(true);
      try {
        const { data: viewData, error: viewError } = await supabase
          .from("typing_leaderboard")
          .select("id, name, wpm, accuracy, characters, duration, created_at")
          .order("wpm", { ascending: false })
          .order("accuracy", { ascending: false })
          .limit(10);

        if (isSubscribed && !viewError && viewData) {
          setLeaderboard(deduplicateLeaderboard(viewData as LeaderboardEntry[]).slice(0, 10));
          setIsLoadingLeaderboard(false);
          return;
        }

        const { data: tableData, error: tableError } = await supabase
          .from("typing_scores")
          .select("id, name, wpm, accuracy, characters, duration, created_at")
          .order("wpm", { ascending: false })
          .order("accuracy", { ascending: false })
          .limit(50);

        if (isSubscribed && !tableError && tableData) {
          setLeaderboard(deduplicateLeaderboard(tableData as LeaderboardEntry[]).slice(0, 10));
        }
      } catch {
        // Fallback gracefully
      } finally {
        if (isSubscribed) {
          setIsLoadingLeaderboard(false);
        }
      }
    };

    void fetchScores();

    return () => {
      isSubscribed = false;
    };
  }, [isSupabaseLive]);

  // Prabhav's personal score is queried directly from actual leaderboard submissions by name "Prabhav"
  const prabhavBestEntry = useMemo(() => {
    return leaderboard.find((entry) => entry.name.trim().toLowerCase() === "prabhav") || null;
  }, [leaderboard]);

  // Live WPM & Accuracy during gameplay (pure calculation based on state)
  const stats = useMemo(() => {
    if (gameState !== "playing") {
      return { charsTyped: 0, correctChars: 0, wpm: 0, accuracy: 100 };
    }

    let currentCorrect = 0;
    for (let i = 0; i < typedText.length; i++) {
      if (typedText[i] === currentPassage[i]) {
        currentCorrect++;
      }
    }

    const totalCorrect = completedCorrectChars + currentCorrect;
    const totalTyped = completedTotalChars + typedText.length;

    const elapsedSeconds = CHALLENGE_DURATION - timeLeft;
    const elapsedMinutes = elapsedSeconds > 0 ? elapsedSeconds / 60 : 0.001;

    // Standard typing calculation: (correct characters / 5) / minutes
    // WPM begins cleanly once at least 1 second has elapsed
    const liveWpm =
      elapsedSeconds >= 1 && totalTyped > 0
        ? Math.min(250, Math.max(0, Math.round(totalCorrect / 5 / elapsedMinutes)))
        : 0;

    const liveAccuracy =
      totalTyped > 0
        ? Math.min(100, Math.max(0, Math.round((totalCorrect / totalTyped) * 100)))
        : 100;

    return {
      charsTyped: totalTyped,
      correctChars: totalCorrect,
      wpm: liveWpm,
      accuracy: liveAccuracy,
    };
  }, [gameState, typedText, currentPassage, completedCorrectChars, completedTotalChars, timeLeft, CHALLENGE_DURATION]);

  // Submit score to Supabase
  const submitScore = useCallback(
    async (
      participantName: string,
      statsToSubmit: { wpm: number; accuracy: number; charsTyped: number }
    ) => {
      const sanitizedName = participantName.trim().slice(0, 30);
      if (!sanitizedName) return;

      if (isSupabaseLive) {
        setIsSubmittingScore(true);
        setIsSubmittedSuccess(false);
        setSubmissionError(null);

        try {
          const { data, error } = await supabase
            .from("typing_scores")
            .insert([
              {
                name: sanitizedName,
                wpm: statsToSubmit.wpm,
                accuracy: statsToSubmit.accuracy,
                characters: statsToSubmit.charsTyped,
                duration: CHALLENGE_DURATION,
              },
            ])
            .select("id")
            .single();

          if (error) {
            setSubmissionError("Score could not be saved to global leaderboard.");
          } else if (data?.id) {
            setUserSubmittedId(data.id);
            setIsSubmittedSuccess(true);
            await loadLeaderboard();

            // Calculate exact rank across unique participants
            try {
              const { count, error: rankErr } = await supabase
                .from("typing_leaderboard")
                .select("*", { count: "exact", head: true })
                .or(
                  `wpm.gt.${statsToSubmit.wpm},and(wpm.eq.${statsToSubmit.wpm},accuracy.gt.${statsToSubmit.accuracy})`
                );

              if (!rankErr && count !== null) {
                setUserRank(count + 1);
              } else {
                const { count: rawCount } = await supabase
                  .from("typing_scores")
                  .select("*", { count: "exact", head: true })
                  .or(
                    `wpm.gt.${statsToSubmit.wpm},and(wpm.eq.${statsToSubmit.wpm},accuracy.gt.${statsToSubmit.accuracy})`
                  );
                setUserRank((rawCount ?? 0) + 1);
              }
            } catch {
              setUserRank(null);
            }
          }
        } catch {
          setSubmissionError("Leaderboard is temporarily unavailable.");
        } finally {
          setIsSubmittingScore(false);
        }
      } else {
        // Fallback for offline / unconfigured database
        const localEntry: LeaderboardEntry = {
          id: `local-${Date.now()}`,
          name: sanitizedName,
          wpm: statsToSubmit.wpm,
          accuracy: statsToSubmit.accuracy,
          characters: statsToSubmit.charsTyped,
        };
        setUserSubmittedId(localEntry.id);
        setIsSubmittedSuccess(false);
        setLeaderboard((prev) => {
          const combined = deduplicateLeaderboard([...prev, localEntry]);
          return combined.slice(0, 10);
        });
        setUserRank(1);
      }
    },
    [isSupabaseLive, loadLeaderboard, CHALLENGE_DURATION]
  );

  // Single-completion guard & score finalization
  const finishChallenge = useCallback(() => {
    if (hasCompletedRef.current) return;
    hasCompletedRef.current = true;

    // Stop timer interval immediately
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    startTimeRef.current = null;

    // Release focus / dismiss mobile virtual keyboard
    inputRef.current?.blur();
    setTimeLeft(0);

    const currentTyped = typedTextRef.current;
    const currentPassageStr = passageRef.current;

    let currentCorrect = 0;
    for (let i = 0; i < currentTyped.length; i++) {
      if (currentTyped[i] === currentPassageStr[i]) {
        currentCorrect++;
      }
    }

    const totalCorrect = completedCorrectRef.current + currentCorrect;
    const totalTyped = completedTotalRef.current + currentTyped.length;

    // Standard 30s WPM: (correct characters / 5) / (30s / 60s) = (totalCorrect / 5) / 0.5 minutes
    const calculatedWpm = Math.min(250, Math.max(0, Math.round(totalCorrect / 5 / 0.5)));
    const calculatedAccuracy =
      totalTyped > 0
        ? Math.min(100, Math.max(0, Math.round((totalCorrect / totalTyped) * 100)))
        : 100;
    const calculatedChars = Math.min(1500, Math.max(0, totalTyped));

    const frozenStats = {
      wpm: calculatedWpm,
      accuracy: calculatedAccuracy,
      charsTyped: calculatedChars,
    };

    setFinalStats(frozenStats);
    setGameState("completed");

    const participantName = nameRef.current.trim().slice(0, 30);
    if (participantName) {
      void submitScore(participantName, frozenStats);
    }
  }, [submitScore]);

  // Clean timer loop using absolute timestamps as source of truth
  const startChallengeTimer = useCallback(() => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }

    hasCompletedRef.current = false;
    startTimeRef.current = Date.now();
    setTimeLeft(CHALLENGE_DURATION);

    timerIntervalRef.current = setInterval(() => {
      if (!startTimeRef.current || hasCompletedRef.current) {
        if (timerIntervalRef.current) {
          clearInterval(timerIntervalRef.current);
          timerIntervalRef.current = null;
        }
        return;
      }

      const elapsedMs = Date.now() - startTimeRef.current;
      const remaining = Math.max(0, Math.ceil((CHALLENGE_DURATION * 1000 - elapsedMs) / 1000));
      setTimeLeft(remaining);

      if (elapsedMs >= CHALLENGE_DURATION * 1000) {
        finishChallenge();
      }
    }, 100);
  }, [finishChallenge, CHALLENGE_DURATION]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
    };
  }, []);

  // Exit / Cancel current active challenge
  const handleExit = useCallback(() => {
    hasCompletedRef.current = true;
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    startTimeRef.current = null;

    inputRef.current?.blur();
    setTypedText("");
    setCompletedCorrectChars(0);
    setCompletedTotalChars(0);
    setTimeLeft(CHALLENGE_DURATION);
    setUserSubmittedId(null);
    setUserRank(null);
    setSubmissionError(null);
    setIsSubmittedSuccess(false);
    setFinalStats(null);
    setGameState("idle");
  }, [CHALLENGE_DURATION]);

  // Browser Tab Visibility handling: if user leaves and returns, timer reflects real elapsed time
  useEffect(() => {
    if (gameState !== "playing") return;

    const handleVisibilityChange = () => {
      if (document.hidden) return;
      if (!startTimeRef.current || hasCompletedRef.current) return;
      const elapsedMs = Date.now() - startTimeRef.current;
      if (elapsedMs >= CHALLENGE_DURATION * 1000) {
        finishChallenge();
      } else {
        const remaining = Math.max(0, Math.ceil((CHALLENGE_DURATION * 1000 - elapsedMs) / 1000));
        setTimeLeft(remaining);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [gameState, finishChallenge, CHALLENGE_DURATION]);

  // Desktop keyboard focus helper: refocus input if focus was lost during active test
  useEffect(() => {
    if (gameState !== "playing") return;

    const handleWindowKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement === inputRef.current) return;

      const target = e.target as HTMLElement | null;
      if (
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable ||
        document.querySelector('[role="dialog"]')
      ) {
        return;
      }

      if (e.ctrlKey || e.metaKey || e.altKey) return;

      if (e.key === "Escape") {
        handleExit();
        return;
      }

      if (e.key.length === 1 || e.key === "Backspace") {
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleWindowKeyDown);
    return () => {
      window.removeEventListener("keydown", handleWindowKeyDown);
    };
  }, [gameState, handleExit]);

  // Start Challenge flow
  const handleStart = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (gameState === "playing") return;

    const trimmed = name.trim();
    if (!trimmed) {
      setNameError("Please enter your name to start.");
      return;
    }
    if (trimmed.length < 2) {
      setNameError("Name must be at least 2 characters.");
      return;
    }
    if (trimmed.length > 30) {
      setNameError("Name cannot exceed 30 characters.");
      return;
    }

    setNameError("");
    setTypedText("");
    setCompletedCorrectChars(0);
    setCompletedTotalChars(0);
    setUserSubmittedId(null);
    setUserRank(null);
    setSubmissionError(null);
    setIsSubmittedSuccess(false);
    setFinalStats(null);
    setGameState("playing");

    startChallengeTimer();

    inputRef.current?.focus();
    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  };

  // Restart current active challenge with a fresh 30-second timer and next passage
  const handleRestart = () => {
    if (gameState !== "playing") return;

    setTypedText("");
    setCompletedCorrectChars(0);
    setCompletedTotalChars(0);
    setUserSubmittedId(null);
    setUserRank(null);
    setSubmissionError(null);
    setIsSubmittedSuccess(false);
    setFinalStats(null);
    setPassageIndex((prev) => prev + 1);

    startChallengeTimer();

    inputRef.current?.focus();
    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  };

  // Try again from result state: creates a clean attempt immediately
  const handleTryAgain = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }

    setPassageIndex((prev) => prev + 1);
    setTypedText("");
    setCompletedCorrectChars(0);
    setCompletedTotalChars(0);
    setUserSubmittedId(null);
    setUserRank(null);
    setSubmissionError(null);
    setIsSubmittedSuccess(false);
    setFinalStats(null);
    setGameState("playing");

    startChallengeTimer();

    inputRef.current?.focus();
    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });

    void loadLeaderboard();
  };

  // Retry submitting score if network failed
  const handleRetrySubmit = () => {
    const participantName = nameRef.current.trim().slice(0, 30);
    if (finalStats && participantName) {
      void submitScore(participantName, finalStats);
    }
  };

  // Keyboard and mobile input handler
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (gameState !== "playing" || hasCompletedRef.current || timeLeft <= 0) return;
    const value = e.target.value;

    if (value.length <= currentPassage.length) {
      setTypedText(value);

      // If user typed the entire passage before 30s, accumulate and rotate seamlessly
      if (value.length === currentPassage.length) {
        let pCorrect = 0;
        for (let i = 0; i < value.length; i++) {
          if (value[i] === currentPassage[i]) pCorrect++;
        }
        setCompletedCorrectChars((prev) => prev + pCorrect);
        setCompletedTotalChars((prev) => prev + value.length);
        setPassageIndex((prev) => prev + 1);
        setTypedText("");
        if (inputRef.current) {
          inputRef.current.value = "";
        }
      }
    }
  };

  return (
    <section
      id="typing-challenge"
      ref={sectionRef}
      className="pt-16 sm:pt-20 md:pt-24 pb-20 md:pb-28 relative z-10 overflow-hidden text-white"
      aria-label="Typing Challenge Section"
    >
      {/* 1. Subtle ambient purple volumetric glow layer responding to continuous scroll */}
      <motion.div
        style={{ y: yBackground }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 max-w-4xl h-52 bg-accent/10 blur-[130px] pointer-events-none rounded-full transform-gpu will-change-transform"
      />

      <div className="w-full max-w-[1340px] mx-auto px-4 sm:px-8 md:px-10 lg:px-12 relative z-10">
        {/* ========================================================================= */}
        {/* SECTION HEADER (With subtle continuous scroll parallax)                   */}
        {/* ========================================================================= */}
        <motion.div
          style={{ y: yHeader }}
          className="mb-8 sm:mb-12 text-center max-w-2xl mx-auto transform-gpu will-change-transform"
        >
          <p className="text-xs sm:text-sm font-sans font-semibold text-accent uppercase tracking-[0.2em] mb-2.5 flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shadow-[0_0_8px_rgba(167,139,250,0.8)]" />
            <ShinyText
              text="Interactive Speed Challenge"
              speed={3.5}
              delay={1}
              color="rgba(255, 255, 255, 0.65)"
              shineColor="#DDD6FE"
              spread={120}
              direction="left"
              className="text-xs sm:text-sm font-sans font-semibold uppercase tracking-[0.2em]"
            />
          </p>
          <h2 className="lens-target text-3xl sm:text-4xl md:text-[44px] font-heading font-medium text-white tracking-tight leading-[1.15] mb-3">
            Think you can type faster than me?
          </h2>
          <p className="text-sm sm:text-base md:text-[17px] font-sans font-normal text-white/75 leading-relaxed max-w-lg mx-auto">
            Take the 30-second challenge and see where you rank.
          </p>
        </motion.div>

        {/* ========================================================================= */}
        {/* MAIN CHALLENGE & LEADERBOARD CANVAS (Balanced 2-Column Desktop Grid)      */}
        {/* ========================================================================= */}
        <motion.div
          style={{ y: yCard }}
          className="rounded-2xl sm:rounded-3xl border border-white/[0.09] bg-gradient-to-b from-[#0c0819]/90 via-[#070510]/95 to-[#040209] p-4 sm:p-7 md:p-9 lg:p-10 shadow-[0_30px_90px_rgba(0,0,0,0.85)] relative overflow-hidden backdrop-blur-xl transform-gpu will-change-transform"
        >
          {/* Subtle top surface ambient bloom */}
          <div className="absolute top-0 right-1/4 w-80 h-32 bg-accent/10 blur-[90px] pointer-events-none rounded-full" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch relative z-10">
            {/* ===================================================================== */}
            {/* LEFT / PRIMARY COLUMN: CHALLENGE INTERACTION (7 Cols)                  */}
            {/* ===================================================================== */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              {/* ----------------------------------------------------------------- */}
              {/* STATE 1: IDLE / NAME ENTRY & COMPACT START FLOW                   */}
              {/* ----------------------------------------------------------------- */}
              {gameState === "idle" && (
                <div className="space-y-6 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Keyboard size={16} className="text-accent" />
                      <span className="text-xs sm:text-sm font-sans font-semibold text-accent uppercase tracking-wider">
                        30-Second Sprint
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-heading font-semibold text-white tracking-tight mb-2">
                      Enter your name to begin
                    </h3>
                    <p className="text-xs sm:text-sm font-sans text-white/70 leading-relaxed max-w-xl">
                      Type real software engineering, system design, and AI observability sentences from my portfolio projects. The 30-second timer begins only after you click Start.
                    </p>
                  </div>

                  {/* Name Input & Start Action */}
                  <form onSubmit={handleStart} className="space-y-3">
                    <label
                      htmlFor="visitor-name"
                      className="block text-xs font-sans font-semibold text-white/70 uppercase tracking-wider"
                    >
                      Your Name *
                    </label>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input
                        id="visitor-name"
                        type="text"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (nameError) setNameError("");
                        }}
                        placeholder="e.g. Alex"
                        maxLength={30}
                        required
                        className="flex-1 px-4 py-3 bg-white/[0.04] border border-white/[0.12] rounded-xl text-white text-sm sm:text-base font-sans font-normal outline-none focus:border-purple-400/50 focus:bg-white/[0.06] transition-all duration-300 placeholder:text-white/30"
                      />
                      <button
                        type="submit"
                        className="px-6 py-3 rounded-xl bg-accent hover:bg-accent-light text-white text-sm sm:text-base font-sans font-semibold transition-all duration-300 shadow-[0_0_25px_rgba(167,139,250,0.35)] hover:shadow-[0_0_35px_rgba(167,139,250,0.55)] flex items-center justify-center gap-2 cursor-pointer hover:-translate-y-0.5 shrink-0"
                      >
                        <span>Start Challenge</span>
                        <ArrowRight size={16} />
                      </button>
                    </div>
                    {nameError && (
                      <p className="text-xs text-red-400 font-sans flex items-center gap-1.5 pt-1">
                        <AlertCircle size={14} />
                        <span>{nameError}</span>
                      </p>
                    )}
                  </form>

                  {/* Passage Preview Card */}
                  <div className="p-4 rounded-xl bg-white/[0.025] border border-white/[0.07] mt-auto">
                    <span className="text-[11px] font-mono text-purple-200/80 uppercase tracking-wider block mb-1.5">
                      Sample Passage Preview
                    </span>
                    <p className="text-xs sm:text-sm font-sans font-normal text-white/70 leading-relaxed line-clamp-3 italic">
                      &quot;{currentPassage}&quot;
                    </p>
                  </div>
                </div>
              )}

              {/* ----------------------------------------------------------------- */}
              {/* STATE 2: ACTIVE 30-SECOND SPRINT (Stable typing area + Controls)   */}
              {/* ----------------------------------------------------------------- */}
              {gameState === "playing" && (
                <div className="space-y-4 flex flex-col justify-between h-full">
                  {/* Live HUD Stats Header: 2x2 on mobile, 4-col on tablet/desktop */}
                  <div className="grid grid-cols-2 min-[480px]:grid-cols-4 gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/[0.03] border border-white/[0.08]">
                    <div className="flex flex-col p-2 min-[480px]:p-0">
                      <span className="text-[11px] font-sans font-medium text-white/50 uppercase tracking-wider flex items-center gap-1 mb-0.5">
                        <Timer size={13} className="text-accent" />
                        <span>Time</span>
                      </span>
                      <span
                        className={`text-xl sm:text-2xl md:text-3xl font-heading font-bold ${
                          timeLeft <= 5 ? "text-amber-400 animate-pulse" : "text-white"
                        }`}
                      >
                        {timeLeft}s
                      </span>
                    </div>

                    <div className="flex flex-col border-l border-white/[0.08] pl-2.5 sm:pl-3 p-2 min-[480px]:p-0">
                      <span className="text-[11px] font-sans font-medium text-white/50 uppercase tracking-wider flex items-center gap-1 mb-0.5">
                        <Zap size={13} className="text-accent" />
                        <span>WPM</span>
                      </span>
                      <span className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-accent">
                        {stats.wpm}
                      </span>
                    </div>

                    <div className="flex flex-col border-t min-[480px]:border-t-0 min-[480px]:border-l border-white/[0.08] pt-2 min-[480px]:pt-0 min-[480px]:pl-2.5 sm:pl-3 p-2 min-[480px]:p-0">
                      <span className="text-[11px] font-sans font-medium text-white/50 uppercase tracking-wider flex items-center gap-1 mb-0.5">
                        <Target size={13} className="text-emerald-400" />
                        <span>Accuracy</span>
                      </span>
                      <span className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-emerald-400">
                        {stats.accuracy}%
                      </span>
                    </div>

                    <div className="flex flex-col border-t min-[480px]:border-t-0 border-l border-white/[0.08] pt-2 min-[480px]:pt-0 pl-2.5 sm:pl-3 p-2 min-[480px]:p-0">
                      <span className="text-[11px] font-sans font-medium text-white/50 uppercase tracking-wider flex items-center gap-1 mb-0.5">
                        <Keyboard size={13} className="text-white/60" />
                        <span>Chars</span>
                      </span>
                      <span className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-white">
                        {stats.charsTyped}
                      </span>
                    </div>
                  </div>

                  {/* Sub-bar: Controls [ Restart ] & [ Exit Challenge ] */}
                  <div className="flex items-center justify-between text-xs font-sans px-1">
                    <span className="text-white/50 hidden sm:inline">Type naturally. Backspace supported.</span>
                    <div className="flex items-center gap-2 ml-auto">
                      <button
                        type="button"
                        onClick={handleRestart}
                        className="px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.09] border border-white/[0.08] text-white/70 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer text-xs font-sans"
                        title="Restart the 30-second challenge with a fresh passage"
                      >
                        <RotateCcw size={12} />
                        <span>Restart</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleExit}
                        className="px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-red-500/15 border border-white/[0.08] hover:border-red-500/30 text-white/70 hover:text-red-300 transition-all flex items-center gap-1.5 cursor-pointer text-xs font-sans"
                        title="Cancel challenge and return to start"
                      >
                        <X size={12} />
                        <span>Exit Challenge</span>
                      </button>
                    </div>
                  </div>

                  {/* Rock-Solid Typing Box */}
                  <div
                    onClick={() => inputRef.current?.focus()}
                    className="relative p-5 sm:p-6 rounded-2xl bg-[#070511] border border-purple-400/30 shadow-inner min-h-[170px] sm:min-h-[200px] cursor-text transition-all duration-200 focus-within:ring-2 focus-within:ring-accent/40"
                  >
                    <p className="text-base sm:text-lg md:text-xl font-sans leading-relaxed tracking-wide select-none">
                      {currentPassage.split("").map((char, index) => {
                        const isTyped = index < typedText.length;
                        const isCorrect = isTyped && typedText[index] === char;
                        const isIncorrect = isTyped && typedText[index] !== char;
                        const isCurrent = index === typedText.length;

                        let charClass = "text-white/35 font-normal";
                        if (isCorrect) {
                          charClass = "text-white font-medium";
                        } else if (isIncorrect) {
                          charClass =
                            char === " "
                              ? "text-red-400 bg-red-500/35 underline decoration-red-400 rounded-xs inline-block min-w-[0.5ch]"
                              : "text-red-400 bg-red-500/25 underline decoration-red-400 rounded-xs";
                        }

                        return (
                          <span
                            key={index}
                            className={`relative transition-colors duration-100 ${charClass} ${
                              isCurrent ? "border-l-2 border-accent pl-[1px] animate-pulse" : ""
                            }`}
                          >
                            {char}
                          </span>
                        );
                      })}
                    </p>

                    {/* Hidden Native Input to capture typing across Desktop & Mobile keyboards */}
                    <textarea
                      ref={inputRef}
                      value={typedText}
                      onChange={handleInputChange}
                      onPaste={(e) => e.preventDefault()}
                      onKeyDown={(e) => {
                        if (e.key === "Escape") {
                          handleExit();
                        }
                      }}
                      autoCapitalize="none"
                      autoComplete="off"
                      autoCorrect="off"
                      spellCheck={false}
                      inputMode="text"
                      style={{ fontSize: "16px" }}
                      className="absolute inset-0 opacity-0 cursor-text resize-none w-full h-full text-base pointer-events-auto"
                      aria-label="Typing input area"
                    />
                  </div>
                </div>
              )}

              {/* ----------------------------------------------------------------- */}
              {/* STATE 3: CHALLENGE COMPLETE RESULT SCREEN                         */}
              {/* ----------------------------------------------------------------- */}
              {gameState === "completed" && (
                <div className="space-y-5 flex flex-col justify-between h-full">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-sans font-semibold mb-2">
                      <CheckCircle2 size={13} />
                      <span>CHALLENGE COMPLETE</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-heading font-medium text-white tracking-tight">
                      Great run, {name}!
                    </h3>
                  </div>

                  {/* Core Result Cards: Large WPM, Accuracy, Characters, Leaderboard Position */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 p-4 sm:p-5 rounded-2xl bg-white/[0.035] border border-white/[0.09]">
                    {/* 1. Large WPM */}
                    <div className="flex flex-col">
                      <span className="text-[11px] font-sans font-medium text-white/50 uppercase tracking-wider mb-1">
                        Speed
                      </span>
                      <span className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-accent">
                        {finalStats?.wpm ?? 0}{" "}
                        <span className="text-xs sm:text-sm font-sans font-normal text-white/60">WPM</span>
                      </span>
                    </div>

                    {/* 2. Accuracy */}
                    <div className="flex flex-col border-l border-white/[0.08] pl-2.5 sm:pl-3">
                      <span className="text-[11px] font-sans font-medium text-white/50 uppercase tracking-wider mb-1">
                        Accuracy
                      </span>
                      <span className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-emerald-400">
                        {finalStats?.accuracy ?? 100}%
                      </span>
                    </div>

                    {/* 3. Characters */}
                    <div className="flex flex-col border-t sm:border-t-0 sm:border-l border-white/[0.08] pt-2 sm:pt-0 sm:pl-3">
                      <span className="text-[11px] font-sans font-medium text-white/50 uppercase tracking-wider mb-1">
                        Characters
                      </span>
                      <span className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white">
                        {finalStats?.charsTyped ?? 0}
                      </span>
                    </div>

                    {/* 4. Leaderboard Position */}
                    <div className="flex flex-col border-t sm:border-t-0 border-l border-white/[0.08] pt-2 sm:pt-0 pl-2.5 sm:pl-3">
                      <span className="text-[11px] font-sans font-medium text-white/50 uppercase tracking-wider mb-1">
                        Position
                      </span>
                      <span className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-purple-200">
                        {userRank !== null ? (
                          `#${userRank}`
                        ) : isSubmittingScore ? (
                          <span className="text-lg sm:text-xl text-white/40">...</span>
                        ) : (
                          `#1`
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Prabhav Benchmark Comparison (Dynamic from verified leaderboard scores) */}
                  {prabhavBestEntry ? (
                    <div className="p-4 rounded-xl bg-white/[0.025] border border-white/[0.08] flex items-center justify-between gap-4">
                      <div>
                        <span className="text-xs font-sans font-semibold text-accent uppercase tracking-wider block mb-0.5">
                          Prabhav&apos;s Best
                        </span>
                        <p className="text-sm sm:text-base font-heading font-medium text-white">
                          {prabhavBestEntry.wpm} WPM · {prabhavBestEntry.accuracy}% accuracy
                        </p>
                      </div>

                      <div className="text-right">
                        {name.trim().toLowerCase() === "prabhav" ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/20 text-accent border border-accent/40 text-xs font-sans font-semibold">
                            <span>Your benchmark is recorded!</span>
                          </span>
                        ) : (finalStats?.wpm ?? 0) > prabhavBestEntry.wpm ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-sans font-semibold">
                            <Flame size={13} />
                            <span>You beat Prabhav!</span>
                          </span>
                        ) : (finalStats?.wpm ?? 0) === prabhavBestEntry.wpm ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/20 text-accent border border-accent/40 text-xs font-sans font-semibold">
                            <span>Tied with Prabhav</span>
                          </span>
                        ) : (
                          <span className="text-xs sm:text-sm font-sans text-white/70">
                            {prabhavBestEntry.wpm - (finalStats?.wpm ?? 0)} WPM away from Prabhav
                          </span>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center gap-2.5">
                      <Sparkles size={16} className="text-accent shrink-0" />
                      <p className="text-xs font-sans text-white/70 leading-relaxed">
                        Prabhav hasn&apos;t completed his initial verified run yet. Your score is live on the leaderboard!
                      </p>
                    </div>
                  )}

                  {/* Submission Status Confirmation */}
                  {isSubmittingScore && (
                    <div className="flex items-center gap-2 text-xs font-sans text-purple-200/80">
                      <Loader2 size={13} className="animate-spin text-accent" />
                      <span>Syncing your score with the global leaderboard...</span>
                    </div>
                  )}

                  {isSubmittedSuccess && (
                    <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-xs sm:text-sm font-sans font-medium">
                      <CheckCircle2 size={15} />
                      <span>Score recorded on the global leaderboard</span>
                    </div>
                  )}

                  {submissionError && (
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-3.5 py-2 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs sm:text-sm font-sans font-medium">
                      <div className="flex items-center gap-2">
                        <AlertCircle size={15} className="shrink-0" />
                        <span>{submissionError} (Your local result is saved)</span>
                      </div>
                      <button
                        type="button"
                        onClick={handleRetrySubmit}
                        className="self-start sm:self-auto px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 text-xs font-sans font-medium transition-colors cursor-pointer"
                      >
                        Retry Sync
                      </button>
                    </div>
                  )}

                  {/* Controls: Try Again & Exit / Change Name */}
                  <div className="pt-1 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={handleTryAgain}
                      disabled={isSubmittingScore}
                      className="px-6 py-2.5 rounded-full bg-accent hover:bg-accent-light disabled:opacity-50 text-white text-sm sm:text-base font-sans font-medium transition-all duration-300 flex items-center gap-2 cursor-pointer hover:-translate-y-0.5 shadow-[0_0_20px_rgba(167,139,250,0.3)]"
                    >
                      <RotateCcw size={15} />
                      <span>Try Again</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleExit}
                      className="px-5 py-2.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.12] text-white/80 hover:text-white text-sm sm:text-base font-sans font-medium transition-all duration-300 flex items-center gap-2 cursor-pointer hover:-translate-y-0.5"
                    >
                      <span>Change Name</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* ===================================================================== */}
            {/* RIGHT COLUMN: SHARED SUPABASE LEADERBOARD (5 Cols)                     */}
            {/* ===================================================================== */}
            <motion.div
              style={{ y: yLeaderboard }}
              className="lg:col-span-5 p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white/[0.025] border border-white/[0.08] flex flex-col justify-between transform-gpu will-change-transform"
            >
              <div>
                <div className="flex items-center justify-between pb-3.5 mb-3 border-b border-white/[0.08]">
                  <div className="flex items-center gap-2">
                    <Trophy size={17} className="text-accent" />
                    <h4 className="text-xs sm:text-sm font-sans font-semibold text-white uppercase tracking-wider">
                      Global Leaderboard
                    </h4>
                  </div>
                  <span className="text-[11px] font-sans text-white/50">Top 10 Scores</span>
                </div>

                {/* Leaderboard Rows */}
                <div className="space-y-1.5">
                  {isLoadingLeaderboard && (
                    <div className="py-8 text-center text-xs font-sans text-white/50 animate-pulse">
                      Loading global rankings...
                    </div>
                  )}

                  {!isLoadingLeaderboard && leaderboard.length === 0 && (
                    <div className="py-8 text-center space-y-1.5">
                      <p className="text-xs sm:text-sm font-sans font-medium text-white/80">
                        No scores recorded yet.
                      </p>
                      <p className="text-[11px] font-sans text-white/50 max-w-[240px] mx-auto leading-relaxed">
                        Be the first participant by completing the 30-second sprint!
                      </p>
                    </div>
                  )}

                  {!isLoadingLeaderboard &&
                    leaderboard.map((entry, idx) => {
                      const isUserRow =
                        entry.id === userSubmittedId ||
                        (Boolean(name.trim()) &&
                          entry.name.trim().toLowerCase() === name.trim().toLowerCase());
                      const isTopThree = idx < 3;

                      return (
                        <div
                          key={entry.id || idx}
                          className={`flex items-center justify-between px-2.5 sm:px-3 py-2 rounded-xl text-xs sm:text-sm font-sans transition-all duration-200 ${
                            isUserRow
                              ? "bg-accent/25 border border-accent/50 text-white font-semibold shadow-[0_0_15px_rgba(167,139,250,0.3)]"
                              : "bg-white/[0.02] border border-white/[0.04] text-white/80 hover:bg-white/[0.05]"
                          }`}
                        >
                          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 pr-2">
                            <span
                              className={`w-5 text-center font-mono font-bold shrink-0 ${
                                idx === 0
                                  ? "text-amber-400"
                                  : idx === 1
                                  ? "text-slate-300"
                                  : idx === 2
                                  ? "text-amber-600"
                                  : "text-white/40"
                              }`}
                            >
                              {isTopThree ? <Medal size={13} className="inline" /> : `#${idx + 1}`}
                            </span>
                            <span className="truncate font-medium text-white/95">
                              {entry.name}
                              {isUserRow && (
                                <span className="ml-1 text-[10px] text-accent font-semibold">
                                  (You)
                                </span>
                              )}
                            </span>
                          </div>

                          <div className="flex items-center gap-3 shrink-0 font-mono">
                            <span className="font-semibold text-accent">{entry.wpm} WPM</span>
                            <span className="text-white/50 text-[11px]">
                              {entry.accuracy}%
                            </span>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>

              {/* Dedicated Visitor Rank Banner if outside Top 10 */}
              {userRank !== null && userRank > 10 && (
                <div className="mt-4 pt-3 border-t border-white/[0.08]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 px-4 py-3 rounded-xl bg-accent/20 border border-accent/40 text-sm font-sans text-white shadow-[0_0_15px_rgba(167,139,250,0.25)]">
                    <div className="flex items-center gap-2">
                      <Trophy size={16} className="text-accent shrink-0" />
                      <span className="font-bold text-accent font-mono text-sm sm:text-base">
                        Your Rank: #{userRank}
                      </span>
                      {name.trim() && (
                        <span className="text-white/60 text-xs truncate max-w-[120px]">
                          ({name.trim()})
                        </span>
                      )}
                    </div>
                    <span className="font-mono text-white/95 font-semibold text-xs sm:text-sm">
                      {finalStats?.wpm ?? 0} WPM · {finalStats?.accuracy ?? 100}% accuracy
                    </span>
                  </div>
                </div>
              )}

              {/* Footnote */}
              <div className="mt-4 pt-2.5 border-t border-white/[0.05] text-[10px] font-sans text-white/40 text-center">
                <span>Real-time persistence powered by Supabase</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default TypingChallenge;
