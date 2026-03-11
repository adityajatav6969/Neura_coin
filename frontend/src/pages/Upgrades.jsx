export default function Upgrades() {
  const upgrades = [
    {
      id: 'neural_speed',
      name: 'Neural Speed',
      description: 'Increases tap power by 50%',
      level: 2,
      effect: '+100% Total',
      cost: 2000,
      icon: '⚡',
      color: 'blue'
    },
    {
      id: 'quantum_nodes',
      name: 'Quantum Nodes',
      description: 'Multiplies all machine rewards by 25%',
      level: 1,
      effect: '+25% Total',
      cost: 4000,
      icon: '🌌',
      color: 'purple'
    },
    {
      id: 'ai_memory',
      name: 'AI Memory capacity',
      description: 'Increases maximum energy storage',
      level: 0,
      effect: '+0% Total',
      cost: 1000,
      icon: '🧠',
      color: 'blue'
    },
    {
      id: 'data_compression',
      name: 'Data Compression',
      description: 'Reduces energy cost per tap',
      level: 0,
      effect: '+0% Total',
      cost: 1500,
      icon: '🗜️',
      color: 'purple'
    }
  ];

  return (
    <div className="p-4 flex flex-col h-full min-h-screen">
      <div className="sticky top-0 z-20 bg-[#0A0D14]/90 backdrop-blur-md pb-4 pt-2 -mx-4 px-4 border-b border-[#2D3748]/50 mb-4">
        <h2 className="text-2xl font-black flex items-center mb-2">
           <span className="text-[#B026FF] mr-2 text-xl">🚀</span> Neural Upgrades
        </h2>
        <p className="text-xs text-gray-400">Enhance your AI capabilities to boost production and efficiency.</p>
        <div className="mt-4 flex items-center justify-between glass-card p-3 rounded-xl border-[#B026FF]/30">
           <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Available Balance</span>
           <span className="font-bold text-[#00F0FF] neon-text-blue">1,250,450 Neura</span>
        </div>
      </div>

      <div className="space-y-4 pb-28 flex-1 overflow-y-auto w-full">
        {upgrades.map((upgrade) => (
          <div key={upgrade.id} className={`glass-card p-4 rounded-2xl relative overflow-hidden transition-all duration-300 border ${
            upgrade.color === 'purple' ? 'border-[#B026FF]/30 hover:border-[#B026FF]/60' : 'border-[#00F0FF]/30 hover:border-[#00F0FF]/60'
          }`}>
            <div className={`absolute -right-10 -top-10 w-24 h-24 rounded-full blur-[40px] opacity-10 pointer-events-none ${upgrade.color === 'purple' ? 'bg-[#B026FF]' : 'bg-[#00F0FF]'}`} />
            
            <div className="flex items-start">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mr-4 shrink-0 bg-[#141923] border border-[#2D3748] shadow-inner`}>
                {upgrade.icon}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-white leading-tight">{upgrade.name}</h3>
                  <span className="text-xs font-bold bg-[#141923] px-2 py-0.5 rounded-md text-gray-400 border border-[#2D3748]">
                    Lvl {upgrade.level}
                  </span>
                </div>
                <p className="text-[10px] text-gray-400 mb-2 leading-relaxed pr-8">{upgrade.description}</p>
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-2 pt-2 border-t border-[#2D3748]/50 gap-2">
                   <div className="flex items-center text-xs">
                     <span className="text-gray-500 mr-2 uppercase tracking-widest text-[9px] font-bold">Current Effect:</span>
                     <span className={`font-bold ${upgrade.color === 'purple' ? 'text-[#B026FF]' : 'text-[#00F0FF]'}`}>
                        {upgrade.effect}
                     </span>
                   </div>
                   
                   <button className={`w-full sm:w-auto px-4 py-2 rounded-xl font-bold text-xs shadow-lg transition-transform hover:scale-105 active:scale-95 flex items-center justify-center ${
                    upgrade.color === 'purple'
                      ? 'bg-gradient-to-r from-[#9D00FF]/20 to-[#B026FF]/20 text-[#B026FF] border border-[#B026FF]/50'
                      : 'bg-gradient-to-r from-[#00D0FF]/20 to-[#00F0FF]/20 text-[#00F0FF] border border-[#00F0FF]/50'
                   }`}>
                      <span className="mr-1">Unlock</span>
                      <span>{upgrade.cost}</span>
                   </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
