import { NavLink } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';

export default function Navigation() {
  const tabs = [
    { name: 'Home', path: '/', icon: '\u{1F3E0}' },
    { name: 'Machines', path: '/machines', icon: '\u26A1' },
    { name: 'Upgrades', path: '/upgrades', icon: '\u{1F680}' },
    { name: 'Missions', path: '/missions', icon: '\u{1F3AF}' },
    { name: 'Profile', path: '/profile', icon: '\u{1F464}' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-50">
      <div className="glass-card m-2 mx-4 rounded-2xl flex justify-between items-center px-2 py-3">
        {tabs.map((tab) => (
          <NavLink
            key={tab.name}
            to={tab.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-full relative ${
                isActive ? 'text-[#00F0FF]' : 'text-gray-500'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span className="text-xl mb-1 z-10">{tab.icon}</span>
                <span className="text-[10px] font-bold tracking-widest uppercase z-10">
                  {tab.name}
                </span>

                {/* Active Indicator Background */}
                {isActive && (
                  <Motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-[#00F0FF]/10 rounded-xl neon-border z-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
}
