"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Folder as FolderIcon, FolderOpen, Eye } from "lucide-react";

export interface FolderItem {
  id: string;
  title: string;
  issuer?: string;
  date?: string;
  type: "image" | "pdf";
  file: string;
  thumbnail?: string;
  description?: string;
}

export interface FolderProps {
  color?: string;
  size?: number;
  items?: FolderItem[];
  className?: string;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSelectItem?: (item: FolderItem) => void;
  title: string;
  subtitle?: string;
  meta?: string;
  prominent?: boolean;
}

export function Folder({
  color = "#7C3AED",
  size = 1,
  items = [],
  className,
  isOpen: controlledIsOpen,
  onOpenChange,
  onSelectItem,
  title,
  subtitle,
  meta,
  prominent = false,
}: FolderProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isControlled = controlledIsOpen !== undefined;
  const open = isControlled ? controlledIsOpen : internalIsOpen;

  const folderRef = useRef<HTMLDivElement>(null);

  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 640);
    };
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  const setOpen = useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) {
        setInternalIsOpen(nextOpen);
      }
      onOpenChange?.(nextOpen);
    },
    [isControlled, onOpenChange]
  );

  const toggleOpen = useCallback(() => {
    setOpen(!open);
  }, [open, setOpen]);

  // Keyboard navigation on folder
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleOpen();
      } else if (e.key === "Escape" && open) {
        e.preventDefault();
        setOpen(false);
      }
    },
    [open, toggleOpen, setOpen]
  );

  // Close folder when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (open && folderRef.current && !folderRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, setOpen]);

  // Scaled dimensions:
  // We allocate a contained animation stage height so papers spread into their OWN pre-allocated headroom,
  // NEVER overlapping the headings or descriptions above!
  const effectiveSize = !isDesktop ? (prominent ? 0.94 : Math.min(size, 0.9)) : size;
  const baseWidth = prominent ? 280 : 220;
  const baseFolderHeight = prominent ? 170 : 140;
  const stageHeadroom = prominent ? 110 : 85;
  const stageHeight = (baseFolderHeight + stageHeadroom) * effectiveSize;
  const width = baseWidth * effectiveSize;
  const folderHeight = baseFolderHeight * effectiveSize;

  // Supports up to 5 items fanned inside this folder
  const displayItems = items.slice(0, 5);
  const totalItems = displayItems.length;

  return (
    <div
      ref={folderRef}
      className={cn(
        "flex flex-col items-center group/folder transition-all duration-300 max-w-full",
        open ? "z-30 relative" : "z-10 relative",
        className
      )}
      style={{ width: `${width}px`, maxWidth: "calc(100vw - 2.5rem)" }}
    >
      {/* =================================================================== */}
      {/* CONTAINED ANIMATION STAGE                                           */}
      {/* Upper headroom is reserved for the paper fan so it never collides!  */}
      {/* =================================================================== */}
      <div
        className="relative w-full flex flex-col justify-end select-none focus:outline-none"
        style={{
          height: `${stageHeight}px`,
          perspective: "1200px",
        }}
      >
        {/* Interactive Click Target wrapping the Folder Body */}
        <div
          className="relative w-full cursor-pointer focus:outline-none"
          style={{ height: `${folderHeight}px` }}
          onClick={toggleOpen}
          onKeyDown={handleKeyDown}
          role="button"
          tabIndex={0}
          aria-expanded={open}
          aria-label={`${title} archive folder with ${totalItems} documents. Click to ${open ? "close" : "open"}.`}
        >
          {/* =============================================================== */}
          {/* 1. FOLDER BACK FLAP & ARCHIVAL TAB                              */}
          {/* =============================================================== */}
          <div
            className={cn(
              "absolute inset-0 rounded-2xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
              "border border-purple-500/25 bg-gradient-to-b from-[#22163d] via-[#1a0f30] to-[#120924]",
              "shadow-[0_16px_36px_rgba(0,0,0,0.65)]",
              open
                ? "shadow-[0_22px_55px_rgba(0,0,0,0.85),0_0_35px_rgba(167,139,250,0.2)] border-purple-400/40"
                : "group-hover/folder:border-purple-400/35 group-hover/folder:shadow-[0_18px_40px_rgba(0,0,0,0.7),0_0_20px_rgba(167,139,250,0.1)]"
            )}
          >
            {/* Top Folder Tab */}
            <div
              className={cn(
                "absolute -top-4 left-4 h-4.5 rounded-t-lg transition-colors duration-500",
                "border-t border-l border-r border-purple-500/35 bg-[#22163d]",
                prominent ? "w-36" : "w-28"
              )}
            >
              <div className="flex items-center justify-between px-2.5 pt-0.5 text-[9px] sm:text-[10px] font-sans font-semibold text-purple-200 uppercase tracking-wider">
                <span>{prominent ? "EXPERIENCE" : "ARCHIVE"}</span>
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
              </div>
            </div>

            {/* Inner Folder Cavity Lighting */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />
          </div>

          {/* =============================================================== */}
          {/* 2. PAPERS / DOCUMENTS FAN                                       */}
          {/* =============================================================== */}
          <div className="absolute inset-x-2.5 bottom-2 top-2 z-10 pointer-events-none flex items-end justify-center">
            {displayItems.map((item, index) => {
              // Contained, responsive transforms:
              // translateY values are calibrated so the papers sit perfectly within stageHeadroom
              let transform = "translate3d(0, 0, 0)";
              let zIndex = 10;
              const opacity = 0.96;

              if (!open) {
                // Closed state: papers peek slightly inside the top of the folder
                const angle = (index - (totalItems - 1) / 2) * 1.5;
                const xOffset = (index - (totalItems - 1) / 2) * 2.5;
                transform = `translate3d(${xOffset}px, ${Math.abs(index - (totalItems - 1) / 2) * 2}px, 0) rotate(${angle}deg)`;
                zIndex = 11 + index;
              } else {
                // Open state: papers fan upward into the contained headroom
                const lift = prominent ? (isDesktop ? -78 : -58) : (isDesktop ? -62 : -46);

                if (totalItems === 1) {
                  transform = `translate3d(0px, ${lift}px, 15px) rotate(0deg) scale(1.05)`;
                  zIndex = 20;
                } else if (totalItems === 2) {
                  const xSpread = isDesktop ? 28 : 16;
                  if (index === 0) {
                    transform = `translate3d(-${xSpread}px, ${lift + 8}px, 10px) rotate(-8deg) scale(0.98)`;
                    zIndex = 20;
                  } else {
                    transform = `translate3d(${xSpread}px, ${lift + 8}px, 15px) rotate(8deg) scale(0.98)`;
                    zIndex = 21;
                  }
                } else if (totalItems === 3) {
                  // 3 papers spread
                  const xSpread = isDesktop ? 34 : 20;
                  if (index === 0) {
                    transform = `translate3d(-${xSpread}px, ${lift + 10}px, 5px) rotate(-11deg) scale(0.94)`;
                    zIndex = 20;
                  } else if (index === 1) {
                    transform = `translate3d(0px, ${lift}px, 15px) rotate(0deg) scale(1.04)`;
                    zIndex = 22;
                  } else {
                    transform = `translate3d(${xSpread}px, ${lift + 10}px, 10px) rotate(11deg) scale(0.94)`;
                    zIndex = 21;
                  }
                } else if (totalItems === 4) {
                  // 4 papers spread
                  const xSpread = isDesktop ? 38 : 22;
                  const angles = [-13, -4, 4, 13];
                  const xOffsets = [-xSpread * 1.3, -xSpread * 0.4, xSpread * 0.4, xSpread * 1.3];
                  const yOffsets = [12, 4, 4, 12];
                  transform = `translate3d(${xOffsets[index]}px, ${lift + yOffsets[index]}px, ${10 + index}px) rotate(${angles[index]}deg) scale(0.92)`;
                  zIndex = 20 + index;
                } else {
                  // 5 papers spread (e.g. Arkensys 5 internship records)
                  const xSpread = isDesktop ? 42 : 24;
                  const angles = [-15, -7.5, 0, 7.5, 15];
                  const xOffsets = [-xSpread * 1.4, -xSpread * 0.7, 0, xSpread * 0.7, xSpread * 1.4];
                  const yOffsets = [14, 6, 0, 6, 14];
                  const scales = [0.88, 0.94, 1.04, 0.94, 0.88];
                  const zIndices = [20, 22, 25, 23, 21];
                  transform = `translate3d(${xOffsets[index]}px, ${lift + yOffsets[index]}px, ${zIndices[index]}px) rotate(${angles[index]}deg) scale(${scales[index]})`;
                  zIndex = zIndices[index];
                }
              }

              return (
                <div
                  key={item.id}
                  className={cn(
                    "absolute w-[88%] aspect-[16/11] rounded-lg overflow-hidden",
                    "border border-white/20 bg-[#0e0919] shadow-md",
                    "transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    open
                      ? "pointer-events-auto hover:brightness-110 hover:!z-30 hover:border-purple-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.9),0_0_25px_rgba(167,139,250,0.4)]"
                      : "opacity-85 group-hover/folder:-translate-y-1.5"
                  )}
                  style={{
                    transform,
                    zIndex,
                    opacity,
                    transformOrigin: "bottom center",
                  }}
                  onClick={(e) => {
                    if (open) {
                      e.stopPropagation();
                      onSelectItem?.(item);
                    }
                  }}
                  role={open ? "button" : undefined}
                  tabIndex={open ? 0 : -1}
                  aria-label={`View document: ${item.title}`}
                  onKeyDown={(e) => {
                    if (open && (e.key === "Enter" || e.key === " ")) {
                      e.preventDefault();
                      e.stopPropagation();
                      onSelectItem?.(item);
                    }
                  }}
                >
                  {/* Paper Top Specular Line */}
                  <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent z-10" />

                  {/* Thumbnail Container */}
                  <div className="relative w-full h-full bg-[#0a0712]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.thumbnail || item.file}
                      alt={item.title}
                      className="w-full h-full object-cover object-top opacity-90 transition-transform duration-500 group-hover/folder:opacity-100"
                      loading="lazy"
                    />

                    {/* Gradient shadow overlay for legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent flex flex-col justify-end p-2.5">
                      <span className="text-[11px] sm:text-xs font-sans font-medium text-white/95 truncate drop-shadow-md leading-tight">
                        {item.title}
                      </span>
                      {item.issuer && (
                        <span className="text-[10px] sm:text-[11px] font-sans text-purple-200/90 truncate mt-0.5">
                          {item.issuer}
                        </span>
                      )}
                    </div>

                    {/* Hover View Badge when folder is open */}
                    {open && (
                      <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-black/85 backdrop-blur-md border border-white/25 text-[10px] sm:text-[11px] font-sans font-medium text-white flex items-center gap-1.5 shadow-md opacity-0 hover:opacity-100 transition-opacity">
                        <Eye size={12} className="text-accent" />
                        <span>View</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* =============================================================== */}
          {/* 3. FOLDER FRONT FLAP (3D Opening Cover)                         */}
          {/* =============================================================== */}
          <div
            className={cn(
              "absolute inset-x-0 bottom-0 h-[76%] rounded-b-2xl z-20",
              "border-t border-l border-r border-b border-purple-400/30",
              "bg-gradient-to-br from-[#2f1b4d]/95 via-[#23123c]/92 to-[#190a2d]/98 backdrop-blur-md",
              "transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)]",
              "shadow-[0_-4px_16px_rgba(0,0,0,0.5)]"
            )}
            style={{
              transformOrigin: "bottom center",
              transform: open ? "rotateX(-38deg) translateY(3px)" : "rotateX(0deg)",
              transformStyle: "preserve-3d",
            }}
          >
            {/* Specular Top Rim Highlight */}
            <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-purple-300/50 to-transparent pointer-events-none" />

            {/* Front Flap Content */}
            <div className="relative w-full h-full flex flex-col justify-between p-3.5 select-none">
              {/* Top Row: Status badge */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.08] border border-white/[0.14] text-xs sm:text-sm font-sans font-medium text-purple-100">
                  {open ? (
                    <FolderOpen size={14} className="text-accent" />
                  ) : (
                    <FolderIcon size={14} className="text-accent" />
                  )}
                  <span>
                    {open
                      ? "Archive Open"
                      : `${items.length} ${items.length === 1 ? "document" : "documents"}`}
                  </span>
                </div>

                {/* Status Indicator */}
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_10px_rgba(167,139,250,0.9)]" />
                </div>
              </div>

              {/* Bottom Row: Title Imprint */}
              <div className="flex items-center justify-between pt-2 border-t border-purple-500/20">
                <span className="text-xs sm:text-sm font-sans font-medium text-white/85 tracking-wide truncate">
                  {title}
                </span>
                <span className="text-xs sm:text-sm font-sans font-medium text-purple-200 group-hover/folder:text-white transition-colors">
                  {open ? "Close" : "Inspect"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =================================================================== */}
      {/* 4. FOLDER METADATA & TITLE BENEATH                                  */}
      {/* Clean sans-serif typography, scaled for effortless reading          */}
      {/* =================================================================== */}
      <div className="mt-4 text-center w-full px-1">
        <h4 className={cn("font-heading font-semibold text-white tracking-tight leading-snug", prominent ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl")}>
          {title}
        </h4>
        {subtitle && (
          <p className={cn("font-sans font-normal text-white/75 mt-1.5 leading-relaxed", prominent ? "text-base sm:text-lg" : "text-sm sm:text-base")}>
            {subtitle}
          </p>
        )}
        {meta && (
          <p className={cn("font-sans text-accent font-medium mt-1", prominent ? "text-sm sm:text-base" : "text-xs sm:text-sm")}>
            {meta}
          </p>
        )}

        {/* Action Controls beneath: only Open/Close Folder */}
        <div className="mt-3.5 flex items-center justify-center">
          <button
            onClick={toggleOpen}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/[0.06] hover:bg-white/[0.14] border border-white/[0.14] hover:border-purple-400/50 text-sm font-sans font-medium text-white/95 hover:text-white transition-all duration-300 shadow-sm active:scale-95 cursor-pointer"
            aria-label={`${open ? "Close" : "Open"} ${title} folder`}
          >
            {open ? (
              <>
                <FolderOpen size={15} className="text-accent" />
                <span>Close Folder</span>
              </>
            ) : (
              <>
                <FolderIcon size={15} className="text-accent" />
                <span>Open Folder</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Folder;
