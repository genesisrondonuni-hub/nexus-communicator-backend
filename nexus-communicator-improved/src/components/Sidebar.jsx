import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Users, 
  Megaphone, 
  Bot, 
  MessageCircle, 
  BarChart3, 
  Settings,
  ChevronRight
} from 'lucide-react';
import { pages } from '../App';

const Sidebar = ({ currentPage, setCurrentPage, isCollapsed }) => {
  const menuItems = [
    {
      id: pages.DASHBOARD,
      label: 'Dashboard',
      icon: LayoutDashboard,
      color: 'from-blue-500 to-blue-600',
      notifications: 0
    },
    {
      id: pages.CONTACTS,
      label: 'Contactos',
      icon: Users,
      color: 'from-green-500 to-green-600',
      notifications: 3
    },
    {
      id: pages.CAMPAIGNS,
      label: 'Campañas',
      icon: Megaphone,
      color: 'from-purple-500 to-purple-600',
      notifications: 1
    },
    {
      id: pages.AUTOMATION,
      label: 'Automatización',
      icon: Bot,
      color: 'from-orange-500 to-orange-600',
      notifications: 0
    },
    {
      id: pages.CHAT,
      label: 'Chat',
      icon: MessageCircle,
      color: 'from-pink-500 to-pink-600',
      notifications: 7
    },
    {
      id: pages.REPORTS,
      label: 'Reportes',
      icon: BarChart3,
      color: 'from-indigo-500 to-indigo-600',
      notifications: 0
    },
    {
      id: pages.SETTINGS,
      label: 'Ajustes',
      icon: Settings,
      color: 'from-gray-500 to-gray-600',
      notifications: 0
    }
  ];

  const sidebarVariants = {
    expanded: {
      width: 256,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    collapsed: {
      width: 64,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const itemVariants = {
    expanded: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.2,
        delay: 0.1
      }
    },
    collapsed: {
      opacity: 0,
      x: -20,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <motion.div
      variants={sidebarVariants}
      animate={isCollapsed ? "collapsed" : "expanded"}
      className="fixed left-0 top-0 h-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-r border-border/50 z-40 shadow-xl"
    >
      {/* Logo */}
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur-sm opacity-30"
            />
            <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
          </div>
          
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                variants={itemVariants}
                initial="collapsed"
                animate="expanded"
                exit="collapsed"
                className="overflow-hidden"
              >
                <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Nexus
                </h1>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <motion.button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                isActive 
                  ? 'bg-gradient-to-r ' + item.color + ' text-white shadow-lg' 
                  : 'hover:bg-muted/50 text-muted-foreground hover:text-foreground'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Efecto de hover */}
              {!isActive && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  layoutId="hoverEffect"
                />
              )}

              {/* Icono */}
              <div className="relative z-10 flex-shrink-0">
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : ''}`} />
              </div>

              {/* Label y notificaciones */}
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.div
                    variants={itemVariants}
                    initial="collapsed"
                    animate="expanded"
                    exit="collapsed"
                    className="flex items-center justify-between flex-1 overflow-hidden"
                  >
                    <span className={`font-medium ${isActive ? 'text-white' : ''}`}>
                      {item.label}
                    </span>
                    
                    {item.notifications > 0 && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
                      >
                        {item.notifications > 9 ? '9+' : item.notifications}
                      </motion.div>
                    )}
                    
                    {isActive && (
                      <ChevronRight className="w-4 h-4 text-white/70" />
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Indicador de notificaciones para sidebar colapsada */}
              {isCollapsed && item.notifications > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold"
                >
                  {item.notifications > 9 ? '9' : item.notifications}
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="absolute bottom-4 left-4 right-4">
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              variants={itemVariants}
              initial="collapsed"
              animate="expanded"
              exit="collapsed"
              className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-700 p-3 rounded-xl border border-border/50"
            >
              <div className="text-xs text-muted-foreground text-center">
                <p className="font-medium">Nexus Communicator</p>
                <p>v2.0.0</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Sidebar;

