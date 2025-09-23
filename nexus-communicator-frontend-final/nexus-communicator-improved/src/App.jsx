import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthProvider, useAuth } from './context/AuthContext';
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

const AppContent = () => {
  const { isAuthenticated, loading } = useAuth();
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300`}>
      <div className="flex h-screen overflow-hidden">
        <Sidebar 
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          isCollapsed={isSidebarCollapsed}
          setIsCollapsed={setIsSidebarCollapsed}
        />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header 
            currentPage={currentPage}
            theme={theme}
            toggleTheme={toggleTheme}
            isSidebarCollapsed={isSidebarCollapsed}
            setIsSidebarCollapsed={setIsSidebarCollapsed}
          />
          
          <main className="flex-1 overflow-auto p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                {renderPage()}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;

