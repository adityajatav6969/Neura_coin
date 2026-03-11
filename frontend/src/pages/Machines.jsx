export default function Machines() {
  const machines = [
    {
      id: 'neural_miner',
      name: 'Neural Miner',
      level: 1,
      production: '+20/min',
      cost: 5000,
      icon: '🏛️',
      color: 'blue'
    },
    {
      id: 'quantum_processor',
      name: 'Quantum Processor',
      level: 1,
      production: '+100/min',
      cost: 20000,
      icon: '📈',
      color: 'purple'
    },
    {
      id: 'ai_data_farm',
      name: 'AI Data Farm',
      level: 1,
      production: '+500/min',
      cost: 100000,
      icon: '🧬',
      color: 'blue'
    },
    {
      id: 'neural_supercomputer',
      name: 'Neural Supercomputer',
      level: 0,
      production: '+3000/min',
      cost: 1000000,
      icon: '🖥️',
      locked: true
    }
  ];

  return (
    <div className="p-4 flex flex-col h-full min-h-screen">
      {/* Header Sticky */}
      <div className="sticky top-0 z-20 bg-[#0A0D14]/90 backdrop-blur-md pb-4 pt-2 -mx-4 px-4 border-b border-[#2D3748]/50">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00F0FF]/20 to-[#00F0FF]/5 flex items-center justify-center border border-[#00F0FF]/30 mr-3 shadow-[0_0_15px_rgba(0,240,255,0.15)]">
               <span className="text-xl">💳</span>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-0.5">Balance</p>
              <div className="flex items-baseline">
                <p className="font-black text-xl leading-none">1,250,450</p>
                <span className="text-[#00F0FF] text-[10px] ml-1.5 font-bold uppercase tracking-wider neon-text-blue">Neura</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-0.5">Global Hashrate</p>
            <p className="font-bold text-[#B026FF] neon-text-purple flex items-center justify-end text-sm">
              <span className="mr-1">⚡</span> 3,250/hr
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-black flex items-center mb-2">
            <span className="text-[#00F0FF] mr-2 text-xl">⚙️</span> AI Mining Machines
          </h2>
          <p className="text-xs text-gray-400">Deploy and upgrade neural hardware to increase your yield.</p>
        </div>
      </div>

      {/* Machine List */}
      <div className="space-y-4 py-4 pb-28 flex-1 overflow-y-auto w-full">
        {machines.map((machine) => (
          <div 
            key={machine.id}
            className={`glass-card p-4 rounded-2xl relative overflow-hidden transition-all duration-300 ${
              machine.locked 
                ? 'opacity-50 grayscale border-[#2D3748] bg-black/40' 
                : machine.color === 'purple' 
                  ? 'border-[#B026FF]/30 hover:shadow-[0_0_20px_rgba(176,38,255,0.15)]' 
                  : 'border-[#00F0FF]/30 hover:shadow-[0_0_20px_rgba(0,240,255,0.15)]'
            }`}
          >
            {/* Background Glow */}
            {!machine.locked && (
              <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full blur-[40px] opacity-20 pointer-events-none ${machine.color === 'purple' ? 'bg-[#B026FF]' : 'bg-[#00F0FF]'}`} />
            )}
            
            <div className="flex items-center justify-between relative z-10 w-full">
              <div className="flex items-center">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mr-4 ${
                  machine.locked ? 'bg-gray-800' : 'bg-[#141923] border border-[#2D3748]'
                }`}>
                  {machine.icon}
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1 leading-tight">{machine.name}</h3>
                  <div className="flex items-center text-xs">
                    {machine.locked ? (
                      <span className="text-gray-500 font-medium">Locked</span>
                    ) : (
                      <>
                        <span className="text-gray-400 mr-2">Level {machine.level} •</span>
                        <span className={`${machine.color === 'purple' ? 'text-[#B026FF]' : 'text-[#00F0FF]'} font-bold`}>
                          {machine.production}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {machine.locked ? (
                <div className="flex flex-col items-center justify-center bg-black/50 px-4 py-2 rounded-xl border border-white/5">
                  <span className="text-white mb-1">🔒</span>
                  <span className="text-[9px] font-black uppercase text-gray-500 tracking-wider">
                    {machine.cost / 1000000}M Neura
                  </span>
                </div>
              ) : (
                <button className={`px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg transition-transform hover:scale-105 active:scale-95 ${
                  machine.color === 'purple'
                    ? 'bg-gradient-to-r from-[#9D00FF] to-[#B026FF] shadow-[#B026FF]/20'
                    : 'bg-gradient-to-r from-[#00D0FF] to-[#00F0FF] text-[#0A0D14] shadow-[#00F0FF]/20'
                }`}>
                  <span className="flex items-center">
                    <span className="mr-1 leading-none text-lg">↑</span> Upgrade
                  </span>
                </button>
              )}
            </div>
            
            {/* Embedded status decorative element */}
            {!machine.locked && (
                <div className="absolute bottom-0 right-0 left-0 h-1 bg-gradient-to-r from-transparent via-[#00F0FF]/10 to-transparent"></div>
            )}
          </div>
        ))}
        
        {/* Terminal decorative section */}
        <div className="mt-8 relative border border-[#2D3748] rounded-xl overflow-hidden glass-card h-40">
           {/* Abstract neural net image bg for terminal */}
           <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#00F0FF]/20 via-[#0A0D14]/80 to-[#0A0D14] opacity-50"></div>
           <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
              {Array.from({length: 40}).map((_, i) => (
                  <circle key={`dot-${i}`} cx={Math.random()*100 + "%"} cy={Math.random()*100 + "%"} r="1" fill="#00F0FF" />
              ))}
              {Array.from({length: 20}).map((_, i) => (
                  <line key={`line-${i}`} 
                        x1={Math.random()*100 + "%"} y1={Math.random()*100 + "%"} 
                        x2={Math.random()*100 + "%"} y2={Math.random()*100 + "%"} 
                        stroke="#00F0FF" strokeWidth="0.5" opacity="0.5" />
              ))}
           </svg>
           
           <div className="absolute bottom-3 left-4 filter drop-shadow-md">
             <div className="flex items-center mb-1">
               <div className="w-2 h-2 rounded-full bg-[#00F0FF] mr-2 animate-pulse" />
               <span className="text-[10px] text-[#00F0FF] font-mono tracking-widest opacity-80 uppercase">Hardware_Status: Optimal</span>
             </div>
             <div className="flex items-center">
               <div className="w-2 h-2 rounded-full bg-[#00F0FF] mr-2 animate-pulse" style={{animationDelay: "0.5s"}} />
               <span className="text-[10px] text-gray-500 font-mono tracking-widest opacity-60 uppercase">Syst_Log: Neural_Link_Stable</span>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
