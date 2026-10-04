"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Play, Pause, Volume2, VolumeX, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ProjectVideoShowcaseProps {
  src?: string;
  poster: string;
  title: string;
  badge?: string;
  caption?: string;
  aspectRatio?: string;
  className?: string;
  hasAudio?: boolean;
  isStaticImage?: boolean;
  compact?: boolean;
}

export function ProjectVideoShowcase({
  src,
  poster,
  title,
  badge = "Verified UI Capture",
  caption,
  aspectRatio = "aspect-[16/10]",
  className,
  hasAudio = false,
  isStaticImage = false,
  compact = false,
}: ProjectVideoShowcaseProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const isVideo = Boolean(src) && !isStaticImage;

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [userInteracted, setUserInteracted] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackType, setFeedbackType] = useState<"play" | "pause">("play");
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);

  // Synchronize playing state via DOM events from the video element
  useEffect(() => {
    if (!isVideo) return;
    const video = videoRef.current;
    if (!video) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);

    return () => {
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
    };
  }, [isVideo]);

  // Viewport intersection observer with generous margin to buffer and start playing smoothly before entering viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
        });
      },
      { rootMargin: "300px 0px 300px 0px", threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Handle play/pause sync with viewport visibility unless explicitly paused by user
  useEffect(() => {
    if (!isVideo) return;
    const video = videoRef.current;
    if (!video) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    if (isInView && !userInteracted) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay was prevented by browser policy (user gesture required)
        });
      }
    } else if (!isInView && !video.paused) {
      video.pause();
    }
  }, [isInView, userInteracted, isVideo]);

  const togglePlay = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!isVideo) return;
      const video = videoRef.current;
      if (!video) return;

      setUserInteracted(true);
      if (video.paused) {
        video.play();
        setFeedbackType("play");
      } else {
        video.pause();
        setFeedbackType("pause");
      }

      setShowFeedback(true);
      setTimeout(() => setShowFeedback(false), 600);
    },
    [isVideo]
  );

  const toggleMute = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  }, []);

  const handleFullscreen = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!isVideo) return;
      const video = videoRef.current;
      if (!video) return;
      if (video.requestFullscreen) {
        video.requestFullscreen();
      }
    },
    [isVideo]
  );

  return (
    <div
      ref={containerRef}
      className={cn(
        "group relative rounded-2xl overflow-hidden",
        "border border-white/[0.08] bg-[#07070b]/90 backdrop-blur-xl",
        "shadow-[0_16px_40px_rgba(0,0,0,0.5),0_0_25px_-5px_rgba(167,139,250,0.06)]",
        "hover:shadow-[0_20px_50px_rgba(0,0,0,0.65),0_0_35px_-5px_rgba(167,139,250,0.12)]",
        "hover:border-white/[0.14] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
        className
      )}
    >
      {/* Specular top edge highlight */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.18] to-transparent z-20 pointer-events-none" />

      {/* Window Chassis Top Bar */}
      <div
        className={cn(
          "flex items-center justify-between border-b border-white/[0.06] bg-white/[0.02] text-xs font-sans text-white/60 select-none z-20 relative",
          compact ? "px-3 py-2" : "px-3.5 py-2.5"
        )}
      >
        {/* Left: Window Controls & Title */}
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
          <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-white/15 group-hover:bg-red-400/40 transition-colors" />
          <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-white/15 group-hover:bg-amber-400/40 transition-colors" />
          <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-white/15 group-hover:bg-emerald-400/40 transition-colors" />
          <span className="ml-1.5 text-xs sm:text-[13px] text-white/80 tracking-wide font-medium font-sans truncate">
            {title}
          </span>
        </div>

        {/* Center/Right: Live / Screen Recording status badge */}
        <div className="flex items-center gap-1.5 ml-2 shrink-0">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-[11px] sm:text-xs tracking-wide font-sans">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shadow-[0_0_8px_rgba(167,139,250,0.8)]" />
            <span className="text-white/90 font-medium">{badge}</span>
          </div>

          {/* Video action buttons */}
          {isVideo && (
            <div className="flex items-center gap-1">
              {hasAudio && (
                <button
                  onClick={toggleMute}
                  className="p-1 rounded-md text-white/50 hover:text-white hover:bg-white/[0.08] transition-colors"
                  aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                  title={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
                </button>
              )}
              <button
                onClick={togglePlay}
                className="p-1 rounded-md text-white/50 hover:text-white hover:bg-white/[0.08] transition-colors"
                aria-label={isPlaying ? "Pause demo video" : "Play demo video"}
                title={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause size={13} /> : <Play size={13} />}
              </button>
              {!compact && (
                <button
                  onClick={handleFullscreen}
                  className="p-1 rounded-md text-white/50 hover:text-white hover:bg-white/[0.08] transition-colors hidden sm:block"
                  aria-label="View fullscreen"
                  title="Fullscreen"
                >
                  <Maximize2 size={12} />
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Primary Video / Image Stage */}
      <div
        className={cn(
          "relative w-full overflow-hidden bg-black/40",
          aspectRatio,
          isVideo ? "cursor-pointer" : "cursor-default"
        )}
        onClick={isVideo ? togglePlay : undefined}
      >
        {isVideo ? (
          <>
            <video
              ref={videoRef}
              src={src}
              poster={poster}
              autoPlay
              playsInline
              muted={isMuted}
              loop
              preload="auto"
              onLoadedData={() => setIsLoaded(true)}
              className={cn(
                "w-full h-full object-cover transition-opacity duration-500 ease-out",
                isLoaded ? "opacity-100" : "opacity-90"
              )}
            />

            {/* Tactile Play/Pause Center Overlay on Click */}
            <div
              className={cn(
                "pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-300 z-30",
                showFeedback ? "opacity-100 scale-100" : "opacity-0 scale-90"
              )}
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-black/60 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white shadow-2xl">
                {feedbackType === "play" ? (
                  <Play size={18} className="translate-x-0.5 fill-white" />
                ) : (
                  <Pause size={18} className="fill-white" />
                )}
              </div>
            </div>

            {/* Ambient lower vignette */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/40 to-transparent z-10" />

            {/* Bottom Corner Interaction Pill (Fades on hover) */}
            <div className="absolute bottom-2.5 left-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-xs font-sans text-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span>Click to {isPlaying ? "pause" : "play"}</span>
            </div>
          </>
        ) : (
          <div className="relative w-full h-full">
            <Image
              src={poster}
              alt={title}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover object-top group-hover:scale-[1.02] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10" />
            <div className="absolute bottom-2.5 left-3 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-xs font-sans text-white/90">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span>Interactive Interface View</span>
            </div>
          </div>
        )}
      </div>

      {/* Optional Integrated Caption Bar */}
      {caption && (
        <div
          className={cn(
            "border-t border-white/[0.06] bg-white/[0.02] flex items-center justify-between font-sans text-white/70",
            compact ? "px-3 py-2 text-xs" : "px-4 py-2.5 text-xs sm:text-[13px]"
          )}
        >
          <span className="font-normal truncate mr-3 leading-relaxed">{caption}</span>
          <span className="shrink-0 inline-flex items-center gap-1.5 text-white/50 text-[11px] sm:text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-accent/80" />
            <span>{isVideo ? "Actual UI Flow" : "Live Interface"}</span>
          </span>
        </div>
      )}
    </div>
  );
}

export default ProjectVideoShowcase;
