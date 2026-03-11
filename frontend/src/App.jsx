import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Machines from './pages/Machines';
import Upgrades from './pages/Upgrades';
import Missions from './pages/Missions';
import Profile from './pages/Profile';
import { GameProvider } from './context/GameContext';

export default function App() {
  return (
    <GameProvider>
      <Router>
      <div className="min-h-screen text-white pb-20 max-w-md mx-auto relative shadow-2xl overflow-hidden bg-[#0A0D14]">
        {/* Main Content Area */}
        <div className="h-full z-10 relative">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/machines" element={<Machines />} />
            <Route path="/upgrades" element={<Upgrades />} />
            <Route path="/missions" element={<Missions />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
        
        {/* Bottom Navigation */}
        <Navigation />
      </div>
    </Router>
    </GameProvider>
  );
}
