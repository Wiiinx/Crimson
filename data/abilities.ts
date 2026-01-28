
import { Ability } from '../types';

// ==================== ABILITIES POOL ====================
export const ABILITY_POOL: Ability[] = [
  // ==================== S级原著 (近似神迹/灾难级) ====================
  { name: "空间漩涡", level: "S", type: "空间", desc: "制造空间漩涡进行超长距离跳转。300km以上接近S级。", character: "夜蝉" },
  { name: "黑焰", level: "S", type: "元素/毁灭", desc: "高阶火焰能力或觉醒者代称。", character: "汪飞驰" },
  { name: "物质重组", level: "S", type: "战斗", desc: "解构并重组物质分子结构，可改变物理特性。", character: "777号剥夺者" },
  { name: "梦境侵袭", level: "S", type: "精神控制", desc: "使人坠入释放者控制的梦境，情绪极端时易坠入噩梦。", character: "未知" },
  { name: "攫取之触", level: "S", type: "战斗", desc: "可以夺走别人能力。", character: "未知" },
  // ==================== S级添加 (近似神迹/灾难级) ====================
  { name: "维度降临", level: "S", type: "空间/召唤", desc: "强行撕裂现实帷幕，让高维度的不可名状生物投影降临现世。", character: "未知" },
  { name: "因果篡改", level: "S", type: "规则", desc: "在极短时间内逆转因果，先有‘果’（死亡），再有‘因’（攻击）。", character: "未知" },
  { name: "机械飞升", level: "S", type: "科技/同化", desc: "瞬间侵蚀并控制范围内所有的电子设备与机械义体，将其化为己用。", character: "未知" },
  { name: "绝对零度", level: "S", type: "元素/毁灭", desc: "冻结分子运动，甚至能短暂冻结‘时间’流逝。", character: "未知" },
  { name: "心灵瘟疫", level: "S", type: "精神/传播", desc: "通过潜意识网络像病毒一样传播疯狂，瞬间引爆全城人的SAN值归零。", character: "未知" },
  { name: "万物崩解", level: "S", type: "毁灭", desc: "从原子层面解除物质的结合力，触碰之物皆化为尘埃。", character: "未知" },
  { name: "命运丝线", level: "S", type: "预言/控制", desc: "看见并拨动生物的命运线，制造‘注定的巧合’致人死亡。", character: "未知" },
  { name: "血海降生", level: "S", type: "恢复/领域", desc: "展开领域，只要有一滴血尚存，便能无限次从血海中完美重生。", character: "未知" },
  { name: "概念抹除", level: "S", type: "规则", desc: "抹除某一概念的存在（如抹除‘阻力’、抹除‘距离’），代价极大。", character: "未知" },
  { name: "深渊凝视", level: "S", type: "精神控制", desc: "与深渊直连，凡是直视你双眼的存在，灵魂将被永久放逐至异空间。", character: "未知" },


  // ==================== A级原著 (城市霸主/顶尖战力) ====================
  { name: "控水", level: "A", type: "元素控制", desc: "操控水体。", character: "未知" },
  { name: "空气弹反", level: "A", type: "战斗/防御", desc: "弹开或反制高速攻击。", character: "未知" },
  { name: "死亡轮回", level: "A", type: "防御", desc: "死亡后返回过去重新开始。复活次数每七日重置一次。", character: "魁辛" },
  { name: "迷魂之音", level: "A", type: "精神控制", desc: "以声音为媒介，对目标进行精神控制。", character: "安妮·沙利特" },
  { name: "血肉再生", level: "A", type: "恢复", desc: "高速修复肉体损伤。", character: "未知" },
  { name: "归零", level: "A", type: "规则/压制", desc: "使范围内能力失效，受等级限制。", character: "未知" },
  { name: "重力操控", level: "A", type: "物理控制", desc: "操控重力方向与强度。", character: "孟菁" },
  { name: "数据操控", level: "A", type: "信息/黑客", desc: "操纵、读取、干扰数据世界。", character: "贺高谊" },
  { name: "精神免疫", level: "A", type: "精神控制", desc: "对各种类型的精神类能力有着极强的抗性。", character: "魁辛" },
  { name: "血之灵", level: "A", type: "战斗", desc: "从纯净的血液中读取到血液主人的记忆。", character: "Red" },
  { name: "空间跳转", level: "A", type: "空间", desc: "远距离瞬移，10km≈A级。", character: "未知" },
  // ==================== A级添加 (城市霸主/顶尖战力) ====================
  { name: "雷霆力场", level: "A", type: "元素/战斗", desc: "操控高压雷电形成攻防一体的力场，能瞬间汽化金属。", character: "未知" },
  { name: "记忆宫殿", level: "A", type: "精神", desc: "构建绝对的精神防御工事，不仅免疫控制，还能强行拉人进入意识迷宫。", character: "未知" },
  { name: "重力奇点", level: "A", type: "物理控制", desc: "制造一个微型黑洞般的奇点，无差别吸附并挤压周围物体。", character: "未知" },
  { name: "血肉傀儡", level: "A", type: "控制/变异", desc: "操控他人的血肉，将其强行扭曲成听命于你的怪物。", character: "未知" },
  { name: "量子幽灵", level: "A", type: "科技/空间", desc: "身体处于量子叠加态，免疫物理伤害，可穿透任何实体墙壁。", character: "未知" },
  { name: "声波毁灭", level: "A", type: "战斗", desc: "发出特定频率的次声波，直接震碎建筑物结构或人体内脏。", character: "未知" },
  { name: "光线折射", level: "A", type: "光学/隐匿", desc: "完美操控光线，实现真正的隐形，或制造超逼真的海市蜃楼。", character: "未知" },
  { name: "数据具象", level: "A", type: "科技/创造", desc: "将虚拟网络中的数据（如防火墙、病毒代码）具象化为现实中的武器。", character: "未知" },
  { name: "能量吸收", level: "A", type: "防御", desc: "吸收各种形式的能量攻击（热能、动能、电能）并转化为自身体力。", character: "未知" },
  { name: "空间置换", level: "A", type: "空间", desc: "瞬间将自己与视野内的任意物体或生物互换位置。", character: "未知" },

  // ==================== B级原著 (中坚力量/队长级) ====================
  { name: "空间禁锢", level: "B", type: "空间控制", desc: "短暂地令空间凝固，禁锢10米范围内的物体。", character: "未知" },
  { name: "强敌标示", level: "B", type: "感知", desc: "标示高威胁敌人。", character: "未知" },
  { name: "血刺棘", level: "B", type: "追踪/攻击", desc: "伤口标记并追踪目标。", character: "未知" },
  { name: "影之界", level: "B", type: "空间/隐匿", desc: "将身体藏入阴影空间，需影子作为媒介。", character: "未知" },
  { name: "探查之眼", level: "B", type: "感知", desc: "通过双眼看清对方超凡能力的具体效果。", character: "林新霁" },
  { name: "电磁探测", level: "B", type: "控制", desc: "在一定范围内感知到四周的电信号和电磁波。", character: "调酒师" },
  { name: "铁骨", level: "B", type: "战斗", desc: "力量和防御将大幅度提升。", character: "未知" },
  { name: "伤害同步", level: "B", type: "战斗", desc: "将自身受到的伤害同步给对手。", character: "剥夺者4号" },
  { name: "炽刃", level: "B", type: "战斗", desc: "双手触碰的金属物件附着高压高温。", character: "刺蔷薇" },
  // ==================== B级添加 (中坚力量/队长级) ====================
  { name: "影分身", level: "B", type: "暗影", desc: "利用影子制造出具有本体50%实力的实体分身。", character: "未知" },
  { name: "爆破手", level: "B", type: "战斗", desc: "将触碰到的任何非生命物体变成延时炸弹。", character: "未知" },
  { name: "晶体化", level: "B", type: "防御", desc: "身体表面覆盖高硬度晶体，可折射激光武器。", character: "未知" },
  { name: "痛觉屏蔽", level: "B", type: "辅助", desc: "完全屏蔽痛觉，并在濒死状态下爆发200%的身体机能。", character: "未知" },
  { name: "神经加速", level: "B", type: "战斗", desc: "让自身神经反应速度提升5倍，看世界如同慢动作。", character: "未知" },
  { name: "拟态伪装", level: "B", type: "隐匿", desc: "不仅能改变外貌，还能模拟目标的声音、虹膜甚至DNA片段。", character: "未知" },
  { name: "电磁脉冲", level: "B", type: "科技", desc: "以自身为中心释放EMP，瘫痪周围义体和电子设备。", character: "未知" },
  { name: "恐惧光环", level: "B", type: "精神", desc: "散发让生物本能感到恐惧的气场，削弱敌方战意。", character: "未知" },
  { name: "吸血之刃", level: "B", type: "战斗/恢复", desc: "造成的近战伤害会按比例转化为自身的生命力。", character: "未知" },
  { name: "超频过载", level: "B", type: "科技/强化", desc: "强制让机械义体超频运转，短时间内性能翻倍，但损耗耐久。", character: "未知" },


  // ==================== C级原著 (街头精英/雇佣兵) ====================
  { name: "弹道锁定", level: "C", type: "战斗", desc: "子弹自动追踪目标。", character: "未知" },
  { name: "燃血", level: "C", type: "战斗", desc: "自身血液为燃料，换取强大的力量。", character: "球蟒" },
  { name: "蛇身", level: "C", type: "战斗", desc: "任意改变身体形态，像蛇一样柔韧。", character: "未知" },
  { name: "磁剑", level: "C", type: "战斗", desc: "利用磁场操控重量较轻的金属物件。", character: "未知" },
  { name: "虚空之手", level: "C", type: "战斗", desc: "召唤虚空手掌进行中距离攻击。", character: "未知" },
  // ==================== C级添加 (街头精英/雇佣兵) ====================
  { name: "骨刺伸缩", level: "C", type: "变异/战斗", desc: "全身骨骼可突破皮肤刺出，形成外骨骼装甲或骨刃。", character: "未知" },
  { name: "腐蚀酸液", level: "C", type: "元素", desc: "分泌强酸，能缓慢腐蚀金属门锁或防弹衣。", character: "未知" },
  { name: "电子干扰", level: "C", type: "科技", desc: "干扰周身10米内的监控探头和通讯信号。", character: "未知" },
  { name: "烟雾化", level: "C", type: "闪避", desc: "受到攻击瞬间身体局部烟雾化，免疫一次物理伤害（有冷却）。", character: "未知" },
  { name: "视觉共享", level: "C", type: "侦查", desc: "骇入义眼或摄像头，与其共享视觉信号。", character: "未知" },
  { name: "蜘蛛感应", level: "C", type: "感知", desc: "对即将到来的物理攻击产生直觉预警。", character: "未知" },
  { name: "伤口撕裂", level: "C", type: "诅咒", desc: "击中敌人后，阻止其伤口愈合，造成持续流血。", character: "未知" },
  { name: "磁力吸附", level: "C", type: "辅助", desc: "可以在垂直的金属墙面上自由行走。", character: "未知" },
  { name: "狂暴", level: "C", type: "战斗", desc: "牺牲理智（SAN值），换取短暂的力量与速度大幅提升。", character: "未知" },
  { name: "闪光术", level: "C", type: "干扰", desc: "掌心爆发出致盲强光，对义眼也有干扰效果。", character: "未知" },

  // ==================== D级原著 (特长生/辅助人员) ====================
  { name: "意念操控", level: "D", type: "念力", desc: "隔空操纵物体。", character: "未知" },
  { name: "欺诈术", level: "D", type: "精神控制", desc: "一定概率让对方在限定时间内无条件地相信你的谎言。", character: "魁辛" },
  // ==================== D级添加 (特长生/辅助人员) ====================
  { name: "微弱念力", level: "D", type: "念力", desc: "隔空移动不超过5kg的物体，适合偷窃或解开门锁。", character: "未知" },
  { name: "夜视", level: "D", type: "强化", desc: "在完全黑暗的环境中也能视物。", character: "未知" },
  { name: "快速指法", level: "D", type: "辅助", desc: "手指灵活度提升，极大提高敲击代码或装填弹药的速度。", character: "未知" },
  { name: "憋气", level: "D", type: "强化", desc: "可以在水下或毒气环境中闭气长达30分钟。", character: "未知" },
  { name: "静电释放", level: "D", type: "元素", desc: "指尖释放静电，仅能造成麻痹或点燃易燃物。", character: "未知" },
  { name: "声音模拟", level: "D", type: "欺诈", desc: "完美模仿听过的任何人的声线。", character: "未知" },
  { name: "嗅觉追踪", level: "D", type: "感知", desc: "像猎犬一样通过气味追踪目标。", character: "未知" },
  { name: "快速止血", level: "D", type: "恢复", desc: "控制肌肉收缩，让轻微伤口迅速停止流血。", character: "未知" },
  { name: "物品鉴定", level: "D", type: "信息", desc: "触碰物品得知其基本材质和用途。", character: "未知" },
  { name: "存在感降低", level: "D", type: "隐匿", desc: "不主动做大幅动作时，容易被周围人忽略。", character: "未知" },

  // ==================== E级原著 (入门级/生活辅助) ====================
  { name: "阴影穿梭", level: "E", type: "空间/隐匿", desc: "利用阴影进行小范围空间穿梭。", character: "柴剑" },
  { name: "状态感知", level: "E", type: "信息", desc: "感知目标的身体状态。", character: "剥夺者4号" },
  { name: "时间之轮", level: "E", type: "信息", desc: "查看当前世界线的时间流速。", character: "未知" },
  // ==================== E级添加 (入门级/生活辅助) ====================
  { name: "微光照明", level: "E", type: "辅助", desc: "手掌发出微弱的光芒，照亮周围两米。", character: "未知" },
  { name: "温度感知", level: "E", type: "感知", desc: "不需要温度计也能精准知道当前气温。", character: "未知" },
  { name: "指北针", level: "E", type: "辅助", desc: "在任何环境下都能分辨绝对东南西北。", character: "未知" },
  { name: "精力旺盛", level: "E", type: "被动", desc: "每天只需要睡4小时就能恢复全额体力。", character: "未知" },
  { name: "干燥术", level: "E", type: "生活", desc: "快速烘干湿透的衣服或受潮的火药。", character: "未知" },
  { name: "听觉微增", level: "E", type: "强化", desc: "听力比常人稍微好一点，能听到隔壁的窃窃私语。", character: "未知" },
  { name: "电子亲和", level: "E", type: "被动", desc: "随身携带的电子设备电池续航时间延长10%。", character: "未知" },
  { name: "精准投掷", level: "E", type: "战斗", desc: "扔石头或飞镖的准头比普通人准。", character: "未知" },
  { name: "危险直觉(弱)", level: "E", type: "感知", desc: "偶尔会产生毫无根据的心慌，可能是危险预警。", character: "未知" },
  { name: "速记", level: "E", type: "辅助", desc: "看过一遍的文字能短时间内强行记住。", character: "未知" }
];
