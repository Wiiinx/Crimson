
import React from 'react';
import { Crosshair, LogOut, User, Briefcase, Users, MessageSquare, ShoppingCart, Terminal as TerminalIcon } from 'lucide-react';
import { ForumPost } from '../types';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: any) => void;
  setViewingPost: (post: ForumPost | null) => void;
  setView: (view: any) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, setViewingPost, setView }) => {
  return (
    <nav className="fixed bottom-0 w-full md:relative md:w-20 md:h-screen border-t md:border-t-0 md:border-r border-zinc-800 bg-black flex md:flex-col justify-between items-center py-2 md:py-6 z-50">
      <div className="hidden md:flex flex-col items-center gap-6">
        <div className="w-10 h-10 bg-red-900/20 border border-red-900 flex items-center justify-center text-red-500">
          <Crosshair size={20} />
        </div>
        <div className="w-[1px] h-12 bg-gradient-to-b from-red-900 to-transparent"></div>
      </div>
      
      <div className="flex md:flex-col gap-1 w-full md:w-auto justify-around md:justify-center">
        {[
          { id: 'dashboard', icon: User, label: 'CORE' },
          { id: 'missions', icon: Briefcase, label: 'TASK' },
          { id: 'social', icon: Users, label: 'LINK' },
          { id: 'forum', icon: MessageSquare, label: 'NET' },
          { id: 'market', icon: ShoppingCart, label: 'SHOP' },
          { id: 'terminal', icon: TerminalIcon, label: 'CMD' },
        ].map((item) => (
          <button 
            key={item.id}
            onClick={() => { setActiveTab(item.id); setViewingPost(null); }}
            className={`relative p-3 transition-all group ${activeTab === item.id ? 'text-red-500' : 'text-zinc-600 hover:text-zinc-300'}`}
          >
            {activeTab === item.id && <div className="absolute inset-0 bg-red-900/10 border-l-2 border-red-500"></div>}
            <item.icon size={20} />
          </button>
        ))}
      </div>
      
      <button onClick={() => setView('login')} className="hidden md:block text-zinc-800 hover:text-red-600 mb-4"><LogOut size={18} /></button>
    </nav>
  );
};
