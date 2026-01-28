
import React from 'react';
import { InventoryItem, UserData, ItemRarity } from '../types';
import { RefreshCw, ShoppingCart, Zap, Package, ShieldAlert, ChevronRight } from 'lucide-react';
import { NeonButton, CyberFrame } from '../components/SharedUI';
import { RARITY_LABELS } from '../data/world';

interface MarketTabProps {
  marketStock: InventoryItem[];
  currentUser: UserData | null;
  handleBuyItem: (item: InventoryItem) => void;
  handleRefreshMarket: () => void;
  onShowInfo: (e: React.MouseEvent, title: string, content: string) => void;
  onHideInfo: () => void;
}

const getRarityColor = (rarity: ItemRarity) => {
  switch (rarity) {
    case 'common': return 'text-zinc-400';
    case 'uncommon': return 'text-emerald-500';
    case 'rare': return 'text-purple-500';
    case 'epic': return 'text-pink-500';
    case 'legendary': return 'text-yellow-500';
    case 'cursed': return 'text-red-600';
    default: return 'text-zinc-600';
  }
};

const MarketCard: React.FC<{ 
    item: InventoryItem; 
    onBuy: () => void; 
    canBuy: boolean;
    onShowInfo: (e: React.MouseEvent, title: string, content: string) => void;
    onHideInfo: () => void;
}> = ({ item, onBuy, canBuy, onShowInfo, onHideInfo }) => {
  
  const rarityClass = getRarityColor(item.rarity);

  return (
    <CyberFrame variant="red" className={!canBuy ? 'opacity-50 grayscale' : ''}>
        <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 border border-zinc-700 bg-zinc-900 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:border-red-500 transition-colors">
                {item.type === 'consumable' ? <Zap size={18} /> : <Package size={18} />}
            </div>
            <div className={`text-[10px] uppercase font-bold tracking-widest border border-zinc-800 px-2 py-0.5 ${rarityClass} border-current`}>
                {RARITY_LABELS[item.rarity] || item.rarity}
            </div>
        </div>

        <div className="mb-2">
            <h3 
                className="text-white font-bold text-sm tracking-wide group-hover:text-red-500 transition-colors cursor-help"
                onMouseEnter={(e) => onShowInfo(e, item.name, item.desc)}
                onMouseLeave={onHideInfo}
            >
                {item.name}
            </h3>
            <p className="text-[10px] text-zinc-500 mt-1 line-clamp-2 h-8">{item.desc}</p>
        </div>

        <div className="mt-auto pt-4 border-t border-zinc-800/50 flex flex-col gap-2">
            <div className="flex justify-between items-center text-xs font-mono">
                <span className={item.count > 0 ? "text-zinc-400" : "text-red-900"}>
                    库存: {item.count > 0 ? item.count.toString().padStart(2, '0') : 'NULL'}
                </span>
                <span className="text-red-500 font-bold">{item.price} CR</span>
            </div>

            <button
                disabled={!canBuy}
                onClick={onBuy}
                className={`w-full py-2 text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all
                  ${canBuy 
                    ? 'bg-zinc-900 text-zinc-300 hover:bg-red-600 hover:text-white border border-zinc-700 hover:border-red-500' 
                    : 'bg-black text-zinc-700 border border-zinc-800 cursor-not-allowed'
                  }
                `}
            >
                {canBuy ? (
                    <>购买 <ChevronRight size={10} /></>
                ) : (
                    <>暂不可用 <ShieldAlert size={10} /></>
                )}
            </button>
        </div>
    </CyberFrame>
  );
};

export const MarketTab: React.FC<MarketTabProps> = ({ marketStock, currentUser, handleBuyItem, handleRefreshMarket, onShowInfo, onHideInfo }) => {
  return (
    <div className="h-full flex flex-col gap-8 pb-10">
       
       {/* Header Frame */}
       <div className="relative border-t-4 border-zinc-800 bg-[#080808] p-6 flex flex-col md:flex-row justify-between items-end shadow-xl">
          {/* Tech Decorations */}
          <div className="absolute top-0 left-0 w-24 h-full border-l border-zinc-800"></div>
          <div className="absolute top-0 right-0 w-4 h-4 bg-red-600"></div>
          <div className="absolute bottom-0 right-0 w-full h-[1px] bg-zinc-800"></div>
          <div className="absolute -bottom-1 left-4 w-32 h-1 bg-red-600"></div>
          
          <div className="relative z-10 flex items-center gap-6">
             <div className="w-16 h-16 bg-red-950/20 border border-red-900/50 flex items-center justify-center text-red-600 shadow-[0_0_15px_rgba(220,38,38,0.1)]">
                <ShoppingCart size={32} />
             </div>
             <div>
                <h1 className="text-4xl font-black font-orbitron text-white tracking-widest uppercase mb-1 leading-none">
                   <span className="text-red-600">黑</span> 市
                </h1>
                <div className="text-[10px] text-zinc-500 tracking-[0.5em] uppercase">
                   非法进入 ｜ ID: {currentUser?.id || 'UNKNOWN'}
                </div>
             </div>
          </div>

          <div className="relative z-10 flex flex-col items-end gap-2 mt-4 md:mt-0">
             <div 
                className="text-right cursor-help"
                onMouseEnter={(e) => onShowInfo(e, "CREDITS // 信用点", "深红之土的通用电子货币。")}
                onMouseLeave={onHideInfo}
             >
                <div className="text-[10px] text-zinc-500 uppercase font-bold">剩余行用点</div>
                <div className="text-3xl font-mono font-bold text-white flex items-center gap-2">
                   {currentUser?.credits} <span className="text-sm text-red-600">CR</span>
                </div>
             </div>
             <button 
                onClick={handleRefreshMarket}
                className="flex items-center gap-2 text-[10px] text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-700 px-3 py-1 hover:border-red-500 transition-colors"
             >
                <RefreshCw size={10} /> 刷新黑市 (-50)
             </button>
          </div>
       </div>

       {/* Items Grid */}
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {marketStock.map((item, idx) => (
            <MarketCard 
              key={`${item.id}_${idx}`} 
              item={item} 
              onBuy={() => handleBuyItem(item)}
              canBuy={item.count > 0 && (currentUser?.credits || 0) >= item.price}
              onShowInfo={onShowInfo}
              onHideInfo={onHideInfo}
            />
          ))}
       </div>
    </div>
  );
};
