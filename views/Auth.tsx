
import React, { useState, useEffect } from 'react';
import { HUDRing, TechBorder, NeonButton, TypewriterLines } from '../components/SharedUI';
import { Fingerprint } from 'lucide-react';

// --- Boot View ---
export const BootView: React.FC<{ onComplete: () => void }> = ({ onComplete }) => (
  <div className="h-full flex flex-col justify-center items-center">
     <HUDRing size={300} className="mb-8" duration="4s" />
     <div className="w-full max-w-md border-l-2 border-red-900 pl-4">
        <TypewriterLines 
            lines={[
                "> 系统启动...", 
                "> 连接神经网...", 
                "> 服务器: 深红之土", 
                "> 验证生物特征...", 
                "> ...", 
                "", 
                "“欢迎来到深红之土。”"
            ]} 
            onComplete={() => setTimeout(onComplete, 1500)} 
            speed={30} 
        />
     </div>
  </div>
);

// --- Login View ---
export const LoginView: React.FC<{ onLogin: (id: string) => void, onRegister: () => void }> = ({ onLogin, onRegister }) => {
  const [loginId, setLoginId] = useState('');
  return (
    <div className="h-full flex items-center justify-center relative">
       <HUDRing size={500} className="absolute opacity-10" />
       <TechBorder className="w-full max-w-md bg-black/90 p-8 space-y-8">
          <div className="text-center">
             <Fingerprint className="mx-auto text-red-600 mb-4 animate-pulse" size={48} />
             <h2 className="text-2xl font-orbitron text-white">身份验证</h2>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); onLogin(loginId); }} className="space-y-6">
             <input className="w-full bg-black border border-zinc-700 p-4 text-red-500 outline-none focus:border-red-500 text-center tracking-widest text-xl placeholder-zinc-800" placeholder="输入终端 ID" value={loginId} onChange={e => setLoginId(e.target.value)} />
             <NeonButton type="submit" variant="red" className="w-full h-12">登陆</NeonButton>
          </form>
          <button onClick={onRegister} className="w-full text-xs text-zinc-600 hover:text-zinc-300 uppercase tracking-widest">注册成为玩家</button>
       </TechBorder>
    </div>
  );
};

// --- Register View ---
export const RegisterView: React.FC<{ onRegisterSubmit: (name: string, bday: string, gender: string) => void, onCancel: () => void }> = ({ onRegisterSubmit, onCancel }) => {
  const [regData, setRegData] = useState({ name: '', birthday: '', gender: 'F' });
  return (
     <div className="h-full flex items-center justify-center">
        <TechBorder className="w-full max-w-md bg-black/90 p-8 space-y-6">
           <h2 className="text-xl font-orbitron text-red-500 border-b border-zinc-800 pb-2">身份构建</h2>
           <form onSubmit={(e) => {
              e.preventDefault();
              if(!regData.name) return;
              onRegisterSubmit(regData.name, regData.birthday, regData.gender);
           }} className="space-y-4">
              <input className="w-full bg-black border border-zinc-700 p-3 text-white" placeholder="真实姓名" required value={regData.name} onChange={e => setRegData({...regData, name: e.target.value})} />
              <input type="date" className="w-full bg-black border border-zinc-700 p-3 text-zinc-400" required value={regData.birthday} onChange={e => setRegData({...regData, birthday: e.target.value})} />
              <select className="w-full bg-black border border-zinc-700 p-3 text-zinc-400" value={regData.gender} onChange={e => setRegData({...regData, gender: e.target.value})}>
                 <option value="F">女</option>
                 <option value="M">男</option>
                 <option value="X">未知</option>
              </select>
              <NeonButton type="submit" variant="green" className="w-full mt-4">初始化</NeonButton>
           </form>
           <button onClick={onCancel} className="w-full text-xs text-zinc-600 hover:text-zinc-300 uppercase tracking-widest text-center">
              已有身份？接入终端
           </button>
        </TechBorder>
     </div>
  );
};

// --- Loading Protocol View ---
export const LoadingProtocolView: React.FC<{ onComplete: () => void }> = ({ onComplete }) => (
   <div className="h-full flex flex-col justify-center items-center">
      <div className="w-64 h-1 bg-zinc-900 mb-4 overflow-hidden"><div className="h-full bg-red-600 animate-loadingBar"></div></div>
      <TypewriterLines lines={["> 身份创建完成。", "> 同步率: 100%", "> 正在下载协议...", "> ...", ]} onComplete={onComplete} speed={10} />
   </div>
);

// --- Protocol View ---
export const ProtocolView: React.FC<{ onAccept: () => void }> = ({ onAccept }) => {
   const protocolRules = [
      "第一，请把游戏世界当成真实的世界。",
      "第二，不要向任何人透露自己玩家的身份。",
      "第三，不要向任何人泄露游戏内容。",
      "第四，生命仅有一次，死亡无法复活。",
      "第五，如果你选择开始游戏，那么你只有‘游戏通关’和‘人物死亡’两种路径可走。",
      "第六，凡事皆有代价。"
   ];

   return (
      <div className="fixed inset-0 bg-black flex flex-col justify-center items-center z-50 overflow-hidden">
         {/* Noise Overlay */}
         <div className="absolute inset-0 opacity-[0.1] pointer-events-none z-10" 
              style={{ 
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                  backgroundSize: '150px 150px'
              }}>
         </div>
         {/* Vignette */}
         <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_20%,black_100%)] z-20 pointer-events-none"></div>

         <div className="relative z-30 max-w-3xl w-full px-8 md:px-0">
            <TypewriterLines 
               lines={protocolRules} 
               colorClass="text-red-700 font-serif font-bold text-base md:text-2xl leading-loose tracking-widest drop-shadow-[0_0_5px_rgba(185,28,28,0.8)]"
               speed={50} 
               onComplete={() => setTimeout(onAccept, 2000)} 
            />
         </div>
      </div>
   );
};

// --- World Entry View (Updated) ---
export const WorldEntryView: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
   return (
      <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center p-8">
         <HUDRing size={300} className="mb-8 opacity-20" duration="3s" />
         <div className="w-full max-w-md border-l-2 border-red-900 pl-4">
            <TypewriterLines 
                lines={[
                    "> 你已进入新世界。",
                    "> 请查看你在本世界中的身份设置。",
                    "",
                    "> ..."
                ]} 
                onComplete={() => setTimeout(onComplete, 1200)} 
                speed={40} 
            />
         </div>
      </div>
   );
};
