import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../utils/api';

const GameContext = createContext();

export function GameProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initGame = async () => {
      try {
        // Get Telegram WebApp data
        const tg = window.Telegram?.WebApp;
        
        if (tg) {
          tg.expand();
          tg.ready();
          
          const initData = tg.initData;
          const telegramUser = tg.initDataUnsafe?.user;

          if (telegramUser) {
            // Authenticate with backend
            const authData = await api.authenticate(initData, telegramUser);
            api.setToken(authData.token);
            setUser(authData.user);
          } else {
            // Fallback for browser development
            console.warn('No Telegram user found, using dev mock');
            await devLogin();
          }
        } else {
          // Fallback for browser development
          console.warn('Telegram WebApp not found, using dev mock');
          await devLogin();
        }
      } catch (err) {
        console.error('Failed to initialize game:', err);
        setError(err.message || 'Unknown connection error');
      } finally {
        setLoading(false);
      }
    };

    const devLogin = async () => {
      // Mock user for local browser dev
      const mockUser = {
        id: '99999999', // New ID to trigger "New User" flow
        first_name: 'Fresh',
        last_name: 'Tester',
        username: 'fresh_tester_' + Math.floor(Math.random() * 1000)
      };
      const authData = await api.authenticate('dev_mode', mockUser);
      api.setToken(authData.token);
      setUser(authData.user);
    };

    initGame();
  }, []);

  // Sync function to update user state from API responses
  const updateUser = (newData) => {
    setUser(prev => ({ ...prev, ...newData }));
  };

  return (
    <GameContext.Provider value={{ user, loading, error, setError, updateUser }}>
      {children}
    </GameContext.Provider>
  );
}

export const useGame = () => useContext(GameContext);
