
import React, { useRef, useEffect } from 'react';
import { SystemLog } from '../types';
import { Radio } from 'lucide-react';
import { NeonButton } from '../components/SharedUI';

interface TerminalTabProps {
  systemLogs: SystemLog[];
  triggerWorldEvent: () => void;
}

export const TerminalTab: React.FC<TerminalTabProps> = ({ systemLogs, triggerWorldEvent }) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
     if(bottomRef.current) bottomRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [systemLogs]);

  return (
    <div className="h-full flex flex-col font-mono text-sm bg-black border border-zinc-800 p-4 relative overflow-hidden">
       <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_2px,3px_100%] pointer-events-none z-20"></div>
       <div className="absolute inset-0 bg-red-900/5 animate-pulse pointer-events-none z-10"></div>
       
       <div className="flex-1 overflow-y-auto space-y-2 relative z-30 pb-4">
          {systemLogs.map((log, i) => (
            <div key={log.id} className={`flex gap-4 ${
              log.type === 'critical' ? 'text-red-500 font-bold bg-red-900/10' :
              log.type === 'warning' ? 'text-yellow-500' :
              log.type === 'loot' ? 'text-emerald-400' :
              log.type === 'mission' ? 'text-blue-400' :
              'text-zinc-500'
            }`}>
               <span className="opacity-50">[{log.timestamp}]</span>
               <span>{log.content}</span>
            </div>
          ))}
          <div ref={bottomRef}></div>
       </div>

       <div className="mt-4 pt-4 border-t border-zinc-800 relative z-30 flex items-center gap-4">
           <span className="animate-pulse text-red-500">_</span>
           <input className="flex-1 bg-transparent outline-none text-red-500" placeholder="ENTER COMMAND..." disabled />
           
           <NeonButton variant="red" onClick={triggerWorldEvent} className="text-[10px]">
              <Radio size={12} className="mr-2"/> PING_ORACLE
           </NeonButton>
       </div>
    </div>
  );
};
