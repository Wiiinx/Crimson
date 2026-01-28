
import React from 'react';
import { Target, Clock, Skull } from 'lucide-react';

interface HeaderProps {
  worldTime: Date;
  survivors: number;
}

export const Header: React.FC<HeaderProps> = ({ worldTime, survivors }) => {
  return (
    <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-zinc-800 pb-4 gap-4 sticky top-0 bg-[#050505]/95 backdrop-blur z-40 pt-2">
      <div className="flex items-center gap-4">
         <div className="relative w-12 h-12 border border-red-900 flex items-center justify-center bg-red-950/20">
            <div className="absolute inset-0 border-t border-l border-red-500 w-3 h-3"></div>
            <Target className="text-red-600 animate-spin-slow" size={24} />
         </div>
         <div>
            <h1 className="text-2xl font-bold font-orbitron text-red-600 tracking-tighter leading-none">CRIMSON SOIL</h1>
            <div className="text-[9px] text-zinc-500 tracking-[0.3em] flex items-center gap-2">
               NEURAL_LINK <span className="w-1 h-1 bg-green-500 rounded-full"></span> V2.4.1
            </div>
         </div>
      </div>
      
      <div className="flex items-center gap-6 text-xs font-mono">
         <div className="flex items-center gap-2 text-zinc-500">
           <Clock size={14} />
           <span>{worldTime.toLocaleTimeString()}</span>
         </div>
         <div className="flex items-center gap-2 text-red-800 animate-pulse">
           <Skull size={14} />
           <span>{survivors} / 10000</span>
         </div>
      </div>
    </header>
  );
};
