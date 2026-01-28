
import React from 'react';
import { UserData, Mission, ActiveMission } from '../types';
import { MISSION_DB } from '../data/missions';
import { CyberFrame, NeonButton } from '../components/SharedUI';
import { CheckCircle, Clock, Target, AlertTriangle } from 'lucide-react';

interface MissionsTabProps {
  currentUser: UserData | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<UserData | null>>;
  startMission: (mission: Mission) => void;
  completeMission: (active: ActiveMission) => void;
}

export const MissionsTab: React.FC<MissionsTabProps> = ({ currentUser, startMission, completeMission }) => {
  const activeMissions = currentUser?.activeMissions || [];
  
  // Available missions are those not active, not completed, matching requirements
  const availableMissions = MISSION_DB.filter(m => {
    if (m.jobRequirement && m.jobRequirement !== currentUser?.job) return false;
    if (m.prerequisiteMissionId && !currentUser?.completedMissionIds.includes(m.prerequisiteMissionId)) return false;
    if (m.prerequisiteTrust) {
      const currentTrust = currentUser?.npcRelations[m.prerequisiteTrust.npcId] || 0;
      if (currentTrust < m.prerequisiteTrust.level) return false;
    }
    if (activeMissions.some(am => am.missionId === m.id)) return false;
    if (!m.id.startsWith('gen_') && currentUser?.completedMissionIds.includes(m.id)) return false;
    return true;
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full content-start">
      
      {/* --- ACTIVE MISSIONS (Top Section) --- */}
      <div className="lg:col-span-12">
        <h3 className="text-sm text-red-500 font-bold uppercase tracking-widest border-b border-zinc-800 pb-2 mb-4 flex items-center gap-2">
            <ActivityIcon /> ACTIVE PROTOCOLS
        </h3>
        {activeMissions.length === 0 ? (
          <div className="text-zinc-600 text-xs italic p-4 border border-zinc-900 border-dashed text-center">
             NO ACTIVE SIGNALS DETECTED.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {activeMissions.map((am) => {
              const missionDef = MISSION_DB.find(m => m.id === am.missionId);
              if (!missionDef) return null;
              
              const totalDuration = missionDef.duration * 1000;
              const elapsed = Date.now() - am.startTime;
              const progress = Math.min(100, (elapsed / totalDuration) * 100);
              const timeLeft = Math.max(0, Math.ceil((totalDuration - elapsed) / 1000));
              const isComplete = timeLeft === 0;

              return (
                <CyberFrame key={am.missionId} variant="red">
                   <div className="flex justify-between items-start mb-4">
                     <div className="flex flex-col">
                        <div className="text-[10px] text-zinc-500 uppercase tracking-wider">{missionDef.category} MISSION</div>
                        <div className="text-white font-bold text-lg">{missionDef.title}</div>
                     </div>
                     <div className={`text-[10px] px-2 py-1 border ${isComplete ? 'bg-green-900/30 border-green-500 text-green-400' : 'bg-red-900/30 border-red-500 text-red-400'} animate-pulse`}>
                       {isComplete ? 'UPLOAD READY' : 'IN PROGRESS'}
                     </div>
                   </div>
                   
                   <div className="text-xs text-zinc-400 mb-4 h-10 line-clamp-2">{missionDef.desc}</div>
                   
                   {/* Progress Bar */}
                   <div className="w-full bg-zinc-900 h-2 mb-2 border border-zinc-700 relative overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-1000 ease-linear ${isComplete ? 'bg-green-500' : 'bg-red-600'}`} 
                        style={{ width: `${progress}%` }}
                      ></div>
                   </div>
                   
                   <div className="flex justify-between items-center mt-auto pt-2 border-t border-zinc-800/50">
                     <div className="text-xs font-mono text-zinc-500 flex items-center gap-2">
                       <Clock size={12} />
                       {isComplete ? '00:00' : `${timeLeft}s`}
                     </div>
                     <NeonButton 
                       variant={isComplete ? 'green' : 'zinc'} 
                       disabled={!isComplete}
                       onClick={() => completeMission(am)}
                       className="px-4 py-1"
                     >
                       {isComplete ? 'COMPLETE' : 'WAIT...'}
                     </NeonButton>
                   </div>
                </CyberFrame>
              );
            })}
          </div>
        )}
      </div>

      {/* --- AVAILABLE MISSIONS (Bottom Section) --- */}
      <div className="lg:col-span-12 mt-8">
        <h3 className="text-sm text-emerald-500 font-bold uppercase tracking-widest border-b border-zinc-800 pb-2 mb-4 flex items-center gap-2">
            <Target size={16} /> AVAILABLE CONTRACTS
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {availableMissions.map((m) => (
            <CyberFrame key={m.id} variant="zinc" className="hover:border-emerald-500 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <div className="font-bold text-emerald-400 text-sm">{m.title}</div>
                <div className="text-[9px] text-zinc-600 border border-zinc-800 px-1 uppercase">{m.type}</div>
              </div>
              
              <div className="text-[10px] text-zinc-500 mb-4 h-8 line-clamp-2">{m.desc}</div>
              
              <div className="grid grid-cols-2 gap-2 text-[9px] font-mono text-zinc-400 mb-4 bg-zinc-900/50 p-2 border border-zinc-800">
                 <div>COST: <span className="text-red-400">-{m.cost.san} SAN</span></div>
                 <div>TIME: <span className="text-zinc-300">{m.duration}s</span></div>
                 <div className="col-span-2 text-emerald-600">
                    REWARD: {m.rewards.credits ? `${m.rewards.credits}C` : ''} {m.rewards.item ? `+ITEM` : ''} {m.rewards.ability ? `+ABIL` : ''}
                 </div>
              </div>

              <NeonButton variant="zinc" onClick={() => startMission(m)} className="w-full text-center flex justify-center hover:border-emerald-500 hover:text-emerald-400">
                  ACCEPT
              </NeonButton>
            </CyberFrame>
          ))}
          {availableMissions.length === 0 && <div className="text-zinc-600 text-xs italic col-span-full text-center py-8">No contracts available at your current clearance level.</div>}
        </div>
      </div>
    </div>
  );
};

const ActivityIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
    </svg>
);
