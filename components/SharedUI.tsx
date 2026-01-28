
import React, { useState, useEffect } from 'react';
import { ItemRarity } from '../types';
import { getRarityBorder } from '../utils/styling';

export const HUDRing: React.FC<{ size?: number, className?: string, duration?: string, color?: string }> = ({ size = 200, className = "", duration = "10s", color = "stroke-red-900" }) => (
  <div className={`absolute pointer-events-none flex items-center justify-center opacity-30 ${className}`} style={{ width: size, height: size }}>
    <svg viewBox="0 0 100 100" className="w-full h-full animate-spin-slow" style={{ animationDuration: duration }}>
      <circle cx="50" cy="50" r="48" fill="none" strokeWidth="0.5" className={color} strokeDasharray="10 5" />
      <circle cx="50" cy="50" r="40" fill="none" strokeWidth="1" className={color} strokeDasharray="30 30" opacity="0.5" />
      <path d="M50 10 V 20 M 50 90 V 80 M 10 50 H 20 M 90 50 H 80" strokeWidth="2" className={color} />
    </svg>
  </div>
);

export const TechBorder: React.FC<{ children: React.ReactNode, className?: string, active?: boolean }> = ({ children, className = "", active = false }) => (
  <div className={`relative p-1 ${className}`}>
    <div className={`absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 transition-colors duration-500 ${active ? 'border-red-500 shadow-[0_0_10px_#ef4444]' : 'border-zinc-600'}`}></div>
    <div className={`absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 transition-colors duration-500 ${active ? 'border-red-500 shadow-[0_0_10px_#ef4444]' : 'border-zinc-600'}`}></div>
    <div className={`absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 transition-colors duration-500 ${active ? 'border-red-500 shadow-[0_0_10px_#ef4444]' : 'border-zinc-600'}`}></div>
    <div className={`absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 transition-colors duration-500 ${active ? 'border-red-500 shadow-[0_0_10px_#ef4444]' : 'border-zinc-600'}`}></div>
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[1px] bg-zinc-800"></div>
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-[1px] bg-zinc-800"></div>
    {children}
  </div>
);

export const SciFiPanel: React.FC<{
  children: React.ReactNode;
  className?: string;
  variant?: 'mint' | 'red' | 'default';
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  style?: React.CSSProperties;
  rarity?: ItemRarity;
}> = ({ children, className = "", variant = 'mint', onClick, style, rarity }) => {
  const styles = {
    mint: 'bg-black/80 border-emerald-900/50 text-emerald-400',
    red: 'bg-black/80 border-red-900/50 text-red-500',
    default: 'bg-black/90 border-zinc-800 text-zinc-300'
  };

  const baseStyle = styles[variant];
  const borderStyle = rarity ? getRarityBorder(rarity) : baseStyle;

  return (
    <div 
      onClick={onClick}
      className={`relative border p-4 backdrop-blur-md overflow-hidden group ${borderStyle} ${className} ${onClick ? 'cursor-pointer hover:bg-white/5' : ''}`}
      style={{ 
        clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)",
        ...style
      }}
    >
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[linear-gradient(90deg,transparent_95%,#ffffff_95%)] bg-[size:10px_10px]"></div>
      <div className={`absolute top-0 right-0 w-0 h-0 border-t-[20px] border-l-[20px] border-t-${variant === 'red' ? 'red-900' : 'zinc-800'} border-l-transparent opacity-50`}></div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export const CyberFrame: React.FC<{ children: React.ReactNode, className?: string, variant?: 'red' | 'zinc' }> = ({ children, className = "", variant = 'red' }) => {
  const hoverColor = variant === 'red' ? 'group-hover:bg-red-600' : 'group-hover:bg-emerald-600';
  
  return (
    <div className={`relative p-[1px] bg-zinc-800 transition-all duration-300 group ${hoverColor} ${className}`}
         style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)" }}>
      
      <div className="bg-[#080808] h-full w-full relative flex flex-col overflow-hidden" 
           style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 11px), calc(100% - 11px) 100%, 0 100%)" }}>
         
         {/* Top Decoration Bar */}
         <div className="absolute top-0 left-0 w-full h-2 bg-zinc-900 border-b border-zinc-800 flex justify-between items-center px-1">
            <div className={`w-1/3 h-[2px] bg-zinc-700 ${hoverColor} transition-colors`}></div>
            <div className="flex gap-1">
               <div className="w-1 h-1 bg-zinc-600 rounded-full"></div>
               <div className="w-1 h-1 bg-zinc-600 rounded-full"></div>
            </div>
         </div>

         {/* Content Area */}
         <div className="p-5 pt-6 flex-1 flex flex-col">
            {children}
         </div>

         {/* Bottom Right Decor */}
         <div className={`absolute bottom-0 right-0 w-3 h-3 bg-zinc-800 ${hoverColor} transition-colors`}
              style={{ clipPath: "polygon(100% 0, 0 100%, 100% 100%)" }}></div>
      </div>
    </div>
  );
};

export const NeonButton: React.FC<{ 
  onClick?: (e: React.MouseEvent) => void; children: React.ReactNode; 
  variant?: 'green' | 'red' | 'zinc'; className?: string; type?: "button" | "submit";
  disabled?: boolean;
}> = ({ onClick, children, variant = 'green', className = "", type = "button", disabled = false }) => {
  const colors = {
    green: 'border-emerald-600 text-emerald-500 hover:bg-emerald-900/30 shadow-[0_0_5px_rgba(16,185,129,0.2)]',
    red: 'border-red-600 text-red-500 hover:bg-red-900/30 shadow-[0_0_5px_rgba(220,38,38,0.2)]',
    zinc: 'border-zinc-600 text-zinc-400 hover:bg-zinc-800'
  };

  return (
    <button 
      type={type} 
      onClick={onClick} 
      disabled={disabled}
      className={`relative border px-6 py-2 transition-all duration-200 uppercase tracking-widest text-[10px] font-bold overflow-hidden group ${colors[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed grayscale' : 'hover:scale-[1.01] active:scale-[0.99]'}`}
    >
      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
      <div className="flex items-center justify-center gap-2">
        {children}
      </div>
    </button>
  );
};

export const TypewriterLines: React.FC<{ lines: string[], colorClass?: string, onComplete?: () => void, speed?: number }> = ({ lines, colorClass = "text-emerald-500", onComplete, speed = 20 }) => {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  useEffect(() => {
    if (currentLineIndex >= lines.length) {
      if (onComplete) setTimeout(onComplete, 300);
      return;
    }

    const timer = setTimeout(() => {
      const currentLine = lines[currentLineIndex];
      
      if (currentCharIndex < currentLine.length) {
        const nextChar = currentLine[currentCharIndex];
        setDisplayedLines(prev => {
          const newLines = [...prev];
          if (!newLines[currentLineIndex]) newLines[currentLineIndex] = '';
          newLines[currentLineIndex] += nextChar;
          return newLines;
        });
        setCurrentCharIndex(prev => prev + 1);
      } else {
        setCurrentLineIndex(prev => prev + 1);
        setCurrentCharIndex(0);
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [currentLineIndex, currentCharIndex, lines, onComplete, speed]);

  return (
    <div className={`font-mono text-sm md:text-base leading-relaxed ${colorClass}`}>
      {displayedLines.map((line, i) => (
        <div key={i} className="whitespace-pre-wrap min-h-[1.5em]">{line}</div>
      ))}
      {currentLineIndex < lines.length && <span className="animate-pulse bg-current inline-block w-2 h-4 align-middle ml-1"></span>}
    </div>
  );
};
