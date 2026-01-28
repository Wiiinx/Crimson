
import { ItemRarity } from '../types';

export const getRarityBorder = (rarity?: ItemRarity) => {
  switch (rarity) {
    case 'common': return 'border-zinc-600';
    case 'uncommon': return 'border-emerald-600 shadow-[inset_0_0_10px_rgba(16,185,129,0.1)]';
    case 'rare': return 'border-purple-600 shadow-[inset_0_0_10px_rgba(147,51,234,0.1)]';
    case 'epic': return 'border-purple-500 shadow-[inset_0_0_15px_rgba(168,85,247,0.2)]';
    case 'legendary': return 'border-red-500 shadow-[inset_0_0_20px_rgba(239,68,68,0.2)]';
    case 'cursed': return 'border-red-900 animate-pulse bg-red-950/20';
    case 'junk': default: return 'border-zinc-800 opacity-70';
  }
};
