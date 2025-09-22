import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Contacts from './components/Contacts';
import CampaignCreator from './components/CampaignCreator';
import Reports from './components/Reports';
import Settings from './components/Settings';
import Login from './components/Login';
import Automation from './components/Automation';
import Chat from './components/Chat';
import './App.css';

export const pages = {
  DASHBOARD: 'Dashboard',
  CONTACTS: 'Contactos',
  CAMPAIGNS: 'Campañas',
  AUTOMATION: 'Automatización',
  CHAT: 'Chat',
  REPORTS: 'Reportes',
  SETTINGS: 'Ajustes'
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState(pages.DASHBOARD);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('nexus-theme');
    return savedTheme || 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('nexus-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const renderPage = () => {
    const pageComponents = {
      [pages.DASHBOARD]: <Dashboard />,
      [pages.CONTACTS]: <Contacts />,
      [pages.CAMPAIGNS]: <CampaignCreator />,
      [pages.AUTOMATION]: <Automation />,
      [pages.CHAT]: <Chat />,
      [pages.REPORTS]: <Reports />,
      [pages.SETTINGS]: <Settings theme={theme} setTheme={setTheme} />
    };

    return pageComponents[currentPage] || <Dashboard />;
  };

  if (!isLoggedIn) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900"
      >
        <Login onLogin={() => setIsLoggedIn(true)} />
      </motion.div>
    );
  }

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <Sidebar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        isCollapsed={isSidebarCollapsed}
      />
      
      <div className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
        isSidebarCollapsed ? 'ml-16' : 'ml-64'
      }`}>
        <Header 
          onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
          isSidebarCollapsed={isSidebarCollapsed}
          theme={theme}
          onToggleTheme={toggleTheme}
          currentPage={currentPage}
        />
        
        <main className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="h-full p-6 overflow-y-auto"
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default App;

