"use client";

import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from 'react-pdf';

// Initialize PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function ResumePreview() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Document
      file="/assets/Prabhav_Krishna_Resume.pdf"
      loading={
        <div className="flex items-center justify-center h-full w-full">
          <span className="text-white/50 text-sm font-medium animate-pulse">Loading Resume...</span>
        </div>
      }
      className="flex items-center justify-center w-full h-full"
    >
      <Page 
        pageNumber={1} 
        renderTextLayer={false} 
        renderAnnotationLayer={false}
        className="max-w-full max-h-full drop-shadow-2xl [&>canvas]:!w-full [&>canvas]:!h-auto [&>canvas]:!max-h-[70vh] [&>canvas]:!object-contain [&>canvas]:rounded-xl"
      />
    </Document>
  );
}
