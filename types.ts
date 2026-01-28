
export type ItemRarity = 'junk' | 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'cursed';

export interface Ability {
  name: string;
  level: string;
  type: string;
  desc: string;
  character: string;
}

export interface ForumComment {
  id: string;
  authorId: number;
  content: string;
  timestamp: number;
}

export interface ForumPost {
  id: string;
  authorId: number;
  category: string;
  content: string;
  title: string;
  timestamp: number;
  likes: number;
  comments: ForumComment[];
  isSticky?: boolean;
}

export interface InventoryItem {
  id: string;
  name: string;
  type: 'loot' | 'consumable' | 'weapon' | 'gear' | 'quest' | 'key_item';
  rarity: ItemRarity;
  price: number;
  desc: string;
  effect?: (user: UserData) => Partial<UserData>;
  count: number;
  maxStock?: number;
}

// --- New Types for Mission System ---

export interface NPC {
  id: string;
  name: string;
  title: string;
  desc: string;
  avatarColor: string; // Hex color for placeholder
}

export interface MissionReward {
  credits?: number;
  trust?: { npcId: string; amount: number };
  ability?: Ability;
  item?: InventoryItem;
  attribute?: { name: string; value: number };
  faction?: { name: string; members: number };
  title?: string;
  text: string; // Fluff text for the result
}

export interface Mission {
  id: string;
  title: string;
  desc: string;
  category: 'main' | 'daily' | 'urgent' | 'hidden'; // Updated category
  jobRequirement?: '剥夺者' | '代行者'; // If undefined, available to all
  prerequisiteMissionId?: string; // Must complete this first
  prerequisiteTrust?: { npcId: string; level: number }; // Need specific trust
  npcId?: string; // Associated NPC
  cost: { energy: number; san: number };
  duration: number; // In seconds
  rewards: MissionReward;
  type: 'combat' | 'stealth' | 'social' | 'training' | 'investigation' | 'survival' | 'management' | 'war';
}

export interface ActiveMission {
  missionId: string;
  startTime: number;
  endTime: number;
  progress: number; // 0-100 percentage
}

// --- New Types for Chat System ---

export interface ChatMessage {
  id: string;
  sender: 'me' | 'them' | 'system';
  content: string;
  timestamp: number;
}

export interface Contact {
  id: string;
  name: string;
  type: 'npc' | 'player';
  status: 'online' | 'offline' | 'busy';
  avatarColor?: string;
  desc?: string;
}

export interface UserData {
  id: number;
  realName: string;
  username: string;
  birthday: string;
  gender: string;
  birthplace: string; // New field
  organization: string; // New field (e.g., 机械黎明, 联邦缉查部, or 暂无)
  job: '剥夺者' | '代行者' | '观察者';
  credits: number;
  syncRate: number;
  san: number;
  maxSan: number;
  energy: number;
  maxEnergy: number;
  attributes?: Record<string, number>; // Generic attributes like strength, agility, etc.
  friends: number[];
  bio: string;
  abilities: Ability[];
  talents: string[];
  inventory: InventoryItem[];
  hasSignedProtocol: boolean;
  hasSeenIntroMission?: boolean; // Track if user has seen the intro mission
  lastTick: number;
  // Mission Fields
  npcRelations: { [npcId: string]: number }; // Trust level 0-100
  completedMissionIds: string[];
  activeMissions: ActiveMission[];
  // Chat Fields
  conversations: { [contactId: string]: ChatMessage[] };
}

export interface SystemLog {
  id: number;
  content: string;
  type: 'critical' | 'warning' | 'info' | 'loot' | 'mission' | 'social';
  timestamp: string;
}
