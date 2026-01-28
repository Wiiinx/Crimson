
import { InventoryItem } from '../types';

// ==================== MARKET CONSUMABLES ====================
export const MARKET_CONSUMABLES: InventoryItem[] = [
  { id: 'med_low', name: "过期营养液", type: 'consumable', rarity: 'common', price: 50, count: 0, maxStock: 20, desc: "难喝的糊状物。恢复 15 体力。", 
    effect: (u) => ({ energy: Math.min(u.maxEnergy, u.energy + 15) }) },
  { id: 'med_std', name: "军用能量棒", type: 'consumable', rarity: 'uncommon', price: 120, count: 0, maxStock: 10, desc: "高热量补给。恢复 40 体力。", 
    effect: (u) => ({ energy: Math.min(u.maxEnergy, u.energy + 40) }) },
  { id: 'san_low', name: "薄荷香烟", type: 'consumable', rarity: 'common', price: 80, count: 0, maxStock: 15, desc: "稍微缓解焦虑。恢复 5 SAN。", 
    effect: (u) => ({ san: Math.min(u.maxSan, u.san + 5) }) },
  { id: 'san_mid', name: "镇静注射剂", type: 'consumable', rarity: 'rare', price: 250, count: 0, maxStock: 5, desc: "强效镇静。恢复 25 SAN，但减少 10 体力。", 
    effect: (u) => ({ san: Math.min(u.maxSan, u.san + 25), energy: Math.max(0, u.energy - 10) }) },
  { id: 'san_high', name: "旧日护符", type: 'consumable', rarity: 'epic', price: 1000, count: 0, maxStock: 1, desc: "抚慰灵魂的奇异石头。恢复 100 SAN。", 
    effect: (u) => ({ san: u.maxSan }) },
  { id: 'cleaner', name: "纳米净化剂", type: 'consumable', rarity: 'rare', price: 500, count: 0, maxStock: 3, desc: "清除体内辐射与毒素。恢复 50 体力与 20 SAN。", 
    effect: (u) => ({ energy: Math.min(u.maxEnergy, u.energy + 50), san: Math.min(u.maxSan, u.san + 20) }) },
];

// ==================== LOOT TABLE ====================
export const LOOT_TABLE: InventoryItem[] = [
  // --- JUNK (Trash) ---
  { id: 'j1', name: "锈蚀的螺丝", type: 'loot', rarity: 'junk', price: 2, desc: "毫无用处的工业废料。", count: 1 },
  { id: 'j2', name: "破碎的玻璃", type: 'loot', rarity: 'junk', price: 1, desc: "小心划手。", count: 1 },
  { id: 'j3', name: "湿漉漉的报纸", type: 'loot', rarity: 'junk', price: 1, desc: "记载着毁灭前的新闻。", count: 1 },
  { id: 'j4', name: "断裂的数据线", type: 'loot', rarity: 'junk', price: 5, desc: "接口已经氧化了。", count: 1 },
  { id: 'j5', name: "空的罐头盒", type: 'loot', rarity: 'junk', price: 3, desc: "里面残留着霉菌。", count: 1 },
  { id: 'j6', name: "塑料假花", type: 'loot', rarity: 'junk', price: 5, desc: "永不凋零的廉价装饰。", count: 1 },
  { id: 'j7', name: "烧焦的木头", type: 'loot', rarity: 'junk', price: 2, desc: "还带着余温。", count: 1 },
  { id: 'j8', name: "浑浊的水瓶", type: 'loot', rarity: 'junk', price: 4, desc: "也许过滤一下还能喝？", count: 1 },

  // --- COMMON (Scrap & Basics) ---
  { id: 'c1', name: "报废的通讯器", type: 'loot', rarity: 'common', price: 25, desc: "屏幕碎了，但在黑市能拆出零件。", count: 1 },
  { id: 'c2', name: "铜线圈", type: 'loot', rarity: 'common', price: 30, desc: "工业硬通货。", count: 1 },
  { id: 'c3', name: "低级芯片残片", type: 'loot', rarity: 'common', price: 40, desc: "边缘发黑的硅片。", count: 1 },
  { id: 'c4', name: "合成布料", type: 'loot', rarity: 'common', price: 20, desc: "防水耐磨。", count: 1 },
  { id: 'c5', name: "锂电池组(耗尽)", type: 'loot', rarity: 'common', price: 35, desc: "也许充充电还能用。", count: 1 },
  { id: 'c6', name: "身份识别卡(失效)", type: 'loot', rarity: 'common', price: 15, desc: "属于某个死去的人。", count: 1 },
  { id: 'c7', name: "抗生素空瓶", type: 'loot', rarity: 'common', price: 10, desc: "玻璃是好的。", count: 1 },
  
  // --- UNCOMMON (Weapons & Tech) ---
  { id: 'u1', name: "动能手枪(卡壳)", type: 'loot', rarity: 'uncommon', price: 150, desc: "枪管有点歪，修好前只是废铁。", count: 1 },
  { id: 'u2', name: "单兵口粮包", type: 'loot', rarity: 'uncommon', price: 80, desc: "味道像嚼蜡，但能救命。", count: 1 },
  { id: 'u3', name: "无人机旋翼", type: 'loot', rarity: 'uncommon', price: 120, desc: "碳纤维材质。", count: 1 },
  { id: 'u4', name: "生物滤罐", type: 'loot', rarity: 'uncommon', price: 100, desc: "防毒面具的核心部件。", count: 1 },
  { id: 'u5', name: "钛合金骨架", type: 'loot', rarity: 'uncommon', price: 200, desc: "从尸体上拆下来的义体部件。", count: 1 },
  { id: 'u6', name: "急救喷雾", type: 'loot', rarity: 'uncommon', price: 130, desc: "剩余容量30%。", count: 1 },
  { id: 'u7', name: "锈蚀的砍刀", type: 'loot', rarity: 'uncommon', price: 90, desc: "沾满了干涸的血迹。", count: 1 },

  // --- RARE (Occult & Forbidden) ---
  { id: 'r1', name: "禁书残页", type: 'loot', rarity: 'rare', price: 400, desc: "盯着看久了会听到低语。", count: 1 },
  { id: 'r2', name: "完好的光学义眼", type: 'loot', rarity: 'rare', price: 600, desc: "还能自动对焦。", count: 1 },
  { id: 'r3', name: "军用无人机核心", type: 'loot', rarity: 'rare', price: 800, desc: "还在闪烁红光。", count: 1 },
  { id: 'r4', name: "黄金齿", type: 'loot', rarity: 'rare', price: 500, desc: "旧时代的财富象征。", count: 1 },
  { id: 'r5', name: "加密的数据盘", type: 'loot', rarity: 'rare', price: 700, desc: "里面可能存着核弹密码，或者色情片。", count: 1 },
  { id: 'r6', name: "沾血的羽毛", type: 'loot', rarity: 'rare', price: 350, desc: "不属于任何已知鸟类。", count: 1 },
  { id: 'r7', name: "尸体: 观察者", type: 'loot', rarity: 'rare', price: 300, desc: "虽然有些不道德，但能卖个好价钱。", count: 1 },

  // --- EPIC (Valuables) ---
  { id: 'e1', name: "铂金神经链接插槽", type: 'loot', rarity: 'epic', price: 2000, desc: "顶级的传导材料。", count: 1 },
  { id: 'e2', name: "《旧日食谱》", type: 'loot', rarity: 'epic', price: 2500, desc: "记载着如何烹饪...不可名状之物。", count: 1 },
  { id: 'e3', name: "便携式聚变电池", type: 'loot', rarity: 'epic', price: 3000, desc: "这东西能供电整个街区。", count: 1 },
  { id: 'e4', name: "无名指骨", type: 'loot', rarity: 'epic', price: 1800, desc: "散发着令人安详的气息。", count: 1 },

  // --- LEGENDARY / CURSED (Unique) ---
  { id: 'l1', name: "黑盒子: 潘多拉", type: 'loot', rarity: 'legendary', price: 10000, desc: "系统无法解析其结构。", count: 1 },
  { id: 'l2', name: "呢喃的石块", type: 'loot', rarity: 'cursed', price: 6666, desc: "放在背包里会持续掉SAN值。", count: 1 },
  { id: 'l3', name: "活着的血肉样本", type: 'loot', rarity: 'cursed', price: 5000, desc: "它在瓶子里蠕动，试图逃跑。", count: 1 },
];
