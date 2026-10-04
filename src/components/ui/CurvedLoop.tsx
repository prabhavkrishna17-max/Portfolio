"use client";

import {
  useRef,
  useEffect,
  useState,
  useId,
  type FC,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface CurvedLoopProps {
  marqueeText?: string;
  speed?: number;
  className?: string;
  interactive?: boolean;
}

const UNIT_TEXT = "PRABHAV KRISHNA\u00A0\u00A0✦\u00A0\u00A0";

export const CurvedLoop: FC<CurvedLoopProps> = ({
  marqueeText = "PRABHAV KRISHNA",
  speed = 1.4,
  className = "",
  interactive = true,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const measureRef = useRef<SVGTextElement | null>(null);
  const textPathRef = useRef<SVGTextPathElement | null>(null);

  const [spacing, setSpacing] = useState(0);
  const [offset, setOffset] = useState(0);
  const uid = useId();
  const pathId = `straight-loop-${uid.replace(/:/g, "")}`;

  // Completely straight horizontal path at y=60 across a 1440x120 SVG viewport
  const pathD = "M-2000,60 L5000,60";

  const dragRef = useRef(false);
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const lastXRef = useRef(0);
  const dirRef = useRef<"left" | "right">("left");
  const velRef = useRef(0);
  const isDraggingHorizontalRef = useRef(false);

  // Subtle continuous scroll parallax integration
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const yParallax = useTransform(scrollYProgress, [0, 1], [-14, 14]);

  const ready = spacing > 0;
  // Calculate enough repetitions to span across widescreen viewports + buffer
  const repeatCount = spacing > 0 ? Math.ceil(3600 / spacing) + 4 : 8;

  // Measure text width of one unit
  useEffect(() => {
    const updateMeasurement = () => {
      if (measureRef.current) {
        const measured = measureRef.current.getComputedTextLength();
        if (measured > 0) {
          setSpacing(measured);
        }
      }
    };

    updateMeasurement();
    window.addEventListener("resize", updateMeasurement, { passive: true });
    return () => window.removeEventListener("resize", updateMeasurement);
  }, []);

  // Initialize offset
  useEffect(() => {
    if (!spacing) return;
    if (textPathRef.current) {
      const initial = -spacing;
      textPathRef.current.setAttribute("startOffset", `${initial}px`);
      setOffset(initial);
    }
  }, [spacing]);

  // Main continuous marquee animation loop
  useEffect(() => {
    if (!spacing || !ready) return;

    // Respect user's reduced-motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      return;
    }

    let frameId = 0;
    const step = () => {
      if (!dragRef.current && textPathRef.current) {
        const delta = dirRef.current === "right" ? speed : -speed;
        const currentOffset = parseFloat(
          textPathRef.current.getAttribute("startOffset") || "0"
        );
        let newOffset = currentOffset + delta;
        const wrapPoint = spacing;

        if (newOffset <= -wrapPoint) newOffset += wrapPoint;
        if (newOffset > 0) newOffset -= wrapPoint;

        textPathRef.current.setAttribute("startOffset", `${newOffset}px`);
        setOffset(newOffset);
      }
      frameId = requestAnimationFrame(step);
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [spacing, speed, ready]);

  // Pointer Interaction (supports drag scrub with touch-safe scrolling on mobile)
  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!interactive) return;
    dragRef.current = true;
    startXRef.current = e.clientX;
    startYRef.current = e.clientY;
    lastXRef.current = e.clientX;
    velRef.current = 0;
    isDraggingHorizontalRef.current = false;
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!interactive || !dragRef.current || !textPathRef.current) return;

    const dx = e.clientX - lastXRef.current;
    const totalDx = Math.abs(e.clientX - startXRef.current);
    const totalDy = Math.abs(e.clientY - startYRef.current);

    // If pointer moved mostly vertically, do not trap touch so mobile page scrolling continues
    if (!isDraggingHorizontalRef.current) {
      if (totalDy > 8 && totalDy > totalDx) {
        dragRef.current = false;
        return;
      }
      if (totalDx > 6) {
        isDraggingHorizontalRef.current = true;
        try {
          (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
        } catch {}
      } else {
        return;
      }
    }

    lastXRef.current = e.clientX;
    velRef.current = dx;

    const currentOffset = parseFloat(
      textPathRef.current.getAttribute("startOffset") || "0"
    );
    let newOffset = currentOffset + dx;
    const wrapPoint = spacing;

    if (wrapPoint > 0) {
      if (newOffset <= -wrapPoint) newOffset += wrapPoint;
      if (newOffset > 0) newOffset -= wrapPoint;
    }

    textPathRef.current.setAttribute("startOffset", `${newOffset}px`);
    setOffset(newOffset);
  };

  const endDrag = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!interactive) return;
    if (dragRef.current) {
      try {
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {}
      dragRef.current = false;
      if (Math.abs(velRef.current) > 0.5) {
        dirRef.current = velRef.current > 0 ? "right" : "left";
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full max-w-full h-[75px] sm:h-[100px] md:h-[130px] flex items-center justify-center overflow-hidden select-none z-20 touch-pan-y pointer-events-auto ${
        interactive ? "cursor-grab active:cursor-grabbing" : "cursor-default"
      } ${className}`}
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onPointerLeave={endDrag}
      role="region"
      aria-label="Prabhav Krishna brand marquee"
    >
      <motion.div
        style={{ y: yParallax }}
        className="w-full h-full flex items-center justify-center pointer-events-none overflow-hidden"
      >
        <svg
          className="w-full h-full block overflow-hidden pointer-events-none"
          viewBox="0 0 1440 120"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          {/* Hidden measurement text element */}
          <text
            ref={measureRef}
            xmlSpace="preserve"
            dominantBaseline="central"
            className="font-heading font-extrabold tracking-[0.20em] text-2xl sm:text-3xl md:text-4xl uppercase"
            style={{
              fontFamily: "var(--font-heading), 'Satoshi', sans-serif",
              visibility: "hidden",
              opacity: 0,
              pointerEvents: "none",
              position: "absolute",
            }}
          >
            {UNIT_TEXT}
          </text>

          {/* SVG Definitions with straight horizontal path */}
          <defs>
            <path id={pathId} d={pathD} fill="none" stroke="transparent" />
          </defs>

          {/* Rendered text along the straight horizontal path */}
          {ready && (
            <text
              xmlSpace="preserve"
              dominantBaseline="central"
              className="fill-white/[0.14] hover:fill-white/[0.22] font-heading font-extrabold tracking-[0.20em] text-2xl sm:text-3xl md:text-4xl uppercase transition-colors duration-500"
              style={{ fontFamily: "var(--font-heading), 'Satoshi', sans-serif" }}
            >
              <textPath
                ref={textPathRef}
                href={`#${pathId}`}
                startOffset={`${offset}px`}
                xmlSpace="preserve"
              >
                {Array.from({ length: repeatCount }).map((_, idx) => (
                  <tspan key={idx}>
                    {marqueeText}
                    {"\u00A0\u00A0"}
                    <tspan
                      fill="#A78BFA"
                      fillOpacity="0.45"
                      className="font-serif font-normal"
                    >
                      ✦
                    </tspan>
                    {"\u00A0\u00A0"}
                  </tspan>
                ))}
              </textPath>
            </text>
          )}
        </svg>
      </motion.div>
    </div>
  );
};

export default CurvedLoop;
