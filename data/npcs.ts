
import { NPC, Contact } from '../types';


// ==================== MOCK CONTACTS ====================
export const MOCK_CONTACTS: Contact[] = [
  { id: '233', name: '隗辛', type: 'player', status: 'online', avatarColor: '#3f3f46' },
  { id: '777', name: '奥格斯', type: 'player', status: 'busy', avatarColor: '#db2777' },
  { id: '5116', name: '柳叶刀', type: 'player', status: 'offline', avatarColor: '#059669' },
];


// ==================== NPC DATABASE ====================
export const NPC_DB: NPC[] = [
  // 1. 剧情关键人物 (保留)
  { 
    id: 'viper', 
    name: '黑蝮蛇', 
    title: '联邦缉查部·第四支队队长', 
    desc: '你的暴躁上司，拥有空间斩断能力，极其护短但讨厌蠢货。', 
    avatarColor: '#7f1d1d' // 深红
  },
  { 
    id: 'dealer', 
    name: '老瞎子', 
    title: '黑市情报商', 
    desc: '在第四区贫民窟摆摊算命的老头，只要钱到位，他什么都知道。', 
    avatarColor: '#18181b' // 黑色
  },

  // 2. 新增：日常/功能性 NPC
  { 
    id: 'doc', 
    name: '老鬼', 
    title: '黑市义体医生', 
    desc: '没有行医执照，手术台全是血污。但他嘴巴严，且能搞到违禁药。', 
    avatarColor: '#3f6212' // 肮脏的墨绿
  },
  { 
    id: 'landlady', 
    name: '花姨', 
    title: '筒子楼房东', 
    desc: '叼着电子烟的中年女人，每天都在催房租，但其实很照顾住户。', 
    avatarColor: '#c026d3' // 俗气的紫红
  },
  { 
    id: 'rookie', 
    name: '阿K', 
    title: '缉查部实习生', 
    desc: '刚进部门的新人，有点笨手笨脚，把你当做偶像前辈，经常帮你打杂。', 
    avatarColor: '#2563eb' // 稚嫩的蓝
  },
  { 
    id: 'scavenger', 
    name: '松鼠', 
    title: '街头拾荒者', 
    desc: '在垃圾山长大的小孩，如果你给他几瓶干净的水，他会告诉你哪条小路最安全。', 
    avatarColor: '#d97706' // 尘土黄
  }
];

// ==================== CHAT RESPONSES SYSTEM ====================

// 通用回复库 (用于普通NPC)
export const COMMON_CHAT_RESPONSES = [
  "收到了。下次见面再细说。",
  "有趣的情报。我会留意的。",
  "哼，知道了。",
  "正在忙，稍后回复。",
  "这东西不错，你从哪搞到的？",
  "注意安全，最近外面不太平。",
  "...",
  "钱带够了吗？没钱免谈。",
  "嘘——这种事别在通讯频道里说，会被监听的。"
];

// 黑市医生专属回复库 (请在代码逻辑中判断：如果 npc.id === 'doc' 则使用此列表)
export const DOCTOR_CHAT_RESPONSES = [
  "哪里不舒服？是义体排异还是受了枪伤？",
  "这次想要植入什么？先说好，我这里不赊账。",
  "...",
  "OK，过来吧，后门给你留着。",
  "【自动回复】手术中...有事留言，急事打钱。",
  "啧，你这伤口处理得太烂了，不想截肢就赶紧滚过来。",
  "止痛药涨价了，爱买不买。",
  "这型号的义眼早停产了，只有我有货，一口价8000。",
  "别死我店门口，晦气。"
];

// 房东花姨专属回复库 (可选扩展)
export const LANDLADY_CHAT_RESPONSES = [
  "房租什么时候交？？？",
  "楼下那个卖粉的被抓了，你回来时候注意点。",
  "水管修好了，别再往里面塞奇怪的东西！",
  "今晚门禁提前，不想睡大街就早点回。",
  "有个怪人在楼下转悠，是不是找你的？",
  "知道了，包裹给你放门口了。"
];