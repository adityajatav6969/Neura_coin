import { useState, useEffect, useCallback } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import NeuralCore from '../components/NeuralCore';
import { useGame } from '../context/GameContext';
import { api } from '../utils/api';

export default function Home() {
  const { user, updateUser, loading, error } = useGame();
  const [taps, setTaps] = useState([]);

  const displayedEnergy = user?.energy ?? 0;
  const displayedCoins = user?.coins ?? 0;

  const handleTap = useCallback(async () => {
    if (displayedEnergy <= 0 || !user) return;

    // Optimistic UI updates
    const tapValue = user.tapPower || 1;
    updateUser({
      coins: displayedCoins + tapValue,
      energy: Math.max(0, displayedEnergy - 1),
    });

    // Create floating number effect
    const newTap = {
      id: Date.now(),
      amount: tapValue,
      x: Math.random() * 40 - 20,
      y: Math.random() * 40 - 20,
    };

    setTaps((prev) => [...prev, newTap]);
    setTimeout(() => {
      setTaps((prev) => prev.filter((t) => t.id !== newTap.id));
    }, 1000);

    try {
      // Direct API call for each tap (could be debounced/batched in future)
      const result = await api.tap();
      updateUser(result);
    } catch (err) {
      console.error('Tap failed:', err);
    }
  }, [displayedCoins, displayedEnergy, user, updateUser]);

  // Auto regenerate energy visually
  useEffect(() => {
    const timer = setInterval(() => {
      if (user && user.energy < user.maxEnergy) {
        updateUser({ energy: Math.min(user.maxEnergy, user.energy + 3) });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [user, updateUser]);

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center bg-[#0A0D14]">
        <div className="text-[#00F0FF] animate-pulse font-mono tracking-widest uppercase">
          Initializing Neural Link...
        </div>
      </div>
    );

  if (!user)
    return (
      <div className="h-screen flex items-center justify-center bg-[#0A0D14]">
        <div className="text-red-500 font-mono text-center px-4">
          <p className="mb-2">Connection Interrupted.</p>
          {error ? (
            <p className="text-xs text-gray-500 uppercase tracking-widest">{error}</p>
          ) : (
            <p className="text-xs text-gray-500 uppercase tracking-widest">
              Please open in Telegram.
            </p>
          )}
          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-4 py-2 border border-red-500/30 rounded-lg text-[10px] uppercase tracking-widest hover:bg-red-500/10 transition-colors"
          >
            Reconnect
          </button>
        </div>
      </div>
    );

  return (
    <div className="p-4 flex flex-col h-full min-h-screen">
      {/* Top Header */}
      <header className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00F0FF] to-[#B026FF] p-0.5 relative">
            <div className="w-full h-full bg-[#0A0D14] rounded-full flex items-center justify-center overflow-hidden">
              <img
                src="https://api.dicebear.com/7.x/bottts/svg?seed=Neura"
                alt="Avatar"
                className="w-8 h-8"
              />
            </div>
          </div>
          <div>
            <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
              {user.title || 'Neural Trainee'}
            </p>
            <p className="font-bold text-sm">{user.username}</p>
          </div>
        </div>
        <div className="glass-card px-3 py-1 text-xs text-[#00F0FF] font-mono neon-border rounded-full flex items-center shadow-lg shadow-[#00F0FF]/20">
          <span className="mr-2">{'\u2728'}</span> Level {user.level}
        </div>
      </header>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        <div className="glass-card p-3 flex flex-col items-center justify-center rounded-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-b from-[#00F0FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-1">Tap Power</span>
          <span className="text-xl font-bold text-[#00F0FF] neon-text-blue">{user.tapPower}</span>
        </div>
        <div className="glass-card p-3 flex flex-col items-center justify-center rounded-2xl relative overflow-hidden group border border-[#B026FF]/30 hover:border-[#B026FF]/60 transition-colors">
          <div className="absolute inset-0 bg-gradient-to-b from-[#B026FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-1">Auto Mining</span>
          <span className="text-xl font-bold text-[#B026FF] neon-text-purple">
            {user.autoMiningRate}
            <span className="text-xs text-gray-500 ml-1">/min</span>
          </span>
        </div>
        <div className="glass-card p-3 flex flex-col items-center justify-center rounded-2xl">
          <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-1">Rank</span>
          <span className="text-xl font-bold">#{user.level * 100}</span>
        </div>
      </div>

      {/* Main Balance */}
      <div className="text-center mb-2 flex flex-col items-center">
        <h1 className="text-5xl font-black mb-1 tabular-nums tracking-tight">
          {displayedCoins.toLocaleString()}
        </h1>
        <p className="text-[#00F0FF] text-sm tracking-[0.2em] font-bold uppercase mb-4 neon-text-blue">
          Neura Coin
        </p>
        <div className="glass-card px-4 py-1.5 rounded-full inline-flex items-center text-xs text-gray-300 neon-border-purple shadow-lg shadow-[#B026FF]/20">
          <span className="text-[#B026FF] mr-2">{'\u2728'}</span> Level {user.level} {user.title}
        </div>
      </div>

      {/* 3D Neural Core Area */}
      <div className="flex-1 flex flex-col justify-center items-center relative mt-4">
        {/* Glow behind core */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-[#00F0FF]/20 to-[#B026FF]/20 rounded-full blur-[60px] pointer-events-none" />

        <div className="relative w-full z-10" onClick={handleTap}>
          <NeuralCore />

          {/* Floating Tap Numbers */}
          <AnimatePresence>
            {taps.map((tap) => (
              <Motion.div
                key={tap.id}
                initial={{ opacity: 1, y: 0, scale: 0.5 }}
                animate={{ opacity: 0, y: -100, scale: 1.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="absolute top-1/2 left-1/2 text-2xl font-black text-white pointer-events-none neon-text-blue"
                style={{
                  translateX: `calc(-50% + ${tap.x}px)`,
                  translateY: `calc(-50% + ${tap.y}px)`,
                }}
              >
                +{tap.amount}
              </Motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Energy Bar */}
      <div className="mt-auto mb-6 px-4">
        <div className="flex justify-between items-center text-xs font-bold mb-2">
          <span className="text-[#00F0FF] flex items-center uppercase tracking-wider">
            <span className="font-serif italic mr-1 text-sm">{'\u26A1'}</span> Energy / Neural Power
          </span>
          <span className="text-white">
            {displayedEnergy} <span className="text-gray-500">/ {user.maxEnergy}</span>
          </span>
        </div>
        <div className="h-3 w-full bg-[#141923] rounded-full overflow-hidden border border-[#2D3748]">
          <div
            className="h-full bg-gradient-to-r from-[#00F0FF] to-[#B026FF] transition-all duration-300 relative shadow-[0_0_10px_rgba(0,240,255,0.5)]"
            style={{ width: `${(displayedEnergy / user.maxEnergy) * 100}%` }}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse" />
          </div>
        </div>
        <p className="text-[10px] text-center mt-3 text-gray-500 uppercase tracking-widest font-medium">
          Tap the core to train neurons
        </p>
      </div>
    </div>
  );
}
