import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Menu, 
  Search, 
  Bell, 
  Sun, 
  Moon, 
  User, 
  Settings, 
  LogOut,
  MessageSquare,
  Calendar,
  Zap
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

const Header = ({ 
  onToggleSidebar, 
  isSidebarCollapsed, 
  theme, 
  onToggleTheme, 
  currentPage 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications] = useState([
    {
      id: 1,
      title: 'Nueva campaña completada',
      message: 'La campaña "Promoción Verano" ha finalizado exitosamente',
      time: '5 min',
      type: 'success'
    },
    {
      id: 2,
      title: 'Mensaje automático enviado',
      message: '150 mensajes enviados a contactos activos',
      time: '15 min',
      type: 'info'
    },
    {
      id: 3,
      title: 'Nuevo contacto agregado',
      message: 'Juan Pérez se ha unido a tu lista de contactos',
      time: '1 h',
      type: 'default'
    }
  ]);

  const getPageTitle = () => {
    const titles = {
      'Dashboard': 'Panel de Control',
      'Contactos': 'Gestión de Contactos',
      'Campañas': 'Creador de Campañas',
      'Automatización': 'Automatización de Mensajes',
      'Chat': 'Centro de Mensajería',
      'Reportes': 'Reportes y Análisis',
      'Ajustes': 'Configuración del Sistema'
    };
    return titles[currentPage] || 'Nexus Communicator';
  };

  const getPageIcon = () => {
    const icons = {
      'Dashboard': <Zap className="w-5 h-5" />,
      'Contactos': <User className="w-5 h-5" />,
      'Campañas': <MessageSquare className="w-5 h-5" />,
      'Automatización': <Settings className="w-5 h-5" />,
      'Chat': <MessageSquare className="w-5 h-5" />,
      'Reportes': <Calendar className="w-5 h-5" />,
      'Ajustes': <Settings className="w-5 h-5" />
    };
    return icons[currentPage] || <Zap className="w-5 h-5" />;
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-border/50 flex items-center justify-between px-6 relative overflow-hidden"
    >
      {/* Gradiente de fondo sutil */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 via-transparent to-purple-50/30 dark:from-slate-800/30 dark:to-slate-700/30" />
      
      <div className="flex items-center gap-4 relative z-10">
        {/* Toggle Sidebar */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleSidebar}
          className="hover:bg-muted/50 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </Button>

        {/* Page Title */}
        <div className="flex items-center gap-3">
          <motion.div
            key={currentPage}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="text-blue-600 dark:text-blue-400"
          >
            {getPageIcon()}
          </motion.div>
          <div>
            <motion.h1
              key={currentPage}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-xl font-semibold text-foreground"
            >
              {getPageTitle()}
            </motion.h1>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex-1 max-w-md mx-8 relative z-10">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar contactos, campañas, mensajes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white/50 dark:bg-slate-800/50 border-white/30 focus:border-blue-500 transition-colors"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 relative z-10">
        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleTheme}
          className="hover:bg-muted/50 transition-colors"
        >
          <motion.div
            key={theme}
            initial={{ rotate: -180, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {theme === 'light' ? (
              <Moon className="w-5 h-5" />
            ) : (
              <Sun className="w-5 h-5" />
            )}
          </motion.div>
        </Button>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="relative hover:bg-muted/50 transition-colors">
              <Bell className="w-5 h-5" />
              {notifications.length > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold"
                >
                  {notifications.length}
                </motion.div>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex items-center justify-between">
              Notificaciones
              <Badge variant="secondary">{notifications.length}</Badge>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-64 overflow-y-auto">
              {notifications.map((notification) => (
                <DropdownMenuItem key={notification.id} className="flex-col items-start p-3 cursor-pointer">
                  <div className="flex items-start justify-between w-full">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{notification.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">{notification.message}</p>
                    </div>
                    <span className="text-xs text-muted-foreground ml-2">{notification.time}</span>
                  </div>
                </DropdownMenuItem>
              ))}
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-center text-blue-600 hover:text-blue-700">
              Ver todas las notificaciones
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="hover:bg-muted/50 transition-colors">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">Usuario Admin</p>
                <p className="text-xs text-muted-foreground">admin@nexus.com</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Perfil</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Configuración</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-red-600 hover:text-red-700">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Cerrar Sesión</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.header>
  );
};

export default Header;

