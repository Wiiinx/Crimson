
import React from 'react';
import { UserData } from '../types';
import { User, Cpu, Fingerprint, Activity } from 'lucide-react';
import { HUDRing, TechBorder, NeonButton } from '../components/SharedUI';

interface CharacterSheetProps {
  user: UserData;
  onConfirm: () => void;
  onShowInfo: (e: React.MouseEvent, title: string, content: string) => void;
  onHideInfo: () => void;
}

export const CharacterSheet: React.FC<CharacterSheetProps> = ({ user, onConfirm, onShowInfo, onHideInfo }) => {
  return (
    <div className="h-screen w-full bg-[#050505] relative overflow-hidden flex items-center justify-center p-4">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none opacity-20"></div>
      <HUDRing size={700} className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10" duration="40s" />

      {/* Main Unified Identity Card */}
      <TechBorder className="relative w-full max-w-4xl bg-black/90 p-8 flex flex-col md:flex-row gap-8 shadow-2xl shadow-red-900/10">
         
         {/* Left: Identity Visuals */}
         <div className="md:w-1/3 border-r border-zinc-800 pr-8 flex flex-col items-center text-center">
            <div className="relative w-40 h-40 border-2 border-red-900/50 flex items-center justify-center bg-zinc-900/50 mb-6">
               <User size={80} className="text-zinc-600" />
               <div className="absolute inset-0 border border-zinc-700 opacity-50 scale-110"></div>
               <div className="absolute -bottom-2 bg-red-900 text-white text-[10px] px-2 py-0.5">NO IMAGE</div>
            </div>
            
            <h2 className="text-3xl text-white font-orbitron tracking-wider mb-1">{user.realName}</h2>
            <div className="text-red-500 font-bold tracking-[0.2em] uppercase text-sm mb-4">{user.job}</div>
            
            <div className="w-full bg-zinc-900/50 p-4 border border-zinc-800 text-left space-y-2">
               <div className="flex justify-between text-xs text-zinc-500"><span>ID</span> <span className="text-zinc-300 font-mono">{user.username}</span></div>
               <div className="flex justify-between text-xs text-zinc-500"><span>性别</span> <span className="text-zinc-300">{user.gender === 'M' ? '男' : user.gender === 'F' ? '女' : '未知'}</span></div>
               <div className="flex justify-between text-xs text-zinc-500"><span>生日</span> <span className="text-zinc-300">{user.birthday}</span></div>
            </div>
         </div>

         {/* Right: Data & Abilities */}
         <div className="md:w-2/3 flex flex-col justify-between">
            <div className="space-y-6">
               {/* Stats Header */}
               <div className="flex items-center gap-2 border-b border-zinc-800 pb-2">
                  <Activity size={16} className="text-red-500" />
                  <span className="text-sm font-bold text-zinc-400 tracking-widest">角色信息</span>
               </div>
               
               {/* Stat Bars */}
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div 
                     className="bg-zinc-900/30 p-3 border border-zinc-800 cursor-pointer hover:bg-zinc-800/50 hover:border-red-900/50 transition-colors" 
                     onMouseEnter={(e) => onShowInfo(e, "SANITY // 理智", "角色当前的理智值(SAN)。当理智归零时，角色将彻底疯狂并被判定为‘死亡’。")}
                     onMouseLeave={onHideInfo}
                  >
                     <div className="text-[10px] text-zinc-500 uppercase mb-1">Sanity ｜ 理智值</div>
                     <div className="text-xl text-red-500 font-bold">{user.san} <span className="text-xs text-zinc-600">/ 100</span></div>
                  </div>
                  <div 
                     className="bg-zinc-900/30 p-3 border border-zinc-800 cursor-pointer hover:bg-zinc-800/50 hover:border-emerald-900/50 transition-colors" 
                     onMouseEnter={(e) => onShowInfo(e, "ENERGY // 体力", "角色的身体机能指数。进行探索、战斗或高强度任务需要消耗体力。")}
                     onMouseLeave={onHideInfo}
                  >
                     <div className="text-[10px] text-zinc-500 uppercase mb-1">Energy ｜ 体力</div>
                     <div className="text-xl text-emerald-500 font-bold">{user.energy} <span className="text-xs text-zinc-600">/ 100</span></div>
                  </div>
                  <div 
                     className="bg-zinc-900/30 p-3 border border-zinc-800 cursor-pointer hover:bg-zinc-800/50 hover:border-purple-900/50 transition-colors" 
                     onMouseEnter={(e) => onShowInfo(e, "SYNC RATE // 同步率", "大脑与神经网的连接稳定性。同步率过低（<20%）可能导致连接中断。")}
                     onMouseLeave={onHideInfo}
                  >
                     <div className="text-[10px] text-zinc-500 uppercase mb-1">Sync Rate ｜ 同步率</div>
                     <div className="text-xl text-purple-500 font-bold">{user.syncRate}%</div>
                  </div>
               </div>

               {/* Abilities List */}
               <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-2 border-b border-zinc-800 pb-2">
                     <Cpu size={16} className="text-emerald-500" />
                     <span className="text-sm font-bold text-zinc-400 tracking-widest">能力 ｜ 天赋</span>
                  </div>
                  {user.abilities.length > 0 ? user.abilities.map((ab, i) => (
                     <div 
                        key={i} 
                        className="flex justify-between items-center bg-zinc-900/20 border-l-2 border-emerald-500 pl-3 py-2 pr-2 cursor-pointer hover:bg-emerald-900/20 hover:border-emerald-400 transition-all group"
                        onMouseEnter={(e) => onShowInfo(e, `ABILITY: ${ab.name}`, `${ab.desc}\n\n[TYPE] ${ab.type}\n[LEVEL] ${ab.level}`)}
                        onMouseLeave={onHideInfo}
                     >
                        <div>
                           <div className="text-emerald-400 text-sm font-bold group-hover:text-emerald-300">{ab.name}</div>
                           <div className="text-[10px] text-zinc-500">{ab.type}</div>
                        </div>
                        <div className="text-right">
                           <div className="text-xs text-zinc-400 font-mono border border-zinc-700 px-1 group-hover:border-emerald-500/50">LV.{ab.level}</div>
                        </div>
                     </div>
                  )) : <div className="text-xs text-zinc-600 italic">No active modules detected.</div>}
               </div>

               {/* Talents */}
               <div className="flex flex-wrap gap-2 pt-2">
                  {user.talents.map((t, i) => {
                     const title = t.match(/【(.*?)】/)?.[1] || "天赋";
                     const desc = t.replace(/【.*?】/, '');
                     return (
                        <span 
                           key={i} 
                           className="text-[10px] text-zinc-400 bg-zinc-900 border border-zinc-700 px-2 py-1 cursor-pointer hover:border-zinc-500 hover:text-zinc-200 transition-colors"
                           onMouseEnter={(e) => onShowInfo(e, `天赋: ${title}`, desc)}
                           onMouseLeave={onHideInfo}
                        >
                           {title}
                        </span>
                     );
                  })}
               </div>
            </div>

            {/* Confirm Button */}
            <div className="flex justify-end items-center gap-4 mt-8 pt-4 border-t border-zinc-800">
               <div className="text-[10px] text-zinc-600 flex items-center gap-2 animate-pulse">
                  <Fingerprint size={12} /> WAITING FOR BIO-SIGNATURE...
               </div>
               <NeonButton variant="green" onClick={onConfirm} className="px-8">
                  CONFIRM 确认
               </NeonButton>
            </div>
         </div>

      </TechBorder>
    </div>
  );
};
