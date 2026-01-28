
import React, { useState } from 'react';
import { InventoryItem, Mission, MissionReward } from '../types';
import { getRarityBorder } from '../utils/styling';
import { SciFiPanel, NeonButton, HUDRing } from './SharedUI';
import { X, Minus, Plus, AlertTriangle, CheckCircle, Target, Activity } from 'lucide-react';

export const ScavengeResultModal: React.FC<{ item?: InventoryItem, msg: string, onClose: () => void }> = ({ item, msg, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fadeIn p-4" onClick={onClose}>
      <div className="relative max-w-sm w-full bg-black border border-zinc-700 p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
         {/* Modal HUD Decoration */}
         <div className="absolute -top-1 -left-1 w-3 h-3 border-t border-l border-red-500"></div>
         <div className="absolute -top-1 -right-1 w-3 h-3 border-t border-r border-red-500"></div>
         <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b border-l border-red-500"></div>
         <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b border-r border-red-500"></div>
         
         <div className="text-center space-y-6">
            <h3 className="text-lg font-orbitron font-bold text-red-500 tracking-widest border-b border-zinc-800 pb-2">SCAN_RESULT</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">{msg}</p>
            
            {item && (
               <div className={`p-4 border bg-zinc-900/50 ${getRarityBorder(item.rarity)}`}>
                  <div className="font-bold text-white mb-1 uppercase">{item.name}</div>
                  <div className="text-[10px] text-zinc-500">{item.desc}</div>
               </div>
            )}
            
            <NeonButton onClick={onClose} variant="zinc" className="w-full">CONFIRM</NeonButton>
         </div>
      </div>
    </div>
  );
};

export const JobIntroModal: React.FC<{ job: string, onClose: () => void, isModal?: boolean }> = ({ job, onClose, isModal = false }) => {
  const desc = job === '剥夺者' 
    ? "剥夺者，依靠猎杀特殊能力者夺走他们的超凡能力获取力量的职业。"
    : "代行者，以人类之躯行走世间以获得比肩神明的力量的职业。";
  
  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-fadeIn`}>
      <div className="relative w-full max-w-2xl bg-black border border-zinc-800 p-12 overflow-hidden">
        {/* Background Elements */}
        <HUDRing size={400} className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(220,38,38,0.05)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none"></div>

        {isModal && <button onClick={onClose} className="absolute top-4 right-4 text-zinc-500 hover:text-white"><X size={24}/></button>}
        
        <div className="relative z-10 text-center space-y-8">
           <div className="inline-block border border-red-900/50 bg-red-950/20 px-4 py-1 text-[10px] text-red-500 tracking-[0.5em] animate-pulse">CLASSIFIED FILE // OPENED</div>
           
           <h2 className="text-5xl md:text-7xl font-bold text-white tracking-widest font-orbitron mix-blend-difference">{job}</h2>
           
           <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-red-900 to-transparent"></div>
           
           <p className="text-xl md:text-2xl text-zinc-400 font-serif italic leading-loose px-4">
             “{desc}”
           </p>
           
           {!isModal && (
             <div className="pt-8">
               <NeonButton variant="red" onClick={onClose} className="px-12 py-4 text-lg w-full md:w-auto">
                 确认
               </NeonButton>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export const InfoHUDModal: React.FC<{ title: string; content: string; x: number; y: number }> = ({ title, content, x, y }) => {
  // Prevent modal from going off-screen
  const fixedX = Math.min(x + 20, window.innerWidth - 320); 
  const fixedY = Math.min(y + 20, window.innerHeight - 200);

  return (
    <div 
      className="fixed z-[100] w-[300px] pointer-events-none"
      style={{ top: fixedY, left: fixedX }}
    >
        <style>{`
          @keyframes unfold {
            0% { clip-path: polygon(0 0, 0 0, 0 100%, 0 100%); opacity: 0; }
            100% { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); opacity: 1; }
          }
        `}</style>
       <div 
         className="relative bg-black/95 border border-red-900/50 p-4 shadow-[0_0_20px_rgba(220,38,38,0.15)] backdrop-blur-sm overflow-hidden"
         style={{ animation: 'unfold 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
       >
          {/* Decorative Corner Lines */}
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-red-600"></div>
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-red-600"></div>
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-red-600"></div>
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-red-600"></div>
          
          {/* Header */}
          <div className="flex justify-between items-center mb-2 pb-2 border-b border-red-900/30">
             <h3 className="text-sm font-bold font-orbitron text-red-500 tracking-wider flex items-center gap-2 uppercase">
               <span className="w-1 h-3 bg-red-600 animate-pulse"></span>
               {title}
             </h3>
          </div>
          
          {/* Content */}
          <div className="text-zinc-400 font-mono text-xs leading-relaxed whitespace-pre-wrap">
             {content}
          </div>

          {/* Background Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(20,0,0,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(20,0,0,0.5)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none -z-10 opacity-20"></div>
       </div>
    </div>
  );
};

export const SellModal: React.FC<{ item: InventoryItem; onClose: () => void; onConfirm: (qty: number) => void }> = ({ item, onClose, onConfirm }) => {
  const [qty, setQty] = useState(1);
  const max = item.count;
  const total = item.price * qty;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fadeIn" onClick={onClose}>
      <div className="bg-black border border-zinc-700 p-6 w-[350px] relative shadow-2xl" onClick={e => e.stopPropagation()}>
         <button onClick={onClose} className="absolute top-4 right-4 text-zinc-500 hover:text-white"><X size={20}/></button>
         
         <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-2">
            <span className="w-1 h-4 bg-red-600"></span>
            出售物品
         </h3>
         
         <div className="flex items-center gap-4 mb-6">
             <div className={`w-12 h-12 border bg-zinc-900 flex items-center justify-center font-bold text-xl text-zinc-500 ${getRarityBorder(item.rarity)}`}>
                 {item.name.charAt(0)}
             </div>
             <div>
                 <div className="text-white font-bold">{item.name}</div>
                 <div className="text-xs text-zinc-500">单价: <span className="text-emerald-500">{item.price} CR</span></div>
             </div>
         </div>
         
         <div className="flex items-center justify-between bg-zinc-900/50 p-3 border border-zinc-800 mb-6">
             <button 
                 onClick={() => setQty(Math.max(1, qty - 1))} 
                 className="p-2 hover:text-white text-zinc-500 disabled:opacity-30"
                 disabled={qty <= 1}
             >
                 <Minus size={16} />
             </button>
             <span className="font-mono text-xl text-white">{qty}</span>
             <button 
                 onClick={() => setQty(Math.min(max, qty + 1))} 
                 className="p-2 hover:text-white text-zinc-500 disabled:opacity-30"
                 disabled={qty >= max}
             >
                 <Plus size={16} />
             </button>
         </div>
         
         <div className="flex justify-between items-center mb-6 text-sm">
             <span className="text-zinc-500">获得总额</span>
             <span className="text-emerald-500 font-bold text-lg">{total} CR</span>
         </div>
         
         <NeonButton onClick={() => onConfirm(qty)} variant="zinc" className="w-full">
             确认交易
         </NeonButton>
      </div>
    </div>
  );
};

export const MissionTriggerModal: React.FC<{ mission: Mission, onAccept: () => void, onReject: () => void }> = ({ mission, onAccept, onReject }) => {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-md animate-fadeIn" onClick={(e) => e.stopPropagation()}>
      <div 
        className="relative max-w-2xl w-full bg-[#050505] p-8 md:p-12 overflow-hidden"
        onClick={e => e.stopPropagation()}
        style={{
            clipPath: 'polygon(0 0, 100% 0, 100% 85%, 95% 100%, 0 100%)'
        }}
      >
         {/* HUD Structure Lines */}
         {/* Top Line */}
         <div className="absolute top-4 left-4 right-4 h-[1px] bg-zinc-700 flex justify-between items-center">
             <div className="w-2 h-2 bg-zinc-500"></div>
             <div className="w-32 h-[2px] bg-black"></div> {/* Gap for title */}
             <div className="w-2 h-2 bg-zinc-500"></div>
         </div>
         {/* Bottom Line */}
         <div className="absolute bottom-4 left-4 right-12 h-[1px] bg-zinc-700 flex justify-between items-center">
             <div className="w-2 h-2 bg-zinc-500"></div>
             <div className="w-2 h-2 bg-zinc-500"></div>
         </div>

         {/* Corner Brackets */}
         <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-zinc-500"></div>
         <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-zinc-500"></div>
         <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-zinc-500"></div>
         <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-zinc-500"></div>

         {/* Center Reticle Faint */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-zinc-800 opacity-20 rounded-full pointer-events-none"></div>
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-[1px] bg-zinc-800 opacity-30 pointer-events-none"></div>
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-60 bg-zinc-800 opacity-30 pointer-events-none"></div>
         
         {/* Content Container */}
         <div className="relative z-10 flex flex-col items-center text-center space-y-6">
            
            {/* Header */}
            <div className="space-y-1">
                <div className="text-[10px] text-zinc-500 tracking-[0.5em] uppercase">Incoming Signal</div>
                <div className="text-red-500 font-bold font-orbitron text-xl tracking-widest uppercase flex items-center justify-center gap-2">
                    <Target size={16} /> MISSION_ALERT
                </div>
            </div>

            {/* Title & Desc */}
            <div className="w-full border-y border-zinc-800 py-6 bg-zinc-900/10">
                <h2 className="text-3xl font-bold text-white tracking-wider font-orbitron mb-4">{mission.title}</h2>
                <div className="text-sm text-zinc-400 leading-relaxed max-w-lg mx-auto font-mono">
                    "{mission.desc}"
                </div>
            </div>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 w-full gap-px bg-zinc-800 border border-zinc-800">
                <div className="bg-black p-4 flex flex-col items-center gap-2">
                    <span className="text-[9px] text-zinc-500 uppercase tracking-widest flex items-center gap-1"><AlertTriangle size={10} className="text-red-500"/> COST</span>
                    <div className="text-sm font-mono text-zinc-300">
                        SAN: <span className="text-red-500 font-bold">-{mission.cost.san}</span> <span className="text-zinc-600">|</span> ENG: <span className="text-red-500 font-bold">-{mission.cost.energy}</span>
                    </div>
                </div>
                <div className="bg-black p-4 flex flex-col items-center gap-2">
                    <span className="text-[9px] text-zinc-500 uppercase tracking-widest flex items-center gap-1"><Activity size={10} className="text-emerald-500"/> REWARD</span>
                    <div className="text-sm font-mono text-zinc-300">
                        {mission.rewards.credits ? <span className="text-emerald-500 font-bold">{mission.rewards.credits} CR</span> : 'UNKNOWN'}
                    </div>
                </div>
            </div>

            <p className="text-[10px] text-zinc-600 mt-2 font-mono">
                [SYSTEM WARNING]: 凡事皆有代价。拒绝可能会让你少承受一分风险。
            </p>

            {/* Actions */}
            <div className="flex gap-6 w-full max-w-md pt-4">
                <button 
                    onClick={onReject} 
                    className="flex-1 py-3 text-xs font-bold border border-zinc-700 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300 transition-all uppercase tracking-widest"
                >
                    拒绝
                </button>
                <button 
                    onClick={onAccept} 
                    className="flex-1 py-3 text-xs font-bold bg-red-900/20 border border-red-900 text-red-500 hover:bg-red-900/40 hover:text-red-100 transition-all uppercase tracking-widest shadow-[0_0_15px_rgba(220,38,38,0.2)]"
                >
                    接受
                </button>
            </div>
         </div>
      </div>
    </div>
  );
};

export const MissionSettlementModal: React.FC<{ mission: Mission, rewards: MissionReward, onClose: () => void }> = ({ mission, rewards, onClose }) => {
    return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fadeIn" onClick={onClose}>
        <div className="relative max-w-md w-full bg-black border border-emerald-900 p-8 shadow-[0_0_30px_rgba(16,185,129,0.1)]" onClick={e => e.stopPropagation()}>
           
           <div className="text-center space-y-6">
              <div className="flex justify-center text-emerald-500 mb-4">
                  <CheckCircle size={48} className="animate-bounce" />
              </div>
              
              <h3 className="text-xl font-bold font-orbitron text-white tracking-widest uppercase">任务完成</h3>
              
              <div className="text-sm text-zinc-400 italic">
                  "{rewards.text}"
              </div>
  
              <div className="bg-zinc-900/50 border border-zinc-800 p-4 space-y-2 text-left">
                  <div className="text-xs text-zinc-500 uppercase tracking-widest border-b border-zinc-800 pb-1 mb-2">Rewards Acquired</div>
                  {rewards.credits && <div className="text-emerald-400 font-mono">+ {rewards.credits} 信用点</div>}
                  {rewards.item && <div className={`text-white font-bold ${getRarityBorder(rewards.item.rarity)} p-1 pl-2 text-xs`}>+ ITEM: {rewards.item.name}</div>}
                  {rewards.ability && <div className="text-purple-400 font-bold text-xs">+ 能力: {rewards.ability.name}</div>}
                  {rewards.attribute && <div className="text-blue-400 font-bold text-xs">+ ATTRIBUTE: {rewards.attribute.name.toUpperCase()} +{rewards.attribute.value}</div>}
                  {rewards.trust && <div className="text-amber-400 font-mono text-xs">+ 信任值: {rewards.trust.npcId.toUpperCase()} +{rewards.trust.amount}</div>}
              </div>
              
              <NeonButton onClick={onClose} variant="green" className="w-full">
                  确认结算
              </NeonButton>
           </div>
        </div>
      </div>
    );
  };
