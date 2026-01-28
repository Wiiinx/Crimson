
import React, { useState, useEffect, useRef } from 'react';
import { ABILITY_POOL } from './data/abilities';
import { TALENTS_POOL } from './data/talents';
import { INITIAL_POSTS, FORUM_CATEGORIES } from './data/world';
import { LOOT_TABLE, MARKET_CONSUMABLES } from './data/items';
import { MISSION_DB } from './data/missions';
import { COMMON_CHAT_RESPONSES } from './data/npcs';
import { UserData, Ability, ForumPost, InventoryItem, SystemLog, ItemRarity, Mission, ActiveMission, ChatMessage, Contact, MissionReward } from './types';
import { generateWorldEvent } from './services/geminiService';

// Layouts & UI
import { Header } from './layout/Header';
import { Sidebar } from './layout/Sidebar';
import { ScavengeResultModal, JobIntroModal, InfoHUDModal, MissionTriggerModal, MissionSettlementModal } from './components/Modals';

// Views
import { BootView, LoginView, RegisterView, LoadingProtocolView, ProtocolView, WorldEntryView } from './views/Auth';
import { CharacterSheet } from './views/CharacterSheet';
import { DashboardTab } from './views/DashboardTab';
import { MissionsTab } from './views/MissionsTab';
import { SocialTab } from './views/SocialTab';
import { ForumTab } from './views/ForumTab';
import { MarketTab } from './views/MarketTab';
import { TerminalTab } from './views/TerminalTab';

const App = () => {
  // Navigation & Auth
  // Changed default flow: Boot -> Register (Identity Construction)
  const [view, setView] = useState<'boot' | 'login' | 'register' | 'loading_protocol' | 'protocol' | 'world_entry' | 'character_sheet' | 'job_intro' | 'main'>('boot');
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'forum' | 'missions' | 'social' | 'market' | 'terminal'>('dashboard');
  
  // UI State
  const [infoOverlay, setInfoOverlay] = useState<{x: number, y: number, title: string, content: string} | null>(null);
  const [pendingMission, setPendingMission] = useState<Mission | null>(null);
  const [settledMission, setSettledMission] = useState<{mission: Mission, rewards: MissionReward} | null>(null);

  // Game State
  const [survivors, setSurvivors] = useState(9949);
  const [systemLogs, setSystemLogs] = useState<SystemLog[]>([]);
  const [posts, setPosts] = useState<ForumPost[]>(INITIAL_POSTS);
  const [worldTime, setWorldTime] = useState(new Date("2026-06-15T09:00:00"));
  // Ref to access current time inside intervals without dependencies
  const worldTimeRef = useRef(worldTime); 
  const [marketStock, setMarketStock] = useState<InventoryItem[]>([]);
  
  // Interaction State
  const [newPost, setNewPost] = useState({ title: '', content: '', category: FORUM_CATEGORIES[0] });
  const [isScavenging, setIsScavenging] = useState(false);
  const [scavengeResult, setScavengeResult] = useState<{item?: InventoryItem, msg: string} | null>(null); 
  const [viewingPost, setViewingPost] = useState<ForumPost | null>(null);
  const [newComment, setNewComment] = useState('');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [chatInput, setChatInput] = useState('');
  const [selectedGiftId, setSelectedGiftId] = useState<string>('');
  const [showInventory, setShowInventory] = useState(false);
  const [showJobModal, setShowJobModal] = useState(false);

  // Initialize
  useEffect(() => { 
    setMarketStock(MARKET_CONSUMABLES.map(item => ({ ...item, count: Math.floor(Math.random() * (item.maxStock || 10)) })));
  }, []);

  // Update Ref
  useEffect(() => {
    worldTimeRef.current = worldTime;
  }, [worldTime]);

  // Global Persistence Effect
  useEffect(() => {
    if (currentUser) {
      const allUsers = JSON.parse(localStorage.getItem('NET_USERS') || '[]');
      const updatedUsers = allUsers.map((u: any) => u.id === currentUser.id ? currentUser : u);
      localStorage.setItem('NET_USERS', JSON.stringify(updatedUsers));
    }
  }, [currentUser]);

  // Passive Loops & Mission Trigger Logic
  useEffect(() => {
    const clockTimer = setInterval(() => setWorldTime(prev => new Date(prev.getTime() + 1000)), 1000);
    
    // Recovery Logic
    const recoveryTimer = setInterval(() => {
      setCurrentUser(prev => {
        if (!prev) return null;
        if (prev.energy >= prev.maxEnergy && prev.san >= prev.maxSan) return prev;
        return {
          ...prev,
          energy: Math.min(prev.maxEnergy, prev.energy + 1),
          san: Math.min(prev.maxSan, prev.san + 1)
        };
      });
    }, 30000);

    // Random Deaths & Broadcasts
    const deathTimer = setInterval(() => {
      setSurvivors(prev => {
        // Randomly decide if someone dies
        if (prev > 100 && Math.random() < 0.3) {
          const deadId = Math.floor(Math.random() * 9000) + 1000;
          const killerId = Math.floor(Math.random() * 9000) + 1000;
          const isBereaverKill = Math.random() > 0.4; // 60% chance killer is Bereaver
          const killerType = isBereaverKill ? '剥夺者' : '代行者';
          
          const dateStr = worldTimeRef.current.toLocaleDateString('zh-CN', { month: 'numeric', day: 'numeric' });
          
          const newLog: SystemLog = {
            id: Date.now(),
            content: `代行者${deadId}号，于${dateStr}被${killerType}${killerId}号杀死。`,
            type: 'critical', // Use critical style for deaths
            timestamp: worldTimeRef.current.toLocaleTimeString()
          };
          setSystemLogs(logs => [newLog, ...logs].slice(0, 20));
          return prev - 1;
        }
        return prev;
      });
    }, 5000);

    // Active Mission Progress Tick
    const missionTick = setInterval(() => {
        setCurrentUser(prev => {
            if(!prev) return null;
            return {...prev}; // Force update for progress bars
        });
    }, 1000);

    return () => { clearInterval(clockTimer); clearInterval(deathTimer); clearInterval(recoveryTimer); clearInterval(missionTick); };
  }, []);

  // Automatic Mission Trigger Effect
  useEffect(() => {
      if (view === 'main' && activeTab === 'missions' && currentUser && !pendingMission) {
          // Check if intro already handled or if user is new
          const hasSeenIntro = currentUser.hasSeenIntroMission;
          
          if (!hasSeenIntro && currentUser.activeMissions.length === 0 && currentUser.completedMissionIds.length === 0) {
              const firstMission = MISSION_DB.find(m => (!m.jobRequirement || m.jobRequirement === currentUser.job) && m.category === 'main');
              if (firstMission) {
                  setPendingMission(firstMission);
              }
          }
      }
  }, [view, activeTab, currentUser, pendingMission]);

  // --- Handlers ---

  const handleShowInfo = (e: React.MouseEvent, title: string, content: string) => {
    setInfoOverlay({ x: e.clientX, y: e.clientY, title, content });
  };

  const handleHideInfo = () => {
    setInfoOverlay(null);
  };

  const getRandomBirthplace = (): string => {
    const locations = [
        { name: '黑海市', weight: 40 },
        { name: '白鲸市', weight: 30 },
        { name: '联邦行政中心', weight: 20 },
        { name: '浮岗市', weight: 4 },
        { name: '临荫市', weight: 2 },
        { name: '赤余市', weight: 1 },
        { name: '鸣山市', weight: 0.5 },
        { name: '蓝柯市', weight: 0.5 },
        { name: '多玛市', weight: 0.01 },
    ];
    
    const totalWeight = locations.reduce((acc, loc) => acc + loc.weight, 0);
    let random = Math.random() * totalWeight;
    
    for (const loc of locations) {
        if (random < loc.weight) return loc.name;
        random -= loc.weight;
    }
    return '黑海市'; // Fallback
  };

  const generateNewProfile = (name: string, bday: string, gender: string): UserData => {
    const allUsers = JSON.parse(localStorage.getItem('NET_USERS') || '[]');
    let nextId = Math.floor(Math.random() * 999999) + 1;
    while (allUsers.find((u: any) => u.id === nextId)) {
        nextId = Math.floor(Math.random() * 999999) + 1;
    }

    const isDepriver = Math.random() < 0.1;
    let abilities: Ability[] = [];
    if (!isDepriver) {
      const rand = Math.random();
      let rankFilter = 'E';
      if (rand < 0.01) rankFilter = 'S';
      else if (rand < 0.05) rankFilter = 'A';
      else if (rand < 0.20) rankFilter = 'B';
      else if (rand < 0.50) rankFilter = 'C';
      const pool = ABILITY_POOL.filter(a => rankFilter === 'E' || a.level === rankFilter || (rankFilter === 'D' && (a.level === 'D' || a.level === 'E')));
      const fallbackPool = ABILITY_POOL.filter(a => a.level === 'E');
      abilities.push(pool.length > 0 ? pool[Math.floor(Math.random() * pool.length)] : fallbackPool[Math.floor(Math.random() * fallbackPool.length)]);
    }
    const newUser: UserData = {
      id: nextId, realName: name, username: `${nextId}`, birthday: bday, gender: gender,
      birthplace: getRandomBirthplace(),
      organization: '暂无',
      job: isDepriver ? '剥夺者' : '代行者', credits: 200, syncRate: Math.floor(Math.random() * 20) + 80,
      san: 100, maxSan: 100, energy: 100, maxEnergy: 100, friends: [], bio: "身份识别已通过。欢迎进入深红之土。",
      abilities: abilities, talents: [...TALENTS_POOL].sort(() => 0.5 - Math.random()).slice(0, 2),
      inventory: [], hasSignedProtocol: false, hasSeenIntroMission: false, lastTick: Date.now(), 
      npcRelations: {}, completedMissionIds: [], activeMissions: [], conversations: {},
      attributes: { strength: 10, agility: 10, intelligence: 10 }
    };
    allUsers.push(newUser);
    localStorage.setItem('NET_USERS', JSON.stringify(allUsers));
    return newUser;
  };

  const handleRefreshMarket = () => {
    if (!currentUser) return;
    if (currentUser.credits < 50) { alert("刷新市场需要 50 信用点！"); return; }
    setCurrentUser({...currentUser, credits: currentUser.credits - 50});
    setMarketStock(MARKET_CONSUMABLES.map(item => ({ ...item, count: Math.floor(Math.random() * (item.maxStock || 10)) })));
    setSystemLogs(prev => [{ id: Date.now(), content: `[MARKET] 市场数据流已刷新。`, type: 'info', timestamp: new Date().toLocaleTimeString() }, ...prev]);
  };

  const getRandomLoot = (): InventoryItem => {
    const rand = Math.random();
    let rarity: ItemRarity = 'junk';
    if (rand > 0.999) rarity = 'cursed'; else if (rand > 0.99) rarity = 'legendary'; else if (rand > 0.95) rarity = 'epic';
    else if (rand > 0.80) rarity = 'rare'; else if (rand > 0.50) rarity = 'uncommon'; else if (rand > 0.20) rarity = 'common';
    const pool = LOOT_TABLE.filter(i => i.rarity === rarity);
    const fallback = LOOT_TABLE.filter(i => i.rarity === 'junk');
    return (pool.length > 0 ? pool : fallback)[Math.floor(Math.random() * (pool.length > 0 ? pool : fallback).length)];
  };

  const handleScavenge = () => {
    if (!currentUser) return;
    if (currentUser.san < 5) { alert("SAN值过低！"); return; }
    if (currentUser.energy < 10) { alert("体力耗尽！"); return; }
    setIsScavenging(true);
    setTimeout(() => {
      let updatedUser = { ...currentUser, san: currentUser.san - 5, energy: currentUser.energy - 10 };
      const findSomething = Math.random() < 0.8;
      let logMsg = `探索完成 (-10体力, -5SAN)。`;
      let foundItem: InventoryItem | undefined;
      let resultMsg = "在一堆废墟中翻找了半天，除了一些不可名状的粘液，什么也没发现。";
      if (findSomething) {
        foundItem = getRandomLoot();
        logMsg += ` 发现物资: [${foundItem.name}]`;
        resultMsg = `你发现了: ${foundItem.name}`;
        const newInv = [...updatedUser.inventory];
        const existingItem = newInv.find(i => i.id === foundItem!.id);
        if (existingItem) existingItem.count++; else newInv.push({ ...foundItem, count: 1 });
        updatedUser.inventory = newInv;
      }
      setCurrentUser(updatedUser);
      setSystemLogs(prev => [{ id: Date.now(), content: logMsg, type: findSomething ? 'loot' : 'info', timestamp: new Date().toLocaleTimeString() }, ...prev]);
      setIsScavenging(false);
      setScavengeResult({ item: foundItem, msg: resultMsg });
    }, 1500);
  };

  const handleUseItem = (itemId: string) => {
    if (!currentUser) return;
    const itemIndex = currentUser.inventory.findIndex(i => i.id === itemId);
    if (itemIndex === -1) return;
    const item = currentUser.inventory[itemIndex];
    if (item.type !== 'consumable' || !item.effect) { alert("该物品无法直接使用。"); return; }
    let updatedUser = { ...currentUser, ...item.effect(currentUser) };
    updatedUser.inventory[itemIndex].count--;
    if (updatedUser.inventory[itemIndex].count <= 0) updatedUser.inventory.splice(itemIndex, 1);
    setCurrentUser(updatedUser);
    setSystemLogs(prev => [{ id: Date.now(), content: `[USE] 使用了 ${item.name}`, type: 'info', timestamp: new Date().toLocaleTimeString() }, ...prev]);
  };

  const handleSellItem = (item: InventoryItem, quantity: number) => {
    if (!currentUser) return;
    if (item.type === 'gear') return;
    let updatedUser = { ...currentUser };
    const totalValue = item.price * quantity;
    updatedUser.credits += totalValue;
    const idx = updatedUser.inventory.findIndex(i => i.id === item.id);
    if (idx !== -1) {
      updatedUser.inventory[idx].count -= quantity;
      if (updatedUser.inventory[idx].count <= 0) updatedUser.inventory.splice(idx, 1);
    }
    setCurrentUser(updatedUser);
    setSystemLogs(prev => [{ id: Date.now(), content: `[SELL] 出售 ${item.name} x${quantity} (+${totalValue}C)`, type: 'info', timestamp: new Date().toLocaleTimeString() }, ...prev]);
  };

  const handleBuyItem = (item: InventoryItem) => {
    if (!currentUser) return;
    if (currentUser.credits < item.price) { alert("信用点不足！"); return; }
    const marketItemIndex = marketStock.findIndex(i => i.id === item.id);
    if (marketItemIndex !== -1 && marketStock[marketItemIndex].count <= 0) { alert("商品已售罄。"); return; }
    const updatedUser = { ...currentUser };
    updatedUser.credits -= item.price;
    const invIndex = updatedUser.inventory.findIndex(i => i.id === item.id);
    if (invIndex !== -1) updatedUser.inventory[invIndex].count++; else updatedUser.inventory.push({ ...item, count: 1 });
    marketStock[marketItemIndex].count--;
    setMarketStock([...marketStock]);
    setCurrentUser(updatedUser);
    setSystemLogs(prev => [{ id: Date.now(), content: `[MARKET] 购买了 ${item.name} (-${item.price}C)`, type: 'info', timestamp: new Date().toLocaleTimeString() }, ...prev]);
  };

  const handleCreatePost = () => {
    if(!newPost.title || !newPost.content) return;
    setPosts([{ id: Date.now().toString(), authorId: currentUser!.id, title: newPost.title, content: newPost.content, category: newPost.category, timestamp: Date.now(), likes: 0, comments: [] }, ...posts]);
    setNewPost({ title: '', content: '', category: FORUM_CATEGORIES[0] });
    setSystemLogs(prev => [{ id: Date.now(), content: `[NET] 发布了新帖: ${newPost.title}`, type: 'social', timestamp: new Date().toLocaleTimeString() }, ...prev]);
  };

  const handleDeletePost = (postId: string) => {
    if (window.confirm("确定要删除这条信息流吗？")) {
       setPosts(prev => prev.filter(p => p.id !== postId));
       if(viewingPost?.id === postId) setViewingPost(null);
       setSystemLogs(prev => [{ id: Date.now(), content: `[NET] 删除了帖子 ID: ${postId}`, type: 'social', timestamp: new Date().toLocaleTimeString() }, ...prev]);
    }
  };

  const handleLikePost = (postId: string) => {
    setPosts(posts.map(p => p.id === postId ? { ...p, likes: p.likes + 1 } : p));
    if (viewingPost && viewingPost.id === postId) setViewingPost(prev => prev ? ({ ...prev, likes: prev.likes + 1 }) : null);
  };

  const handleAddComment = () => {
    if (!viewingPost || !newComment) return;
    const updatedPost = { ...viewingPost, comments: [...viewingPost.comments, { id: Date.now().toString(), authorId: currentUser!.id, content: newComment, timestamp: Date.now() }] };
    setViewingPost(updatedPost);
    setPosts(posts.map(p => p.id === viewingPost.id ? updatedPost : p));
    setNewComment('');
  };

  const triggerWorldEvent = async () => {
    const eventText = await generateWorldEvent(survivors, 65);
    setSystemLogs(prev => [{ id: Date.now(), content: `[BROADCAST] ${eventText}`, type: 'warning', timestamp: new Date().toLocaleTimeString() }, ...prev]);
  };

  // --- Mission Logic ---

  const startMission = (mission: Mission) => {
    if (!currentUser) return;
    if (mission.cost.energy > currentUser.energy || mission.cost.san > currentUser.san) { alert("状态不足！(INSUFFICIENT STATS)"); return; }
    if (mission.jobRequirement && mission.jobRequirement !== currentUser.job) { alert("职业不符！(JOB MISMATCH)"); return; }
    
    setCurrentUser({
      ...currentUser, 
      energy: currentUser.energy - mission.cost.energy, 
      san: currentUser.san - mission.cost.san,
      hasSeenIntroMission: true, // Mark intro as seen
      activeMissions: [...currentUser.activeMissions, { missionId: mission.id, startTime: Date.now(), endTime: Date.now() + (mission.duration * 1000), progress: 0 }]
    });
    setSystemLogs(prev => [{ id: Date.now(), content: `[MISSION] 任务开始: ${mission.title}`, type: 'mission', timestamp: new Date().toLocaleTimeString() }, ...prev]);
    setPendingMission(null);
  };

  const handleRejectMission = () => {
    if (!currentUser) return;
    setCurrentUser({ ...currentUser, hasSeenIntroMission: true }); // Mark intro as seen even if rejected
    setPendingMission(null);
  };

  const completeMission = (active: ActiveMission) => {
    if (!currentUser) return;
    const mission = MISSION_DB.find(m => m.id === active.missionId);
    if (!mission) return;
    
    let updatedUser = { ...currentUser };
    
    // Apply Rewards
    if (mission.rewards.credits) updatedUser.credits += mission.rewards.credits;
    if (mission.rewards.trust) {
        updatedUser.npcRelations = { 
            ...updatedUser.npcRelations, 
            [mission.rewards.trust.npcId]: (updatedUser.npcRelations[mission.rewards.trust.npcId] || 0) + mission.rewards.trust.amount 
        };
    }
    if (mission.rewards.ability) updatedUser.abilities = [...updatedUser.abilities, mission.rewards.ability];
    if (mission.rewards.item) {
      const existing = updatedUser.inventory.find(i => i.id === mission.rewards.item!.id);
      if (existing) existing.count++; else updatedUser.inventory.push({ ...mission.rewards.item!, count: 1 });
    }
    if (mission.rewards.attribute && updatedUser.attributes) {
        const attrName = mission.rewards.attribute.name;
        updatedUser.attributes[attrName] = (updatedUser.attributes[attrName] || 0) + mission.rewards.attribute.value;
    }

    // Special handlers
    if (mission.id === 'gen_sleep') { updatedUser.energy = Math.min(updatedUser.maxEnergy, updatedUser.energy + 30); updatedUser.san = Math.min(updatedUser.maxSan, updatedUser.san + 10); }
    if (mission.id === 'gen_clinic') updatedUser.credits = Math.max(0, updatedUser.credits - 100);
    
    updatedUser.activeMissions = updatedUser.activeMissions.filter(m => m.missionId !== active.missionId);
    updatedUser.completedMissionIds = [...updatedUser.completedMissionIds, active.missionId];
    
    setCurrentUser(updatedUser);
    setSystemLogs(prev => [{ id: Date.now(), content: `[MISSION] 任务完成: ${mission.title}`, type: 'mission', timestamp: new Date().toLocaleTimeString() }, ...prev]);
    setSettledMission({ mission, rewards: mission.rewards });
  };

  const handleSendMessage = () => {
    if (!currentUser || !selectedContact || !chatInput.trim()) return;
    const newMessage: ChatMessage = { id: Date.now().toString(), sender: 'me', content: chatInput, timestamp: Date.now() };
    let updatedUser = { ...currentUser, conversations: { ...currentUser.conversations, [selectedContact.id]: [...(currentUser.conversations[selectedContact.id] || []), newMessage] } };
    if (selectedContact.type === 'npc') {
       setTimeout(() => {
         const reply: ChatMessage = { id: (Date.now() + 1).toString(), sender: 'them', content: COMMON_CHAT_RESPONSES[Math.floor(Math.random() * COMMON_CHAT_RESPONSES.length)], timestamp: Date.now() };
         setCurrentUser(prev => prev ? ({ ...prev, conversations: { ...prev.conversations, [selectedContact.id]: [...(prev.conversations[selectedContact.id] || []), reply] } }) : null);
       }, 2000);
    }
    setCurrentUser(updatedUser);
    setChatInput('');
  };

  const handleTransferItem = () => {
    if (!currentUser || !selectedContact || !selectedGiftId) return;
    const itemIdx = currentUser.inventory.findIndex(i => i.id === selectedGiftId);
    if (itemIdx === -1) return;
    let updatedUser = { ...currentUser };
    updatedUser.inventory[itemIdx].count--;
    if (updatedUser.inventory[itemIdx].count <= 0) updatedUser.inventory.splice(itemIdx, 1);
    const sysMsg: ChatMessage = { id: Date.now().toString(), sender: 'system', content: `[系统] 发送了: ${currentUser.inventory[itemIdx].name}`, timestamp: Date.now() };
    updatedUser.conversations[selectedContact.id] = [...(updatedUser.conversations[selectedContact.id] || []), sysMsg];
    setCurrentUser(updatedUser);
    setSelectedGiftId('');
  };

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-300 font-mono flex flex-col md:flex-row overflow-hidden selection:bg-red-900 selection:text-white">
      {/* Global Background */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:16px_16px] opacity-20"></div>
      <div className="fixed top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-900 to-transparent z-50"></div>
      
      {view === 'main' && <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} setViewingPost={setViewingPost} setView={setView} />}
      
      <main className="flex-1 h-screen overflow-y-auto p-4 md:p-8 relative scroll-smooth z-10">
        {view === 'main' && <Header worldTime={worldTime} survivors={survivors} />}

        {view === 'boot' && <BootView onComplete={() => setView('register')} />}

        {view === 'login' && (
          <LoginView 
            onLogin={(id) => {
              const allUsers = JSON.parse(localStorage.getItem('NET_USERS') || '[]');
              const user = allUsers.find((u: any) => u.id === parseInt(id) || u.username === id);
              if (user) { setCurrentUser(user); setView(user.hasSignedProtocol ? 'main' : 'protocol'); } 
              else alert("用户ID不存在 (UID NOT FOUND)");
            }}
            onRegister={() => setView('register')}
          />
        )}

        {view === 'register' && (
          <RegisterView 
            onRegisterSubmit={(name, bday, gender) => {
              const user = generateNewProfile(name, bday, gender);
              setCurrentUser(user);
              setView('loading_protocol');
            }}
            onCancel={() => setView('login')}
          />
        )}

        {view === 'loading_protocol' && <LoadingProtocolView onComplete={() => setView('protocol')} />}

        {view === 'protocol' && (
          <ProtocolView 
            onAccept={() => {
               const u = {...currentUser!, hasSignedProtocol: true}; setCurrentUser(u); 
               // No manual save needed here as useEffect covers it, but kept for immediate safety
               const all = JSON.parse(localStorage.getItem('NET_USERS') || '[]');
               localStorage.setItem('NET_USERS', JSON.stringify(all.map((it:any) => it.id === u.id ? u : it)));
               setView('world_entry'); 
            }}
          />
        )}

        {view === 'world_entry' && (
            <WorldEntryView onComplete={() => setView('character_sheet')} />
        )}

        {view === 'character_sheet' && currentUser && <CharacterSheet user={currentUser} onConfirm={() => setView('job_intro')} onShowInfo={handleShowInfo} onHideInfo={handleHideInfo} />}
        {view === 'job_intro' && currentUser && <JobIntroModal job={currentUser.job} onClose={() => setView('main')} />}

        {view === 'main' && activeTab === 'dashboard' && (
          <DashboardTab 
            currentUser={currentUser} setCurrentUser={setCurrentUser}
            handleScavenge={handleScavenge} isScavenging={isScavenging}
            showInventory={showInventory} setShowInventory={setShowInventory}
            handleUseItem={handleUseItem} handleSellItem={handleSellItem}
            setShowJobModal={setShowJobModal}
            onShowInfo={handleShowInfo}
            onHideInfo={handleHideInfo}
          />
        )}
        
        {view === 'main' && activeTab === 'missions' && (
          <MissionsTab 
            currentUser={currentUser} setCurrentUser={setCurrentUser}
            startMission={startMission} completeMission={completeMission}
          />
        )}
        
        {view === 'main' && activeTab === 'social' && (
          <SocialTab 
            currentUser={currentUser} setCurrentUser={setCurrentUser}
            selectedContact={selectedContact} setSelectedContact={setSelectedContact}
            handleSendMessage={handleSendMessage} handleTransferItem={handleTransferItem}
            chatInput={chatInput} setChatInput={setChatInput}
            selectedGiftId={selectedGiftId} setSelectedGiftId={setSelectedGiftId}
          />
        )}
        
        {view === 'main' && activeTab === 'forum' && (
          <ForumTab 
            currentUser={currentUser}
            posts={posts} setPosts={setPosts}
            viewingPost={viewingPost} setViewingPost={setViewingPost}
            handleCreatePost={handleCreatePost} handleLikePost={handleLikePost} handleAddComment={handleAddComment}
            handleDeletePost={handleDeletePost}
            newPost={newPost} setNewPost={setNewPost}
            newComment={newComment} setNewComment={setNewComment}
          />
        )}
        
        {view === 'main' && activeTab === 'market' && (
          <MarketTab 
            marketStock={marketStock} currentUser={currentUser}
            handleBuyItem={handleBuyItem} handleRefreshMarket={handleRefreshMarket}
            onShowInfo={handleShowInfo}
            onHideInfo={handleHideInfo}
          />
        )}
        
        {view === 'main' && activeTab === 'terminal' && (
          <TerminalTab systemLogs={systemLogs} triggerWorldEvent={triggerWorldEvent} />
        )}

        {showJobModal && currentUser && <JobIntroModal job={currentUser.job} onClose={() => setShowJobModal(false)} isModal={true} />}
        {scavengeResult && <ScavengeResultModal item={scavengeResult.item} msg={scavengeResult.msg} onClose={() => setScavengeResult(null)} />}
        
        {/* Mission Modals */}
        {pendingMission && (
            <MissionTriggerModal 
                mission={pendingMission} 
                onAccept={() => startMission(pendingMission)} 
                onReject={handleRejectMission}
            />
        )}
        {settledMission && (
            <MissionSettlementModal 
                mission={settledMission.mission} 
                rewards={settledMission.rewards} 
                onClose={() => setSettledMission(null)} 
            />
        )}

        {/* Info Overlay */}
        {infoOverlay && <InfoHUDModal title={infoOverlay.title} content={infoOverlay.content} x={infoOverlay.x} y={infoOverlay.y} />}
      </main>
    </div>
  );
};

export default App;
