import { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { api } from '../utils/api';

export default function Missions() {
  const { user, updateUser } = useGame();
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [claiming, setClaiming] = useState(null);

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        const data = await api.getMissions();
        // Backend returns { missions: [...] }
        setMissions(data.missions || data || []);
      } catch (err) {
        console.error('Failed to fetch missions:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMissions();
  }, []);

  const handleClaim = async (missionId) => {
    if (claiming) return;
    setClaiming(missionId);
    try {
      const result = await api.completeMission(missionId);
      updateUser(result);
      // Refresh mission list
      const data = await api.getMissions();
      setMissions(data.missions || data || []);
    } catch (err) {
      console.error('Claim failed:', err);
      alert(err.message);
    } finally {
      setClaiming(null);
    }
  };

  if (loading) return (
    <div className="p-4 flex flex-col items-center justify-center h-64">
      <div className="text-[#00F0FF] animate-pulse">🎯 Loading Missions...</div>
    </div>
  );

  return (
    <div className="p-4 flex flex-col h-full min-h-screen">
      <div className="sticky top-0 z-20 bg-[#0A0D14]/90 backdrop-blur-md pb-4 pt-2 -mx-4 px-4 border-b border-[#2D3748]/50 mb-4">
        <h2 className="text-2xl font-black flex items-center mb-2">
           <span className="text-[#00F0FF] mr-2 text-xl">🎯</span> Next-Gen Missions
        </h2>
        <p className="text-xs text-gray-400">Complete daily tasks and special assignments for massive coin injections.</p>
      </div>

      <div className="space-y-4 pb-28 flex-1 overflow-y-auto w-full">
        {missions.map((mission) => {
          const percentage = Math.min(100, (mission.progress / mission.target) * 100);
          const canClaim = mission.progress >= mission.target && !mission.completed;
          
          return (
            <div key={mission.missionId} className={`glass-card p-4 rounded-2xl relative transition-all duration-300 ${
              mission.completed ? 'border-[#00F0FF]/50 shadow-[0_0_15px_rgba(0,240,255,0.1)]' : 'border-[#2D3748]/50'
            }`}>
              {mission.completed && (
                 <div className="absolute inset-0 bg-gradient-to-r from-[#00F0FF]/5 to-transparent rounded-2xl pointer-events-none" />
              )}
              
              <div className="flex items-center mb-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl mr-3 shrink-0 ${
                  mission.completed ? 'bg-[#00F0FF]/20 border border-[#00F0FF]/50' : 'bg-[#141923] border border-[#2D3748]'
                }`}>
                  {mission.icon || (mission.type === 'tap' ? '👆' : mission.type === 'machine' ? '⚙️' : '👥')}
                </div>
                <div className="flex-1">
                  <h3 className={`font-bold leading-tight ${mission.completed ? 'text-[#00F0FF]' : 'text-white'}`}>
                    {mission.title}
                  </h3>
                  <p className="text-[10px] text-gray-400">{mission.description}</p>
                </div>
                <div className="text-right ml-2 shrink-0">
                  <p className="text-[#00F0FF] font-black neon-text-blue text-sm">+{mission.reward}</p>
                  <p className="text-[9px] text-gray-500 uppercase tracking-widest font-bold">Reward</p>
                </div>
              </div>
              
              <div className="pt-2">
                <div className="flex justify-between items-center text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-1">
                  <span>Progress</span>
                  <span className={mission.completed ? 'text-[#00F0FF]' : 'text-white'}>
                    {mission.progress} / {mission.target}
                  </span>
                </div>
                <div className="h-2 w-full bg-[#141923] rounded-full overflow-hidden border border-[#2D3748]">
                  <div 
                    className={`h-full transition-all duration-500 ${
                      mission.completed || canClaim ? 'bg-[#00F0FF] shadow-[0_0_10px_rgba(0,240,255,0.8)]' : 'bg-gray-600'
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                
                {canClaim && (
                  <button 
                    onClick={() => handleClaim(mission.missionId)}
                    disabled={claiming === mission.missionId}
                    className="w-full mt-3 py-2 bg-[#00F0FF] text-[#0A0D14] font-black text-xs uppercase tracking-widest rounded-lg hover:bg-[#00D0FF] transition-colors relative overflow-hidden disabled:opacity-50"
                  >
                     <span className="relative z-10">{claiming === mission.missionId ? 'Claiming...' : 'Claim Reward'}</span>
                     <div className="absolute inset-0 bg-white/20 animate-pulse" />
                  </button>
                )}

                {mission.completed && (
                  <div className="w-full mt-3 py-2 text-center text-[#00F0FF] font-black text-[10px] uppercase tracking-widest bg-[#00F0FF]/10 rounded-lg border border-[#00F0FF]/30">
                    Mission Accomplished
                  </div>
                )}
                
                {!mission.completed && !canClaim && (
                   <div className="w-full mt-3 py-2 text-center text-gray-500 font-bold text-[9px] uppercase tracking-widest bg-[#141923] rounded-lg border border-[#2D3748]">
                     In Progress
                   </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
