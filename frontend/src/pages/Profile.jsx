export default function Profile() {
  return (
    <div className="p-4 flex flex-col h-full min-h-screen">
      <div className="flex flex-col items-center mt-6 mb-8 text-center">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#00F0FF] to-[#B026FF] p-1 relative mb-4 shadow-[0_0_30px_rgba(176,38,255,0.3)]">
          <div className="w-full h-full bg-[#0A0D14] rounded-full flex items-center justify-center overflow-hidden">
             <img src="https://api.dicebear.com/7.x/bottts/svg?seed=Neura" alt="Avatar" className="w-20 h-20" />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-[#141923] rounded-xl border border-[#00F0FF]/50 px-2 py-0.5 shadow-lg flex items-center">
            <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse mr-1"></span>
            <span className="text-[10px] font-bold text-[#00F0FF] uppercase tracking-widest">Online</span>
          </div>
        </div>
        
        <h1 className="text-2xl font-black mb-1">Alex_Neura</h1>
        <p className="text-[#B026FF] neon-text-purple text-xs font-bold uppercase tracking-[0.2em] mb-3">Level 7 AI Architect</p>
        
        <div className="glass-card px-4 py-2 rounded-full border border-[#2D3748] flex items-center space-x-3 divide-x divide-[#2D3748]">
          <div className="flex items-center px-1">
            <span className="text-gray-400 text-xs mr-2">Wallet:</span>
            <span className="text-[#00F0FF] font-mono text-sm">0x12ab...4F2b</span>
          </div>
          <div className="pl-3 pr-1 text-xs text-gray-400 font-bold uppercase cursor-pointer hover:text-white transition-colors">
            Copy
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="glass-card p-4 rounded-2xl flex flex-col">
          <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1 flex items-center">
            <span className="mr-1 text-sm">⛏️</span> Total Mined
          </span>
          <span className="text-xl font-black text-white">4,250,450</span>
        </div>
        <div className="glass-card p-4 rounded-2xl flex flex-col">
          <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1 flex items-center">
            <span className="mr-1 text-sm">👆</span> Total Taps
          </span>
          <span className="text-xl font-black text-white">45,210</span>
        </div>
        <div className="glass-card p-4 rounded-2xl flex flex-col">
          <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1 flex items-center">
            <span className="mr-1 text-sm">⚡</span> Machines
          </span>
          <span className="text-xl font-black text-[#B026FF] neon-text-purple">12</span>
        </div>
        <div className="glass-card p-4 rounded-2xl flex flex-col">
          <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1 flex items-center">
            <span className="mr-1 text-sm">👥</span> Referrals
          </span>
          <span className="text-xl font-black text-[#00F0FF] neon-text-blue">34</span>
        </div>
      </div>
      
      <div className="mb-24">
        <h3 className="text-lg font-black mb-3 px-1 text-gray-200">Achievements</h3>
        <div className="space-y-3">
          <div className="glass-card p-3 rounded-xl flex items-center border border-[#00F0FF]/20 bg-[#00F0FF]/5">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00F0FF] to-[#0A0D14] p-[1px] mr-3">
              <div className="w-full h-full bg-[#141923] rounded-lg flex items-center justify-center text-lg">🏃</div>
            </div>
            <div>
              <p className="font-bold text-sm text-white">Early Adopter</p>
              <p className="text-[10px] text-gray-400">Joined in the first week of launch</p>
            </div>
          </div>
          
          <div className="glass-card p-3 rounded-xl flex items-center border border-gray-800 bg-black/20 opacity-60">
            <div className="w-10 h-10 rounded-lg bg-[#2D3748] p-[1px] mr-3">
              <div className="w-full h-full bg-[#0A0D14] rounded-lg flex items-center justify-center text-lg grayscale">🐋</div>
            </div>
            <div>
              <p className="font-bold text-sm text-gray-400">Neura Whale</p>
              <p className="text-[10px] text-gray-500">Reach 10,000,000 Total Mined</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
