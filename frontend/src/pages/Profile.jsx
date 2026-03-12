import { useGame } from '../context/GameContext';

export default function Profile() {
  const { user } = useGame();

  if (!user) return null;

  const totalMachines = user.machines?.filter(m => m.level > 0).length || user.machines?.length || 0;
  const referralCount = Array.isArray(user.referrals) ? user.referrals.length : (user.referrals || 0);

  return (
    <div className="p-4 flex flex-col h-full min-h-screen">
      <div className="flex flex-col items-center mt-6 mb-8 text-center">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#00F0FF] to-[#B026FF] p-1 relative mb-4 shadow-[0_0_30px_rgba(176,38,255,0.3)]">
          <div className="w-full h-full bg-[#0A0D14] rounded-full flex items-center justify-center overflow-hidden">
             <img src={`https://api.dicebear.com/7.x/bottts/svg?seed=${user.username}`} alt="Avatar" className="w-20 h-20" />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-[#141923] rounded-xl border border-[#00F0FF]/50 px-2 py-0.5 shadow-lg flex items-center">
            <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse mr-1"></span>
            <span className="text-[10px] font-bold text-[#00F0FF] uppercase tracking-widest">Online</span>
          </div>
        </div>
        
        <h1 className="text-2xl font-black mb-1">{user.username}</h1>
        <p className="text-[#B026FF] neon-text-purple text-xs font-bold uppercase tracking-[0.2em] mb-3">Level {user.level} {user.title}</p>
        
        <div className="glass-card px-4 py-2 rounded-full border border-[#2D3748] flex items-center space-x-3 divide-x divide-[#2D3748]">
          <div className="flex items-center px-1">
            <span className="text-gray-400 text-xs mr-2">Status:</span>
            <span className="text-[#00F0FF] font-mono text-sm uppercase">Active Neural Link</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="glass-card p-4 rounded-2xl flex flex-col">
          <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1 flex items-center">
            <span className="mr-1 text-sm">⛏️</span> Total Mined
          </span>
          <span className="text-xl font-black text-white">{(user.totalCoinsMined || user.coins || 0).toLocaleString()}</span>
        </div>
        <div className="glass-card p-4 rounded-2xl flex flex-col">
          <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1 flex items-center">
            <span className="mr-1 text-sm">👆</span> Total Taps
          </span>
          <span className="text-xl font-black text-white">{(user.totalTaps || 0).toLocaleString()}</span>
        </div>
        <div className="glass-card p-4 rounded-2xl flex flex-col">
          <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1 flex items-center">
            <span className="mr-1 text-sm">⚡</span> Machines
          </span>
          <span className="text-xl font-black text-[#B026FF] neon-text-purple">
            {totalMachines}
          </span>
        </div>
        <div className="glass-card p-4 rounded-2xl flex flex-col">
          <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1 flex items-center">
            <span className="mr-1 text-sm">👥</span> Referrals
          </span>
          <span className="text-xl font-black text-[#00F0FF] neon-text-blue">{referralCount}</span>
        </div>
      </div>
      
      <div className="mb-24">
        <h3 className="text-lg font-black mb-3 px-1 text-gray-200">System Achievements</h3>
        <div className="space-y-3">
          <div className="glass-card p-3 rounded-xl flex items-center border border-[#00F0FF]/20 bg-[#00F0FF]/5">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00F0FF] to-[#0A0D14] p-[1px] mr-3">
              <div className="w-full h-full bg-[#141923] rounded-lg flex items-center justify-center text-lg">🏃</div>
            </div>
            <div>
              <p className="font-bold text-sm text-white">Neural Pioneer</p>
              <p className="text-[10px] text-gray-400">Successfully established neural link in the early phase.</p>
            </div>
          </div>
          
          <div className={`glass-card p-3 rounded-xl flex items-center border border-gray-800 bg-black/20 ${user.coins < 1000000 ? 'opacity-60' : ''}`}>
            <div className={`w-10 h-10 rounded-lg p-[1px] mr-3 ${user.coins < 1000000 ? 'bg-[#2D3748]' : 'bg-gradient-to-br from-[#B026FF] to-[#0A0D14]'}`}>
              <div className="w-full h-full bg-[#0A0D14] rounded-lg flex items-center justify-center text-lg">🐋</div>
            </div>
            <div>
              <p className="font-bold text-sm text-white">Neura Whale</p>
              <p className="text-[10px] text-gray-400">Reach 1,000,000 Total Mined</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
