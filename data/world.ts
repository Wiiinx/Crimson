
import { ForumPost } from '../types';

// ==================== CITY INFO ====================
export const CITY_INFO: Record<string, string> = {
  '黑海市': '联邦最重要的港口城市之一，经济发达，地位相当于某灯塔国的纽约市。也是众多帮派势力盘踞的巢穴。',
  '白鲸市': '第二世界接近寒带的一个城市，临近极地冰海，地理位置大概相当于第一世界俄国的西伯利亚边境线。在第二世界中接近极地，处于北极圈，现在正是夏季，白天很漫长，夜晚很短暂。',
  '联邦行政中心': '联邦行政中心是一座拥有两千多万人口的超级城市。夏娃/亚当的机库所在地。',
  '浮岗市': '靠近联邦行政中心市，拥有许多的工厂。这里的交通分为地上和地下两个部分，有悬浮电轨也有地轨。',
  '临荫市': '一座热闹喧嚣的商业城市，三面环山，虽然位于北方，但气候比较温暖。临荫市距离白鲸市的直线距离有一百多公里。',
  '鸣山市': '浮岗市周边的小城市，名叫鸣山市，这座小城市没有浮岗市繁华，城市的生活节奏似乎比较慢，穷人和平民也更多。',
  '多玛市': '另一个大陆的中部, 在一片荒芜区，多玛市的暗界对应拉美地区，那么第三处暗界对应的可能是非洲的某个区域。',
  '蓝柯市': '暂无详细情报。',
  '赤余市': '暂无详细情报。'
};

// ==================== RARITY LABELS ====================
export const RARITY_LABELS: Record<string, string> = {
  'junk': '废品',
  'common': '普通',
  'uncommon': '罕见',
  'rare': '稀有',
  'epic': '史诗',
  'legendary': '传说',
  'cursed': '诅咒'
};

// ==================== FORUM CATEGORIES ====================
export const FORUM_CATEGORIES = ['综合', '情报', '交易', '求助'];


// ==================== INITIAL POSTS (基于小说剧情还原) ====================
export const INITIAL_POSTS: ForumPost[] = [
  // --- 官方置顶帖 ---
  { 
    id: 'off1', authorId: 99999, category: '公告', title: '[官方] 阵亡玩家名单公布', 
    content: '...代行者1号，于7月27日死亡。\n代行者16号，于7月27日死亡。\n代行者536号，于7月28日死亡。\n\n[特别记录]\n代行者1368号，于7月29日被剥夺者233号杀死。\n...', 
    timestamp: Date.now() - 10000000, likes: 10245, comments: [], isSticky: true 
  },
  { 
    id: 'off2', authorId: 99999, category: '公告', title: '[官方] 玩家职业说明', 
    content: '本游戏共有两大职业：\n\n1. 【剥夺者】：依靠猎杀特殊能力者剥夺超凡能力。无法自行觉醒，只能通过猎杀升级。\n2. 【代行者】：以人类之躯行走世间，可自行觉醒或服用药剂。之路平坦但看天赋。\n\n代行者是“升级流”，剥夺者是“掠夺流”。', 
    timestamp: Date.now() - 9000000, likes: 8890, comments: [], isSticky: true 
  },
  { 
    id: 'off3', authorId: 99999, category: '公告', title: '[官方] 基本规则介绍', 
    content: '1. 玩家拥有穿梭两界的能力，但生命仅有一次。\n2. 循环周期为七天，以华国时区零点为准。\n3. 第一世界死亡实时更新，第二世界死亡回归时播报。', 
    timestamp: Date.now() - 8000000, likes: 7500, comments: [], isSticky: true 
  },

  // --- 玩家热议帖：关于233号 ---
  { 
    id: 'p1', authorId: 1001, category: '挂人', title: '玩家公敌——剥夺者233号，我这么说应该没人有意见吧？！！！！', 
    content: '尼玛，我在第二世界那几天辛辛苦苦搬砖挣钱当社畜，战战兢兢不敢有丝毫逾越，剥夺者233号牛逼大发了，一上来就敢杀人，杀的还是自己的老乡！这不是游戏，那个世界里全是活人！', 
    timestamp: Date.now() - 500000, likes: 3421, 
    comments: [
      { id: 'c1-1', authorId: 2002, content: '剥夺者233号是个疯子吗？先天反社会人格？', timestamp: Date.now() - 480000 },
      { id: 'c1-2', authorId: 2003, content: '如果不奋起反击，我们迟早会沦为剥夺者的猎物！第一世界也是猎场！', timestamp: Date.now() - 450000 }
    ], 
    isSticky: false 
  },

  // --- 玩家热议帖：快递与诡异 ---
  { 
    id: 'p2', authorId: 3302, category: '综合', title: '游戏厂商完全没提怎么邮寄游戏装备，有玩家收到安装包了吗？', 
    content: '虽然大数据时代没有隐私，但官方直接把卡送到我手里是不是太过分了？要是没合理解释我不介意走法律途径。', 
    timestamp: Date.now() - 2000000, likes: 1560, 
    comments: [
      { id: 'c2-1', authorId: 4404, content: '我觉得这事儿不对劲，跟闹鬼似的。我家猫出门遛弯莫名其妙叼个盒子回来，里面竟然是写着我名字的游戏卡！', timestamp: Date.now() - 1900000 },
      { id: 'c2-2', authorId: 5505, content: '我也是住乡下，卡牌是我去鸡棚子掏蛋时看见的，给我吓一跳……', timestamp: Date.now() - 1850000 },
      { id: 'c2-3', authorId: 6606, content: '我网购了家电，箱子里多了个盒子，以为是赠品结果是游戏卡。', timestamp: Date.now() - 1800000 }
    ], 
    isSticky: false 
  },

  // --- 玩家热议帖：平行世界理论 ---
  { 
    id: 'p3', authorId: 7707, category: '情报', title: '我认为我们是穿越到了一个平行世界，论点如下', 
    content: '我在第二世界的姓名、长相（七八分像）、性格甚至爱好都和现实一样。这不可能是巧合，这是平行世界的自己！', 
    timestamp: Date.now() - 1500000, likes: 998, 
    comments: [
      { id: 'c3-1', authorId: 8808, content: '你说得对！我在那边父母还活着，长得和现实里去世的父母一模一样，我看见第一眼就哭了。这是上天的恩赐。', timestamp: Date.now() - 1400000 },
      { id: 'c3-2', authorId: 9909, content: '大家小心，长得太像容易暴露身份。', timestamp: Date.now() - 1300000 }
    ], 
    isSticky: false 
  },

  // --- 玩家热议帖：搞笑灌水 ---
  { 
    id: 'p4', authorId: 1010, category: '灌水', title: '回归第一世界的时候我人在马桶上拉屎，现在问题来了...', 
    content: '我穿越回第二世界的话可以继续拉吗？在线等，挺急的。', 
    timestamp: Date.now() - 30000, likes: 233, 
    comments: [
      { id: 'c4-1', authorId: 1212, content: '零点穿越零点回归，时间没有任何变化，放心吧，你回去后肯定能好好把这坨屎拉完。', timestamp: Date.now() - 20000 }
    ], 
    isSticky: false 
  }
];
