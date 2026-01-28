
import React, { useRef, useEffect } from 'react';
import { UserData, Contact } from '../types';
import { MOCK_CONTACTS, NPC_DB } from '../data/npcs';
import { MessageSquare } from 'lucide-react';
import { NeonButton } from '../components/SharedUI';

interface SocialTabProps {
  currentUser: UserData | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<UserData | null>>;
  selectedContact: Contact | null;
  setSelectedContact: (c: Contact | null) => void;
  handleSendMessage: () => void;
  handleTransferItem: () => void;
  chatInput: string;
  setChatInput: (val: string) => void;
  selectedGiftId: string;
  setSelectedGiftId: (val: string) => void;
}

export const SocialTab: React.FC<SocialTabProps> = ({ 
  currentUser, selectedContact, setSelectedContact, 
  handleSendMessage, handleTransferItem, chatInput, setChatInput,
  selectedGiftId, setSelectedGiftId 
}) => {
  const allContacts: Contact[] = [
    ...MOCK_CONTACTS,
    ...NPC_DB.map(npc => ({
      id: npc.id,
      name: npc.name,
      type: 'npc' as const,
      status: 'online' as const,
      avatarColor: npc.avatarColor,
      desc: npc.title
    }))
  ];

  const currentConversation = selectedContact && currentUser?.conversations[selectedContact.id] ? currentUser.conversations[selectedContact.id] : [];
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [currentConversation]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full content-start relative">
      <div className="md:col-span-1 space-y-2 overflow-y-auto max-h-[80vh]">
        {allContacts.map(contact => (
          <div 
            key={contact.id} 
            onClick={() => setSelectedContact(contact)}
            className={`p-3 border cursor-pointer transition-all flex items-center gap-3 ${selectedContact?.id === contact.id ? 'bg-zinc-900 border-emerald-500' : 'bg-black border-zinc-800 hover:bg-zinc-900'}`}
          >
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white relative" style={{ backgroundColor: contact.avatarColor || '#333' }}>
              {contact.name.substring(0, 1)}
              <div className={`absolute bottom-0 right-0 w-2 h-2 rounded-full border border-black ${contact.status === 'online' ? 'bg-green-500' : contact.status === 'busy' ? 'bg-yellow-500' : 'bg-zinc-500'}`}></div>
            </div>
            <div>
              <div className={`text-sm font-bold ${selectedContact?.id === contact.id ? 'text-emerald-400' : 'text-zinc-300'}`}>{contact.name}</div>
              <div className="text-[10px] text-zinc-500 uppercase">{contact.type}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="md:col-span-2 flex flex-col h-[70vh] md:h-full bg-black/50 border border-zinc-800 relative">
         {selectedContact ? (
           <>
             <div className="p-4 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/30">
               <div>
                  <h3 className="text-white font-bold">{selectedContact.name}</h3>
                  <div className="text-[10px] text-zinc-500">{selectedContact.desc || 'Unknown User'}</div>
               </div>
               <div className="flex gap-2">
                  <select 
                    className="bg-black border border-zinc-700 text-[10px] text-white p-1 max-w-[100px]"
                    value={selectedGiftId}
                    onChange={(e) => setSelectedGiftId(e.target.value)}
                  >
                    <option value="">Select Gift...</option>
                    {currentUser?.inventory.map((item, idx) => (
                      <option key={`${item.id}_${idx}`} value={item.id}>{item.name}</option>
                    ))}
                  </select>
                  <button onClick={handleTransferItem} disabled={!selectedGiftId} className="text-xs bg-zinc-800 hover:bg-emerald-900 px-2 py-1 text-emerald-500 disabled:opacity-50">SEND</button>
               </div>
             </div>

             <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
                {currentConversation.length === 0 && <div className="text-center text-zinc-600 text-xs mt-10">- ENCRYPTED CHANNEL OPEN -</div>}
                {currentConversation.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                     <div className={`max-w-[70%] p-3 text-sm ${
                       msg.sender === 'me' ? 'bg-emerald-900/20 border border-emerald-800/50 text-emerald-100 rounded-tl-lg rounded-bl-lg rounded-br-lg' :
                       msg.sender === 'system' ? 'bg-zinc-900 border border-zinc-700 text-zinc-400 text-xs w-full text-center' :
                       'bg-zinc-900/50 border border-zinc-800 text-zinc-300 rounded-tr-lg rounded-bl-lg rounded-br-lg'
                     }`}>
                        {msg.content}
                        <div className="text-[9px] opacity-40 mt-1 text-right">{new Date(msg.timestamp).toLocaleTimeString()}</div>
                     </div>
                  </div>
                ))}
             </div>

             <div className="p-4 border-t border-zinc-800 flex gap-2">
               <input 
                 className="flex-1 bg-black border border-zinc-700 p-2 text-white text-sm outline-none focus:border-emerald-600"
                 placeholder="Type message..."
                 value={chatInput}
                 onChange={e => setChatInput(e.target.value)}
                 onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
               />
               <NeonButton onClick={handleSendMessage} variant="green">SEND</NeonButton>
             </div>
           </>
         ) : (
           <div className="flex flex-col items-center justify-center h-full text-zinc-600">
              <MessageSquare size={48} className="mb-4 opacity-20" />
              <div>SELECT A FREQUENCY TO CONNECT</div>
           </div>
         )}
      </div>
    </div>
  );
};
