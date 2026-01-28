
import React, { useState } from 'react';
import { Coins, Activity, Search, ChevronUp, Box, Cpu, MapPin, Building2 } from 'lucide-react';
import { UserData, InventoryItem } from '../types';
import { getRarityBorder } from '../utils/styling';
import { TechBorder, NeonButton } from '../components/SharedUI';
import { CITY_INFO } from '../data/world';
import { SellModal } from '../components/Modals';

interface DashboardTabProps {
  currentUser: UserData | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<UserData | null>>;
  handleScavenge: () => void;
  isScavenging: boolean;
  showInventory: boolean;
  setShowInventory: (val: boolean) => void;
  handleUseItem: (id: string) => void;
  handleSellItem: (item: InventoryItem, quantity: number) => void;
  setShowJobModal: (val: boolean) => void;
  onShowInfo: (e: React.MouseEvent, title: string, content: string) => void;
  onHideInfo: () => void;
}

const StatBar = ({ label, value, max, color, onMouseEnter, onMouseLeave }: { label: string, value: number, max: number, color: string, onMouseEnter?: (e: React.MouseEvent) => void, onMouseLeave?: () => void }) => (
  <div className="w-full cursor-pointer hover:opacity-80 transition-opacity" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
    <div className="flex justify-between text-[10px] mb-1 font-mono text-zinc-500">
      <span>{label}</span>
      <span style={{ color }}>{value} <span className="text-zinc-700">/ {max}</span></span>
    </div>
    <div className="w-full h-1 bg-zinc-900 border border-zinc-800/50">
      <div 
        className="h-full transition-all duration-500 relative" 
        style={{ width: `${(value / max) * 100}%`, backgroundColor: color, boxShadow: `0 0 8px ${color}` }}
      ></div>
    </div>
  </div>
);

export const DashboardTab: React.FC<DashboardTabProps> = ({ 
  currentUser, handleScavenge, isScavenging, 
  showInventory, setShowInventory, handleUseItem, handleSellItem, setShowJobModal, onShowInfo, onHideInfo
}) => {
  const [sellingItem, setSellingItem] = useState<InventoryItem | null>(null);

  const confirmSell = (qty: number) => {
    if (sellingItem) {
      handleSellItem(sellingItem, qty);
      setSellingItem(null);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-full relative content-start">
      {/* Profile & Stats */}
      <TechBorder className="md:col-span-12 lg:col-span-8 space-y-8 bg-black/40 p-6 md:p-8">
         <div className="flex justify-between items-start border-b border-zinc-800/50 pb-6">
           <div className="space-y-2">
              <h2 className="text-4xl font-bold text-white font-orbitron tracking-widest">{currentUser?.realName}</h2>
              <div className="flex items-center gap-4 text-xs font-mono">
                <div className="text-zinc-500 flex items-center gap-2">
                   <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                   ID: {currentUser ? currentUser.id - 10000 : 'ERR'}
                </div>
                <div 
                  className="text-zinc-400 flex items-center gap-1 border border-zinc-800 px-2 py-0.5 bg-zinc-900/50 cursor-help hover:border-zinc-600 transition-colors"
                  onMouseEnter={(e) => onShowInfo(e, currentUser?.birthplace || "未知区域", CITY_INFO[currentUser?.birthplace || ''] || "该区域数据丢失或未收录。")}
                  onMouseLeave={onHideInfo}
                >
                   <MapPin size={10} /> {currentUser?.birthplace}
                </div>
              </div>
           </div>
           <div className="text-right">
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">当前职业</div>
              <button onClick={() => setShowJobModal(true)} className="text-red-500 font-bold hover:text-white hover:underline uppercase text-lg">{currentUser?.job}</button>
           </div>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-6">
               <StatBar 
                  label="理智值 // SAN" value={currentUser?.san || 0} max={currentUser?.maxSan || 100} color="#ef4444" 
                  onMouseEnter={(e) => onShowInfo(e, "理智值 // SAN", "角色当前的理智值(SAN)。当理智归零时，角色将彻底疯狂并被判定为‘死亡’。接触污染源、目睹恐怖事物或使用禁忌物品会降低此数值。")}
                  onMouseLeave={onHideInfo}
               />
               <StatBar 
                  label="体力值 // ENERGY" value={currentUser?.energy || 0} max={currentUser?.maxEnergy || 100} color="#10b981" 
                  onMouseEnter={(e) => onShowInfo(e, "体力值 // ENERGY", "角色的身体机能指数。进行探索、战斗或高强度任务需要消耗体力。体力耗尽时无法行动。")}
                  onMouseLeave={onHideInfo}
               />
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
               <div 
                  className="bg-zinc-900/30 p-3 border border-zinc-800 cursor-pointer hover:bg-zinc-800/50 hover:border-zinc-600 transition-colors"
                  onMouseEnter={(e) => onShowInfo(e, "信用点 // CREDITS", "深红之土的通用电子货币。可用于黑市交易、贿赂NPC、购买情报或支付义体维护费用。")}
                  onMouseLeave={onHideInfo}
               >
                  <div className="text-[9px] text-zinc-600 uppercase">信用点</div>
                  <div className="text-xl font-bold text-zinc-300">{currentUser?.credits}</div>
               </div>
               <div 
                  className="bg-zinc-900/30 p-3 border border-zinc-800 cursor-pointer hover:bg-zinc-800/50 hover:border-zinc-600 transition-colors"
                  onMouseEnter={(e) => onShowInfo(e, "同步率 // SYNC", "大脑与神经网的连接稳定性。同步率过低（<20%）可能导致连接中断或意识迷失。")}
                  onMouseLeave={onHideInfo}
               >
                  <div className="text-[9px] text-zinc-600 uppercase">同步率</div>
                  <div className="text-xl font-bold text-red-500">{currentUser?.syncRate}%</div>
               </div>
               <div className="bg-zinc-900/30 p-3 border border-zinc-800">
                  <div className="text-[9px] text-zinc-600 uppercase">当前任务</div>
                  <div className="text-xl font-bold text-emerald-500">{currentUser?.activeMissions.length}</div>
               </div>
            </div>
         </div>

         {/* Ability / Talent / Org Section */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6 border-t border-zinc-800 pt-8">
            <div>
                <h4 className="text-[10px] text-emerald-600 mb-4 uppercase tracking-widest border-l-2 border-emerald-600 pl-3">能力模块</h4>
                {currentUser?.abilities.length > 0 ? currentUser.abilities.map((ab, i) => (
                   <div 
                      key={i} 
                      className="mb-3 p-3 bg-zinc-900/40 border border-zinc-800 flex justify-between items-center group hover:border-zinc-600 hover:bg-zinc-800 transition-all cursor-pointer"
                      onMouseEnter={(e) => onShowInfo(e, `能力: ${ab.name}`, `${ab.desc}\n\n[类型] ${ab.type}\n[等级] ${ab.level}`)}
                      onMouseLeave={onHideInfo}
                   >
                      <div>
                         <div className="text-sm font-bold text-emerald-400 group-hover:text-emerald-300">{ab.name}</div>
                         <div className="text-[10px] text-zinc-500">{ab.type}</div>
                      </div>
                      <div className="text-xl font-bold font-orbitron text-zinc-600 group-hover:text-white border-b-2 border-zinc-800 group-hover:border-emerald-500 transition-colors">{ab.level}级</div>
                   </div>
                )) : <div className="text-xs text-zinc-700">暂无已装载的能力模块。</div>}
            </div>
            
            <div className="space-y-6">
               <div>
                  <h4 className="text-[10px] text-zinc-500 mb-4 uppercase tracking-widest border-l-2 border-zinc-600 pl-3">天赋特质</h4>
                  <div className="flex flex-wrap gap-2">
                     {currentUser?.talents.map((t, i) => {
                        const title = t.match(/【(.*?)】/)?.[1] || "天赋";
                        const desc = t.replace(/【.*?】/, '');
                        return (
                          <span 
                             key={i} 
                             className="text-[10px] text-zinc-400 bg-zinc-900 px-3 py-1.5 border border-zinc-800 cursor-pointer hover:border-zinc-500 hover:text-zinc-200 transition-colors"
                             onMouseEnter={(e) => onShowInfo(e, `天赋: ${title}`, desc)}
                             onMouseLeave={onHideInfo}
                          >
                             {title}
                          </span>
                        );
                     })}
                  </div>
               </div>

               <div>
                  <h4 className="text-[10px] text-amber-600 mb-4 uppercase tracking-widest border-l-2 border-amber-800 pl-3">所属势力</h4>
                  <div 
                     className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900/50 border border-zinc-800 text-xs text-zinc-400 hover:border-amber-900/50 hover:text-amber-500 transition-colors cursor-help"
                     onMouseEnter={(e) => onShowInfo(e, "所属势力", currentUser?.organization === '暂无' ? '当前未加入任何势力。' : `已加入: ${currentUser?.organization}`)}
                     onMouseLeave={onHideInfo}
                  >
                     <Building2 size={12} />
                     {currentUser?.organization || '暂无'}
                  </div>
               </div>
            </div>
         </div>
      </TechBorder>

      {/* Action Buttons (Bottom) */}
      <div className="md:col-span-12 lg:col-span-8 grid grid-cols-2 gap-6">
         <NeonButton variant="red" onClick={handleScavenge} disabled={isScavenging} className="h-16 w-full text-sm">
            {isScavenging ? <Activity className="animate-spin mr-3" size={18}/> : <Search className="mr-3" size={18}/>}
            区域探索
         </NeonButton>
         
         <NeonButton variant="zinc" onClick={() => setShowInventory(!showInventory)} className={`h-16 w-full text-sm ${showInventory ? 'border-zinc-400 text-zinc-200' : ''}`}>
            {showInventory ? <ChevronUp className="mr-3" size={18}/> : <Box className="mr-3" size={18}/>}
            物资背包
         </NeonButton>
      </div>

      {/* Inventory Panel */}
      {showInventory && (
         <div className="md:col-span-12 lg:col-span-8 bg-zinc-900/80 border-t border-zinc-700 p-6 animate-slideUp">
             <div className="flex justify-between items-center mb-6 text-xs text-zinc-500 uppercase tracking-widest">
                 <span>背包容量</span>
                 <span>{currentUser?.inventory.length} / 50</span>
             </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[300px] overflow-y-auto pr-2">
                 {currentUser?.inventory.map((item, idx) => (
                 <div key={`${item.id}_${idx}`} className={`p-3 border bg-black flex justify-between items-center ${getRarityBorder(item.rarity)}`}>
                     <div>
                         <div className="text-sm text-white font-bold">{item.name} <span className="text-[10px] text-zinc-500 font-normal ml-1">x{item.count}</span></div>
                         <div className="text-[10px] text-zinc-600 truncate max-w-[200px] mt-0.5">{item.desc}</div>
                     </div>
                     <div className="flex gap-3">
                         {item.type === 'consumable' && <button onClick={() => handleUseItem(item.id)} className="text-[10px] text-emerald-500 hover:underline font-bold">使用</button>}
                         {item.type !== 'gear' && <button onClick={() => setSellingItem(item)} className="text-[10px] text-zinc-600 hover:text-red-500 transition-colors">出售</button>}
                     </div>
                 </div>
                 ))}
                 {currentUser?.inventory.length === 0 && <div className="col-span-full text-center text-[10px] text-zinc-700 py-8">暂无物品</div>}
             </div>
         </div>
      )}

      {sellingItem && <SellModal item={sellingItem} onClose={() => setSellingItem(null)} onConfirm={confirmSell} />}
    </div>
  );
};
