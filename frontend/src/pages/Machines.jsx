import { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { api } from '../utils/api';

export default function Machines() {
  const { user, updateUser } = useGame();
  const [purchasing, setPurchasing] = useState(null);

  // Define machine metadata (visuals)
  const machineMetadata = {
    'neural_miner': { icon: '🏛️', color: 'blue' },
    'quantum_processor': { icon: '📈', color: 'purple' },
    'ai_data_farm': { icon: '🧬', color: 'blue' },
    'neural_supercomputer': { icon: '🖥️', color: 'purple' }
  };

  const handleBuyOrUpgrade = async (machineId, isUpdate = true) => {
    if (purchasing) return;
    setPurchasing(machineId);
    try {
      let result;
      if (isUpdate) {
        result = await api.upgradeMachine(machineId);
      } else {
        result = await api.buyMachine(machineId);
      }
      updateUser(result.user);
    } catch (err) {
      console.error('Machine action failed:', err);
      alert(err.message);
    } finally {
      setPurchasing(null);
    }
  };

  if (!user) return null;

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
                <p className="font-black text-xl leading-none">{user.coins.toLocaleString()}</p>
                <span className="text-[#00F0FF] text-[10px] ml-1.5 font-bold uppercase tracking-wider neon-text-blue">Neura</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-0.5">Total Mining</p>
            <p className="font-bold text-[#B026FF] neon-text-purple flex items-center justify-end text-sm">
              <span className="mr-1">⚡</span> {user.autoMiningRate}/min
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
        {user.machines.map((machine) => {
          const meta = machineMetadata[machine.id] || { icon: '⚙️', color: 'blue' };
          const isOwned = machine.level > 0;
          
          return (
            <div 
              key={machine.id}
              className={`glass-card p-4 rounded-2xl relative overflow-hidden transition-all duration-300 border ${
                meta.color === 'purple' 
                  ? 'border-[#B026FF]/30 hover:shadow-[0_0_20px_rgba(176,38,255,0.15)]' 
                  : 'border-[#00F0FF]/30 hover:shadow-[0_0_20px_rgba(0,240,255,0.15)]'
              }`}
            >
              {/* Background Glow */}
              <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full blur-[40px] opacity-20 pointer-events-none ${meta.color === 'purple' ? 'bg-[#B026FF]' : 'bg-[#00F0FF]'}`} />
              
              <div className="flex items-center justify-between relative z-10 w-full">
                <div className="flex items-center">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mr-4 bg-[#141923] border border-[#2D3748]`}>
                    {meta.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1 leading-tight">{machine.name}</h3>
                    <div className="flex items-center text-xs">
                      <span className="text-gray-400 mr-2">Level {machine.level} •</span>
                      <span className={`${meta.color === 'purple' ? 'text-[#B026FF]' : 'text-[#00F0FF]'} font-bold`}>
                        +{machine.production}/min
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end">
                   <button 
                     onClick={() => handleBuyOrUpgrade(machine.id, isOwned)}
                     disabled={purchasing === machine.id || user.coins < machine.nextCost}
                     className={`px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg transition-transform hover:scale-105 active:scale-95 ${
                     meta.color === 'purple'
                       ? 'bg-gradient-to-r from-[#9D00FF] to-[#B026FF] shadow-[#B026FF]/20 text-white'
                       : 'bg-gradient-to-r from-[#00D0FF] to-[#00F0FF] text-[#0A0D14] shadow-[#00F0FF]/20'
                    } disabled:opacity-50 disabled:scale-100`}>
                    <span className="flex items-center">
                      <span className="mr-1 leading-none text-lg">↑</span> {purchasing === machine.id ? 'Wait...' : isOwned ? 'Upgrade' : 'Buy'}
                    </span>
                  </button>
                  <span className="text-[10px] text-gray-500 font-bold mt-1">
                    {machine.nextCost.toLocaleString()} Neura
                  </span>
                </div>
              </div>
            </div>
          );
        })}
        
        {/* Terminal decorative section */}
        <div className="mt-8 relative border border-[#2D3748] rounded-xl overflow-hidden glass-card h-40">
           <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#00F0FF]/20 via-[#0A0D14]/80 to-[#0A0D14] opacity-50"></div>
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
