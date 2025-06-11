"use client";

import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

interface MermaidProps {
  chart: string;
  caption?: string;
  className?: string;
}

export const MermaidDiagram: React.FC<MermaidProps> = ({ chart, caption, className = "" }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'neutral',
      securityLevel: 'loose',
      fontFamily: 'inherit',
      fontSize: 18, // Increase font size
    });
    
    if (ref.current) {
      // Generate a unique ID for this diagram
      const id = `mermaid-${Math.random().toString(36).substring(2, 11)}`;
      
      mermaid.render(id, chart).then((result) => {
        if (ref.current) {
          ref.current.innerHTML = result.svg;
          
          // Get the SVG element and make it responsive
          const svg = ref.current.querySelector('svg');
          if (svg) {
            svg.setAttribute('width', '100%');
            svg.setAttribute('height', 'auto');
            svg.style.maxWidth = '100%';
          }
        }
      });
    }
  }, [chart]);

  return (
    <div className="flex flex-col items-center gap-4 my-8">
      <div ref={ref} className={`w-full max-w-5xl mx-auto bg-white rounded-lg p-6 ${className}`} />
      {caption && (
        <p className="text-sm text-muted-foreground italic">{caption}</p>
      )}
    </div>
  );
};
