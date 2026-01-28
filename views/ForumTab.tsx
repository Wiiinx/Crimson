
import React, { useState } from 'react';
import { ForumPost, UserData } from '../types';
import { FORUM_CATEGORIES } from '../data/world';
import { ThumbsUp, MessageCircle, ArrowLeft, Plus, Trash2, X, Pin, ShieldCheck, Zap } from 'lucide-react';
import { NeonButton } from '../components/SharedUI';

interface ForumTabProps {
  currentUser: UserData | null;
  posts: ForumPost[];
  setPosts: React.Dispatch<React.SetStateAction<ForumPost[]>>;
  viewingPost: ForumPost | null;
  setViewingPost: (post: ForumPost | null) => void;
  handleCreatePost: () => void;
  handleLikePost: (id: string) => void;
  handleAddComment: () => void;
  handleDeletePost: (id: string) => void;
  newPost: { title: string; content: string; category: string };
  setNewPost: (val: any) => void;
  newComment: string;
  setNewComment: (val: string) => void;
}

export const ForumTab: React.FC<ForumTabProps> = ({ 
  currentUser, posts, viewingPost, setViewingPost, handleCreatePost, handleLikePost, handleAddComment, handleDeletePost,
  newPost, setNewPost, newComment, setNewComment
}) => {
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [isCreating, setIsCreating] = useState(false);

  // Sorting: Sticky posts first, then by timestamp descending
  const filteredPosts = posts
    .filter(p => selectedCategory === '全部' || p.category === selectedCategory)
    .sort((a, b) => {
        if (a.isSticky && !b.isSticky) return -1;
        if (!a.isSticky && b.isSticky) return 1;
        return b.timestamp - a.timestamp;
    });

  const onSubmitPost = () => {
      handleCreatePost();
      setIsCreating(false);
  };

  const isRecent = (timestamp: number) => {
      // Considered "New" if created within the last 10 minutes
      return Date.now() - timestamp < 1000 * 60 * 10;
  };

  return (
    <div className="h-full flex flex-col gap-6 relative overflow-hidden">
      
      {/* --- CREATE POST DRAWER --- */}
      <div 
        className={`fixed inset-y-0 right-0 w-full md:w-[450px] bg-black/95 border-l border-zinc-800 z-[60] transform transition-transform duration-300 ease-in-out shadow-2xl ${isCreating ? 'translate-x-0' : 'translate-x-full'}`}
      >
         <div className="h-full flex flex-col p-6 relative">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-20 h-20 border-t-4 border-r-4 border-red-900/30 rounded-tr-xl"></div>
            <div className="absolute bottom-0 left-0 w-20 h-20 border-b-4 border-l-4 border-zinc-800 rounded-bl-xl"></div>

            <div className="flex justify-between items-center mb-8 border-b border-zinc-800 pb-4">
               <h2 className="text-xl font-bold font-orbitron text-white tracking-widest flex items-center gap-2">
                  <span className="w-2 h-6 bg-red-600"></span>
                  发布帖子
               </h2>
               <button onClick={() => setIsCreating(false)} className="text-zinc-500 hover:text-white transition-colors">
                  <X size={24} />
               </button>
            </div>

            <div className="flex-1 space-y-6">
                <div className="space-y-2">
                    <label className="text-xs text-zinc-500 uppercase font-bold tracking-wider">频道 / Channel</label>
                    <div className="grid grid-cols-4 gap-2">
                        {FORUM_CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setNewPost({...newPost, category: cat})}
                                className={`py-2 text-xs border transition-colors ${newPost.category === cat ? 'bg-red-900/20 border-red-500 text-white' : 'bg-black border-zinc-800 text-zinc-500 hover:border-zinc-500'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs text-zinc-500 uppercase font-bold tracking-wider">标题 / Subject</label>
                    <input 
                        className="w-full bg-zinc-900/50 border border-zinc-800 p-3 text-sm text-white focus:border-red-500 outline-none transition-colors"
                        placeholder="输入简短的标题..."
                        value={newPost.title}
                        onChange={e => setNewPost({...newPost, title: e.target.value})}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-xs text-zinc-500 uppercase font-bold tracking-wider">内容 / Payload</label>
                    <textarea 
                        className="w-full h-48 bg-zinc-900/50 border border-zinc-800 p-3 text-sm text-zinc-300 focus:border-red-500 outline-none transition-colors resize-none"
                        placeholder="在此输入信息..."
                        value={newPost.content}
                        onChange={e => setNewPost({...newPost, content: e.target.value})}
                    />
                </div>
            </div>

            <div className="mt-8">
                <NeonButton variant="red" onClick={onSubmitPost} className="w-full h-12 text-sm">
                    发送 // 发送
                </NeonButton>
            </div>
         </div>
      </div>

      {/* Backdrop for Drawer */}
      {isCreating && <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[50]" onClick={() => setIsCreating(false)}></div>}


      {!viewingPost ? (
        <>
          {/* --- FORUM HEADER --- */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-zinc-800 pb-4 shrink-0">
             <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
                {['全部', ...FORUM_CATEGORIES].map(cat => (
                  <button 
                    key={cat} 
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-1.5 text-xs font-bold border transition-all ${selectedCategory === cat ? 'bg-zinc-100 text-black border-zinc-100' : 'text-zinc-500 border-zinc-800 bg-black hover:border-zinc-500 hover:text-zinc-300'}`}
                  >
                    {cat}
                  </button>
                ))}
             </div>
             
             <NeonButton variant="zinc" onClick={() => setIsCreating(true)} className="flex items-center gap-2 whitespace-nowrap">
                <Plus size={14} /> 发布新帖子
             </NeonButton>
          </div>

          {/* --- POST LIST --- */}
          <div className="flex-1 min-h-0 overflow-y-auto pr-1">
             <div className="grid gap-3 pb-20">
                {filteredPosts.length === 0 && (
                    <div className="text-center py-20 text-zinc-600 text-xs tracking-widest border border-zinc-900 border-dashed">
                        暂时没有任何帖子
                    </div>
                )}
                {filteredPosts.map(post => {
                  const isOfficial = post.authorId === 99999;
                  const isNew = isRecent(post.timestamp);

                  return (
                  <div 
                      key={post.id} 
                      onClick={() => setViewingPost(post)}
                      className={`relative p-4 cursor-pointer transition-all group overflow-hidden
                        ${post.isSticky 
                            ? 'bg-red-950/10 border border-red-900/30 hover:border-red-600/50' 
                            : 'bg-zinc-900/20 border border-zinc-800 hover:bg-zinc-900/40 hover:border-zinc-600'
                        }`}
                  >
                      {/* Decorative Elements for Sticky */}
                      {post.isSticky && (
                          <div className="absolute top-0 right-0 w-4 h-4 bg-red-900/50" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%)' }}></div>
                      )}

                      <div className="flex justify-between items-start mb-2 relative z-10">
                        <div className="flex items-center gap-3 flex-wrap">
                            {isOfficial && (
                                <span className="flex items-center gap-1 bg-blue-900/50 border border-blue-700 text-blue-300 text-[9px] px-1.5 py-0.5 font-bold tracking-wider">
                                    <ShieldCheck size={8} /> 官方
                                </span>
                            )}
                            {post.isSticky && (
                                <span className="flex items-center gap-1 bg-red-900 text-red-100 text-[9px] px-1.5 py-0.5 font-bold tracking-wider">
                                    <Pin size={8} className="fill-current" /> 置顶
                                </span>
                            )}
                            {isNew && (
                                <span className="flex items-center gap-1 text-emerald-400 text-[9px] font-bold tracking-wider animate-pulse">
                                    <Zap size={8} className="fill-current" /> NEW
                                </span>
                            )}
                            <span className={`text-[10px] border px-1.5 py-0.5 ${post.isSticky ? 'border-red-900/30 text-red-400' : 'border-zinc-700 text-zinc-500'}`}>
                                {post.category}
                            </span>
                            <h4 
                                className={`text-sm font-bold transition-colors ${post.isSticky ? 'text-red-100 group-hover:text-white' : 'text-zinc-300 group-hover:text-emerald-400'}`}
                            >
                                {post.title}
                            </h4>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="text-[10px] text-zinc-600 font-mono">{new Date(post.timestamp).toLocaleDateString()}</div>
                            {currentUser?.id === post.authorId && (
                                <button 
                                    onClick={(e) => { e.stopPropagation(); handleDeletePost(post.id); }}
                                    className="relative z-20 text-zinc-600 hover:text-red-500 transition-colors p-1.5 -mr-2"
                                    title="Delete Signal"
                                >
                                    <Trash2 size={14} />
                                </button>
                            )}
                        </div>
                      </div>
                      
                      <p className="text-xs text-zinc-400 line-clamp-2 pl-1 border-l-2 border-zinc-800 group-hover:border-zinc-600 transition-colors">
                          {post.content}
                      </p>
                      
                      <div className="mt-3 flex gap-4 text-[10px] text-zinc-600 pl-1">
                        <span className="flex items-center gap-1 group-hover:text-zinc-400"><ThumbsUp size={10}/> {post.likes}</span>
                        <span className="flex items-center gap-1 group-hover:text-zinc-400"><MessageCircle size={10}/> {post.comments.length}</span>
                        {!isOfficial && <span className="font-mono">ID: {post.authorId}</span>}
                      </div>
                  </div>
                )})}
             </div>
          </div>
        </>
      ) : (
        /* --- DETAIL VIEW --- */
        <div className="h-full flex flex-col animate-fadeIn">
           <button onClick={() => setViewingPost(null)} className="flex items-center gap-2 text-zinc-500 hover:text-white mb-4 text-xs tracking-widest uppercase shrink-0">
              <ArrowLeft size={14}/> 返回
           </button>
           
           <div className="bg-black border border-zinc-700 p-6 mb-6 relative overflow-hidden shrink-0">
              <div className="absolute top-0 right-0 p-4 opacity-20">
                  <div className="text-[60px] font-orbitron font-bold text-zinc-800 leading-none">
                      {viewingPost.isSticky ? 'TOP' : 'MSG'}
                  </div>
              </div>

              <div className="relative z-10">
                <div className="flex justify-between items-start">
                    <h2 className="text-xl font-bold text-white mb-2 max-w-[80%]">{viewingPost.title}</h2>
                    {currentUser?.id === viewingPost.authorId && (
                        <button 
                            onClick={() => handleDeletePost(viewingPost.id)}
                            className="text-zinc-600 hover:text-red-500 flex items-center gap-1 text-xs border border-zinc-800 px-2 py-1 bg-zinc-900"
                        >
                            <Trash2 size={12} /> 删除
                        </button>
                    )}
                </div>
                
                <div className="flex gap-4 text-xs text-zinc-500 mb-6 border-b border-zinc-800 pb-4 font-mono">
                    <span className={viewingPost.authorId === 99999 ? 'text-blue-400 font-bold' : 'text-emerald-500 font-bold'}>
                        {viewingPost.authorId === 99999 ? '官方 (Official)' : '楼主 (OP)'}
                    </span>
                    <span>时间: {new Date(viewingPost.timestamp).toLocaleString()}</span>
                    <span className="text-zinc-400">[{viewingPost.category}]</span>
                </div>
                
                <div className="text-sm text-zinc-300 leading-relaxed min-h-[100px] whitespace-pre-wrap font-sans">
                    {viewingPost.content}
                </div>
                
                <div className="mt-6 pt-4 border-t border-zinc-800 flex justify-end">
                    <button onClick={() => handleLikePost(viewingPost.id)} className="flex items-center gap-2 text-zinc-400 hover:text-red-500 text-xs bg-zinc-900 px-3 py-1 border border-zinc-800 hover:border-red-900 transition-all">
                        <ThumbsUp size={14}/> 点赞 [{viewingPost.likes}]
                    </button>
                </div>
              </div>
           </div>

           <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2 min-h-0">
              {viewingPost.comments.length === 0 && (
                  <div className="text-center text-zinc-700 text-xs py-8">No responses intercepted yet.</div>
              )}
              {viewingPost.comments.map((comment, index) => {
                 const isOP = comment.authorId === viewingPost.authorId;
                 const floorLabel = `${index + 1}L`; // 1L, 2L, etc.

                 return (
                 <div key={comment.id} className="bg-zinc-900/30 p-4 border-l-2 border-zinc-700 ml-4 relative">
                    <div className="flex justify-between text-[10px] text-zinc-500 mb-2 font-mono">
                       <div className="flex items-center gap-2">
                           <span className={`px-1.5 py-0.5 rounded-sm ${isOP ? 'bg-emerald-900/30 text-emerald-400 border border-emerald-800' : 'bg-zinc-800 text-zinc-400'}`}>
                               {isOP ? '楼主' : floorLabel}
                           </span>
                       </div>
                       <span>{new Date(comment.timestamp).toLocaleTimeString()}</span>
                    </div>
                    <div className="text-sm text-zinc-300">{comment.content}</div>
                 </div>
              )})}
           </div>

           <div className="flex gap-2 mt-auto p-1 bg-black shrink-0">
              <input 
                className="flex-1 bg-zinc-900/50 border border-zinc-700 p-3 text-sm text-white focus:border-emerald-600 outline-none transition-colors"
                placeholder="Transmitting response..."
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
              />
              <NeonButton onClick={handleAddComment} variant="zinc">回复</NeonButton>
           </div>
        </div>
      )}
    </div>
  );
};
