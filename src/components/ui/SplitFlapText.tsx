"use client";

import React, { useEffect, useMemo, useRef, useState } from 'react';

const DEFAULT_WORDS = ['LAUNCH READY', 'SYNC ONLINE', 'SIGNAL LIVE'];

const CHARSETS: Record<string, string> = {
  alpha: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  alphanumeric: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
  numeric: '0123456789'
};

const styles = `
.split-flap-text{font-family:var(--split-flap-font-family,var(--font-heading),'Satoshi',var(--font-sans),-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif);font-size:var(--split-flap-font-size,52px);font-weight:700;line-height:1;letter-spacing:.025em;font-variant-numeric:tabular-nums;gap:var(--split-flap-gap,5px)}
.split-flap-text__tile{position:relative;width:.82em;height:1.15em;overflow:hidden;border-radius:var(--split-flap-radius,6px);background:radial-gradient(circle at 50% 0%,rgba(167,139,250,.08),transparent 52%),linear-gradient(180deg,color-mix(in srgb,var(--split-flap-tile-color,#111827) 86%,white),var(--split-flap-tile-color,#111827));box-shadow:0 .03em .06em rgba(255,255,255,.06) inset,0 -.04em .08em rgba(0,0,0,.4) inset,0 .14em .3em rgba(0,0,0,.35);perspective:520px;transform-style:preserve-3d;isolation:isolate}
.split-flap-text__tile:before{content:'';position:absolute;z-index:8;top:calc(50% - .5px);left:0;width:100%;height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,.12) 18%,rgba(0,0,0,.7) 50%,rgba(255,255,255,.1) 82%,transparent);box-shadow:0 -1px 0 rgba(255,255,255,.04),0 1px 0 rgba(0,0,0,.5);pointer-events:none}
.split-flap-text__tile:after{content:'';position:absolute;inset:0;z-index:9;border:1px solid rgba(255,255,255,.07);border-radius:inherit;box-shadow:0 0 0 1px rgba(0,0,0,.25) inset;pointer-events:none}
.split-flap-text__half,.split-flap-text__flap{position:absolute;left:0;width:100%;height:50%;overflow:hidden;background:linear-gradient(180deg,rgba(255,255,255,.05),transparent 34%),var(--split-flap-tile-color,#111827);backface-visibility:hidden}
.split-flap-text__half--top,.split-flap-text__flap--front{top:0}
.split-flap-text__half--bottom,.split-flap-text__flap--back{bottom:0;background:linear-gradient(0deg,rgba(255,255,255,.04),transparent 38%),color-mix(in srgb,var(--split-flap-tile-color,#111827) 94%,black)}
.split-flap-text__char{position:absolute;left:0;width:100%;height:200%;display:flex;align-items:center;justify-content:center;color:var(--split-flap-text-color,#f8fafc);text-shadow:0 1px 2px rgba(0,0,0,.5)}
.split-flap-text__half--top .split-flap-text__char,.split-flap-text__flap--front .split-flap-text__char{top:0}
.split-flap-text__half--bottom .split-flap-text__char,.split-flap-text__flap--back .split-flap-text__char{bottom:0}
.split-flap-text__flap{z-index:6;will-change:transform,filter;transform-style:preserve-3d}
.split-flap-text__flap--front{transform-origin:center bottom;animation:split-flap-front var(--split-flap-flip-duration,.12s) cubic-bezier(.23,1,.32,1) both}
.split-flap-text__flap--back{transform-origin:center top;transform:rotateX(90deg);animation:split-flap-back var(--split-flap-flip-duration,.12s) cubic-bezier(.23,1,.32,1) both}
@keyframes split-flap-front{0%{transform:rotateX(0deg);filter:brightness(1.08)}100%{transform:rotateX(-90deg);filter:brightness(.52)}}
@keyframes split-flap-back{0%,45%{transform:rotateX(90deg);filter:brightness(.58)}100%{transform:rotateX(0deg);filter:brightness(1)}}
@media (prefers-reduced-motion:reduce){.split-flap-text__flap{animation:none!important}}
`;

const toCssUnit = (value: number | string | undefined): string | undefined => 
  (typeof value === 'number' ? `${value}px` : value);

const resolveCharset = (charset?: string): string => {
  if (charset && CHARSETS[charset]) return CHARSETS[charset];
  return typeof charset === 'string' && charset.length > 0 ? charset : CHARSETS.alphanumeric;
};

const normalizePhrase = (phrase: string, width: number): string => {
  const safe = String(phrase ?? '');
  return safe.padEnd(width, ' ').slice(0, width);
};

interface TileState {
  current: string;
  next: string;
  flipping: boolean;
  tick: number;
}

const createTiles = (phrase: string): TileState[] =>
  phrase.split('').map(char => ({
    current: char,
    next: char,
    flipping: false,
    tick: 0
  }));

const sampleChar = (charset: string): string => 
  charset.charAt(Math.floor(Math.random() * charset.length)) || ' ';

const buildSequence = (target: string, flips: number, charset: string): string[] => {
  const steps: string[] = [];
  for (let i = 0; i < flips; i += 1) {
    steps.push(sampleChar(charset));
  }
  steps.push(target);
  return steps;
};

const usePrefersReducedMotion = (): boolean => {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => setPrefersReduced(mediaQuery.matches);

    handleChange();
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReduced;
};

export interface SplitFlapTextProps extends React.HTMLAttributes<HTMLDivElement> {
  words?: string[];
  text?: string;
  flipDuration?: number;
  stagger?: number;
  cycleDelay?: number;
  charset?: 'alpha' | 'alphanumeric' | 'numeric' | string;
  flipsPerChar?: number;
  tileColor?: string;
  textColor?: string;
  tileRadius?: number | string;
  gap?: number | string;
  fontSize?: number | string;
  fontFamily?: string;
  loop?: boolean;
  padTo?: number;
}

export const SplitFlapText: React.FC<SplitFlapTextProps> = ({
  words = ['LAUNCH READY', 'SYNC ONLINE', 'SIGNAL LIVE'],
  text,
  flipDuration = 0.12,
  stagger = 0.06,
  cycleDelay = 2400,
  charset = 'alphanumeric',
  flipsPerChar = 8,
  tileColor = '#111827',
  textColor = '#f8fafc',
  tileRadius = 8,
  gap = 6,
  fontSize = 52,
  fontFamily,
  loop = true,
  padTo = 12,
  className = '',
  style = {},
  ...props
}) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const rafRef = useRef<number | null>(null);
  const cycleTimerRef = useRef<number | null>(null);
  const currentTextRef = useRef<string>('');

  const sourceWords = Array.isArray(words) && words.length > 0 ? words : DEFAULT_WORDS;
  const phrasesKey = typeof text === 'string' ? text : sourceWords.map(word => String(word ?? '')).join('\u001f');
  const phrases = useMemo(() => phrasesKey.split('\u001f'), [phrasesKey]);

  const width = useMemo(() => {
    const longest = phrases.reduce((max, phrase) => Math.max(max, phrase.length), 1);
    return Math.max(1, Math.ceil(Number(padTo) || 0), longest);
  }, [padTo, phrases]);

  const normalizedPhrases = useMemo(() => phrases.map(phrase => normalizePhrase(phrase, width)), [phrases, width]);

  const targetPhrase = normalizedPhrases[0] || '';
  const [prevPhrase, setPrevPhrase] = useState(targetPhrase);
  const [tiles, setTiles] = useState<TileState[]>(() => createTiles(targetPhrase));

  if (prevPhrase !== targetPhrase) {
    setPrevPhrase(targetPhrase);
    setTiles(createTiles(targetPhrase));
  }

  useEffect(() => {
    const clearAnimation = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }

      if (cycleTimerRef.current) {
        window.clearTimeout(cycleTimerRef.current);
        cycleTimerRef.current = null;
      }
    };

    clearAnimation();

    const firstPhrase = normalizedPhrases[0] || '';
    currentTextRef.current = firstPhrase;

    if (normalizedPhrases.length <= 1 || typeof window === 'undefined') {
      return clearAnimation;
    }

    let phraseIndex = 0;
    let cancelled = false;

    const safeFlipMs = Math.max(40, (Number(flipDuration) || 0.12) * 1000);
    const safeStaggerMs = Math.max(0, (Number(stagger) || 0) * 1000);
    const safeCycleDelay = Math.max(400, Number(cycleDelay) || 2400);
    const safeFlips = Math.max(0, Math.floor(Number(flipsPerChar) || 0));
    const activeCharset = resolveCharset(charset);

    const animateTo = (targetPhrase: string): number => {
      if (prefersReducedMotion) {
        currentTextRef.current = targetPhrase;
        setTiles(createTiles(targetPhrase));
        return 0;
      }

      const fromPhrase = normalizePhrase(currentTextRef.current, width);
      const targetChars = targetPhrase.split('');

      const plans = targetChars
        .map((targetChar, index) => {
          const fromChar = fromPhrase[index] || ' ';
          if (fromChar === targetChar) return null;

          return {
            index,
            from: fromChar,
            target: targetChar,
            sequence: buildSequence(targetChar, safeFlips, activeCharset),
            start: index * safeStaggerMs,
            step: -1,
            done: false
          };
        })
        .filter((item): item is NonNullable<typeof item> => Boolean(item));

      if (!plans.length) {
        currentTextRef.current = targetPhrase;
        setTiles(createTiles(targetPhrase));
        return 0;
      }

      const totalDuration = plans.reduce(
        (max, plan) => Math.max(max, plan.start + plan.sequence.length * safeFlipMs),
        0
      );
      const startedAt = performance.now();

      const updateTiles = (updates: { index: number; current: string; next: string; done: boolean }[]) => {
        setTiles(previous => {
          const nextTiles = [...previous];
          updates.forEach(update => {
            const tile = nextTiles[update.index];
            if (!tile) return;

            nextTiles[update.index] = {
              current: update.current,
              next: update.next,
              flipping: !update.done,
              tick: tile.tick + 1
            };
          });
          return nextTiles;
        });
      };

      const tick = (now: number) => {
        if (cancelled) return;

        const elapsed = now - startedAt;
        const updates: { index: number; current: string; next: string; done: boolean }[] = [];
        let shouldContinue = false;

        plans.forEach(plan => {
          const localElapsed = elapsed - plan.start;

          if (localElapsed < 0) {
            shouldContinue = true;
            return;
          }

          const step = Math.floor(localElapsed / safeFlipMs);

          if (step < plan.sequence.length) {
            shouldContinue = true;

            if (step !== plan.step) {
              plan.step = step;
              updates.push({
                index: plan.index,
                current: step === 0 ? plan.from : plan.sequence[step - 1],
                next: plan.sequence[step],
                done: false
              });
            }
          } else if (!plan.done) {
            plan.done = true;
            updates.push({
              index: plan.index,
              current: plan.target,
              next: plan.target,
              done: true
            });
          }
        });

        if (updates.length > 0) updateTiles(updates);

        if (shouldContinue) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          currentTextRef.current = targetPhrase;
          rafRef.current = null;
        }
      };

      rafRef.current = requestAnimationFrame(tick);
      return totalDuration;
    };

    const scheduleNext = (delay: number) => {
      cycleTimerRef.current = window.setTimeout(() => {
        if (cancelled) return;

        const nextIndex = phraseIndex + 1;

        if (nextIndex >= normalizedPhrases.length && !loop) return;

        phraseIndex = nextIndex % normalizedPhrases.length;
        const animationDuration = animateTo(normalizedPhrases[phraseIndex]);
        scheduleNext(safeCycleDelay + animationDuration);
      }, delay);
    };

    scheduleNext(safeCycleDelay);

    return () => {
      cancelled = true;
      clearAnimation();
    };
  }, [normalizedPhrases, width, loop, cycleDelay, flipDuration, stagger, flipsPerChar, charset, prefersReducedMotion]);

  const settledText = tiles
    .map(tile => tile.current)
    .join('')
    .trimEnd();

  const componentStyle = {
    '--split-flap-tile-color': tileColor,
    '--split-flap-text-color': textColor,
    '--split-flap-radius': toCssUnit(tileRadius),
    '--split-flap-gap': toCssUnit(gap),
    '--split-flap-font-size': toCssUnit(fontSize),
    '--split-flap-flip-duration': `${Math.max(0.04, Number(flipDuration) || 0.12)}s`,
    ...(fontFamily ? { '--split-flap-font-family': fontFamily } : {}),
    ...style
  } as React.CSSProperties;

  return (
    <>
      <style>{styles}</style>
      <div
        className={`split-flap-text inline-flex items-center whitespace-pre select-none ${className}`.trim()}
        style={componentStyle}
        role="text"
        aria-label={settledText || undefined}
        {...props}
      >
        {tiles.map((tile, index) => (
          <span className="split-flap-text__tile" aria-hidden="true" key={`${index}-${tiles.length}`}>
            <span className="split-flap-text__half split-flap-text__half--top">
              <span className="split-flap-text__char">{tile.current === ' ' ? '\u00A0' : tile.current}</span>
            </span>
            <span className="split-flap-text__half split-flap-text__half--bottom">
              <span className="split-flap-text__char">{tile.flipping ? tile.next : tile.current}</span>
            </span>

            {tile.flipping && (
              <React.Fragment key={`fragment-${index}-${tile.tick}`}>
                <span
                  className="split-flap-text__flap split-flap-text__flap--front"
                  key={`front-${index}-${tile.tick}`}
                >
                  <span className="split-flap-text__char">{tile.current === ' ' ? '\u00A0' : tile.current}</span>
                </span>
                <span className="split-flap-text__flap split-flap-text__flap--back" key={`back-${index}-${tile.tick}`}>
                  <span className="split-flap-text__char">{tile.next === ' ' ? '\u00A0' : tile.next}</span>
                </span>
              </React.Fragment>
            )}
          </span>
        ))}
      </div>
    </>
  );
};

export default SplitFlapText;
