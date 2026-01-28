
import { Mission } from '../types';

// ==================== MISSION DATABASE ====================
export const MISSION_DB: Mission[] = [
  // --- 剥夺者路线 (Bereaver) ---
  // Chain 1: 联邦
  {
    id: 'b_c1_s1', title: '伪装者: 入职审查', desc: '作为实习探员，在不暴露身份的前提下，完成队长“黑蝮蛇”指派的脏活。',
    jobRequirement: '剥夺者', npcId: 'viper', type: 'combat', category: 'main',
    cost: { energy: 20, san: 0 }, duration: 15,
    rewards: { credits: 500, trust: { npcId: 'viper', amount: 10 }, text: "黑蝮蛇虽然嘴上不饶人，但对你的效率表示满意。" }
  },
  {
    id: 'b_c1_s2', title: '借刀杀人', desc: '黑蝮蛇正在调查走私团伙，布置干扰器并引诱异种入场，制造一场“意外”。',
    jobRequirement: '剥夺者', prerequisiteMissionId: 'b_c1_s1', prerequisiteTrust: { npcId: 'viper', level: 10 },
    npcId: 'viper', type: 'stealth', category: 'main',
    cost: { energy: 40, san: 15 }, duration: 45,
    rewards: { text: "异种撕碎了防线，黑蝮蛇重伤请求支援，绝佳的猎杀时刻。" }
  },
  {
    id: 'b_c1_s3', title: '剥夺时刻：阴影转移', desc: '趁黑蝮蛇请求急救时，使用折叠匕首送他上路。',
    jobRequirement: '剥夺者', prerequisiteMissionId: 'b_c1_s2',
    npcId: 'viper', type: 'combat', category: 'main',
    cost: { energy: 50, san: 30 }, duration: 60,
    rewards: { ability: { name: "阴影穿梭", level: "B", type: "空间/隐匿", desc: "利用阴影进行小范围空间穿梭。", character: "玩家" }, text: "你冷冷地拔出匕首，看着队长的尸体。你获得了新的能力。" }
  },
  // Chain 2: 机械黎明
  {
    id: 'b_c2_s1', title: '狂信徒的伪装', desc: '参加午夜弥撒，通过主教的“精神洗礼”。',
    jobRequirement: '剥夺者', npcId: 'bishop', type: 'social', category: 'main',
    cost: { energy: 0, san: 40 }, duration: 30,
    rewards: { item: { id: 'cult_robe', name: "教团黑袍", type: 'gear', rarity: 'uncommon', price: 0, count: 1, desc: "机械黎明内环成员标志。" }, trust: { npcId: 'bishop', amount: 20 }, text: "你忍受住了疯狂的呓语，主教接纳了你。" }
  },
  // Chain 2: 机械黎明 (Continued)
  {
    id: 'b_c2_s2', title: '暗巷交易', desc: '主教要求你在黑海市建立据点。前往下城区的“老鼠巷”黑市，找到走私商“老约翰”，取回代号为“曙光”的加密芯片。',
    jobRequirement: '剥夺者', prerequisiteMissionId: 'b_c2_s1',
    npcId: 'old_john', type: 'investigation', category: 'main',
    cost: { energy: 15, san: 5 }, duration: 30,
    rewards: { credits: 800, item: { id: 'chip_dawn', name: "加密芯片-曙光", type: 'quest', rarity: 'rare', price: 0, count: 1, desc: "存有机械黎明重要名单的芯片。" }, text: "老约翰看到教团的信物后，颤颤巍巍地交出了芯片。" }
  },
  {
    id: 'b_c2_s3', title: '血肉苦弱', desc: '为了适应更高强度的任务，你需要进行义体改造。在黑市的非法诊所内，将手臂替换为大功率机械臂。',
    jobRequirement: '剥夺者', prerequisiteMissionId: 'b_c2_s2',
    npcId: 'ripper_doc', type: 'social', category: 'main',
    cost: { energy: 80, san: 20 }, duration: 120,
    rewards: { attribute: { name: "strength", value: 5 }, text: "电锯切开骨骼的震动让你清醒，你现在更像一台杀戮机器了。" }
  },
  {
    id: 'b_c2_s4', title: '红色连线', desc: '你的改造引起了黑客“Red”的注意。她需要一个身手敏捷的线人。在网络空间协助她定位一个追踪者，并由你在现实中解决掉他。',
    jobRequirement: '剥夺者', prerequisiteMissionId: 'b_c2_s3',
    npcId: 'Red', type: 'stealth', category: 'main',
    cost: { energy: 40, san: 10 }, duration: 50,
    rewards: { trust: { npcId: 'Red', amount: 20 }, ability: { name: "数据视界(残缺)", level: "D", type: "辅助", desc: "能看到电子设备的简单逻辑线。", character: "玩家" }, text: "Red经过变声处理的声音传来：‘合作愉快，菜鸟。’" }
  },

  // --- 剥夺者路线 3: 白鲸市·极寒领主 (Bereaver - Warlord Path) ---
  {
    id: 'b_c3_s1', title: '极夜求生', desc: '流落到极北的白鲸市，室外温度低至零下40度。猎杀一头变异的“雪原恐狼”，利用它的皮毛御寒并食用其血肉。',
    jobRequirement: '剥夺者', 
    npcId: 'system', type: 'survival', category: 'main',
    cost: { energy: 60, san: 10 }, duration: 40,
    rewards: { item: { id: 'wolf_fur', name: "染血的狼皮袄", type: 'gear', rarity: 'common', price: 100, count: 1, desc: "带有体温的狼皮，抵御极寒。" }, text: "温热的狼血让你暂时忘记了寒冷，这是极地生存的第一课。" }
  },
  {
    id: 'b_c3_s2', title: '绝境剥夺', desc: '“碎冰者”帮派首领垄断了供暖管道。潜入据点，击杀首领并剥夺其“肉体硬化”异能，取而代之。',
    jobRequirement: '剥夺者', prerequisiteMissionId: 'b_c3_s1',
    npcId: 'ice_boss', type: 'combat', category: 'main',
    cost: { energy: 90, san: 25 }, duration: 90,
    rewards: { ability: { name: "岩石皮肤", level: "C", type: "强化", desc: "皮肤瞬间硬化，可抵御小口径子弹。", character: "玩家" }, text: "首领倒在暖炉旁，你看着自己硬化的双手，意识到在这里力量就是权柄。" }
  },
  {
    id: 'b_c3_s3', title: '建立秩序', desc: '利用刚获得的异能和物资，威慑并收编周围的流浪者，将组织规模扩大到至少50人。',
    jobRequirement: '剥夺者', prerequisiteMissionId: 'b_c3_s2',
    npcId: 'self', type: 'management', category: 'main',
    cost: { energy: 50, san: 5 }, duration: 1440,
    rewards: { faction: { name: "极夜兄弟会", members: 52 }, text: "饥饿的人们向你跪拜，他们不在乎谁是首领，只在乎谁能给他们温暖。" }
  },
  {
    id: 'b_c3_s4', title: '白鲸市决斗', desc: '你的崛起引起了最大帮派“深寒重工”的注意。在冰封港口与他们决一死战，确立霸主地位。',
    jobRequirement: '剥夺者', prerequisiteMissionId: 'b_c3_s3',
    npcId: 'deep_cold_boss', type: 'war', category: 'main',
    cost: { energy: 100, san: 40 }, duration: 180,
    rewards: { title: "白鲸市地下霸主", credits: 50000, text: "冰面上洒满了鲜血，深寒重工的旗帜被你踩在脚下。" }
  },

  // --- 剥夺者路线 4: 联邦行政中心·灯下黑 (Bereaver - Political Path) ---
  {
    id: 'b_c4_s1', title: '灯下黑：伪造身份', desc: '前往联邦行政中心。你需要搞到一个合法的“一级公民”身份ID，通过生物扫描混入中心区。',
    jobRequirement: '剥夺者',
    npcId: 'forger', type: 'stealth', category: 'main',
    cost: { energy: 30, san: 5 }, duration: 60,
    rewards: { item: { id: 'fake_id', name: "伪造的一级公民ID", type: 'key_item', rarity: 'epic', price: 0, count: 1, desc: "足以乱真的身份证明。" }, text: "‘欢迎回家，公民。’电子音响起，你成功混入了这个庞然大物的腹地。" }
  },
  {
    id: 'b_c4_s2', title: '晚宴猎手', desc: '在金百合宴会厅的慈善晚宴上，接近拥有一项稀有精神系能力的腐败议员，在握手瞬间剥夺其能力。',
    jobRequirement: '剥夺者', prerequisiteMissionId: 'b_c4_s1',
    npcId: 'senator', type: 'social', category: 'main',
    cost: { energy: 40, san: 10 }, duration: 120,
    rewards: { ability: { name: "思维暗示", level: "C", type: "精神系", desc: "对意志薄弱者植入简单念头。", character: "玩家" }, text: "议员只是恍惚了一下，而你微笑着端着香槟离开，脑海中多了一种操控他人的力量。" }
  },
  {
    id: 'b_c4_s3', title: '机库阴影', desc: '利用“思维暗示”诱骗技师打开通道，潜入亚当机库外围，刺杀S级强化守卫，为入侵主脑做准备。',
    jobRequirement: '剥夺者', prerequisiteMissionId: 'b_c4_s2',
    npcId: 'elite_guard', type: 'combat', category: 'main',
    cost: { energy: 80, san: 50 }, duration: 100,
    rewards: { item: { id: 'server_key', name: "服务器室门禁卡", type: 'key_item', rarity: 'legendary', price: 0, count: 1, desc: "通往神之领域的钥匙。" }, text: "这是离‘神’最近的地方。你抬头看着上方闪烁的数据洪流，亚当似乎正注视着你。" }
  },
  
  // --- 代行者路线 (Agent) ---
  // Chain 1: 联邦之盾
  {
    id: 'a_c1_s1', title: '高压训练', desc: '在重力室进行抗压训练，提升身体素质。',
    jobRequirement: '代行者', npcId: 'instructor', type: 'training', category: 'main',
    cost: { energy: 80, san: 0 }, duration: 60,
    rewards: { trust: { npcId: 'instructor', amount: 15 }, text: "你感觉肌肉在燃烧，体质得到了极大的强化。" }
  },
  {
    id: 'a_c1_s2', title: '紧急出勤：暴乱镇压', desc: '第五区发生赛博精神病暴动，前往前线充当肉盾。',
    jobRequirement: '代行者', prerequisiteMissionId: 'a_c1_s1',
    npcId: 'instructor', type: 'combat', category: 'main',
    cost: { energy: 40, san: 20 }, duration: 60,
    rewards: { credits: 1000, item: { id: 'gene_b', name: "B级基因强化剂", type: 'consumable', rarity: 'rare', price: 0, count: 1, desc: "大幅增强肉体强度的军用药剂。", effect: (u) => ({ energy: u.maxEnergy }) }, text: "你活了下来，虽然伤痕累累，但获得了丰厚的功勋。" }
  },
  {
    id: 'a_c1_s3', title: '调查员的觉醒', desc: '在充满精神污染的密室中寻找出路。绝境中可能觉醒新能力。',
    jobRequirement: '代行者', prerequisiteMissionId: 'a_c1_s2',
    npcId: 'instructor', type: 'social', category: 'main',
    cost: { energy: 10, san: 50 }, duration: 90,
    rewards: { ability: { name: "精神屏障", level: "E", type: "防御", desc: "在精神世界构建一道屏障，抵御污染。", character: "玩家" }, text: "在理智即将崩断的瞬间，你觉醒了。" }
  },
  
  // --- 通用/休息 (Rest) ---
  {
    id: 'gen_sleep', title: '深度睡眠', desc: '在胶囊旅馆睡一觉。恢复体力与SAN值。',
    cost: { energy: 0, san: 0 }, duration: 10, category: 'daily',
    rewards: { text: "睡眠质量一般，但你感觉好多了。", trust: { npcId: '', amount: 0 } }, // Effect handled in code
    type: 'social'
  },
  {
    id: 'gen_clinic', title: '义体维护', desc: '找黑市密医修理身体。',
    npcId: 'dealer',
    cost: { energy: 0, san: 0 }, duration: 20, category: 'daily',
    rewards: { text: "身体机能已恢复。", trust: { npcId: 'dealer', amount: 5 } },
    type: 'social'
  }
];
