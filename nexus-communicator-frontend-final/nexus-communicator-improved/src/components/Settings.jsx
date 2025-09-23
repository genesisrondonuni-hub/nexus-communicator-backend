import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import {
  Settings as SettingsIcon,
  User,
  Key,
  Bell,
  Shield,
  Monitor,
  Save,
  Eye,
  EyeOff,
  Bot,
  Brain,
  Activity,
  MessageSquare,
  Mail,
  Smartphone,
  Globe,
  Clock,
  Palette,
  LogOut
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import ApiService from '../services/api';

const Settings = ({ theme, setTheme }) => {
  const { user, updateUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [showApiKeys, setShowApiKeys] = useState({
    whatsapp: false,
    gmail: false,
    gemini: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  
  // Estados para los formularios
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    company: ''
  });
  
  const [apiKeys, setApiKeys] = useState({
    whatsapp_api_key: '',
    gmail_api_key: '',
    gemini_api_key: ''
  });
  
  const [automationSettings, setAutomationSettings] = useState({
    gemini_auto_reply_enabled: false,
    gemini_knowledge_base: ''
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    email_notifications: true,
    push_notifications: true,
    sms_notifications: false
  });
  
  const [privacySettings, setPrivacySettings] = useState({
    profile_visible: true,
    data_sharing: false,
    analytics: true
  });
  
  const [systemSettings, setSystemSettings] = useState({
    language: 'es',
    timezone: 'Europe/Madrid',
    theme: 'light'
  });

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        company: user.company || ''
      });
      
      setApiKeys({
        whatsapp_api_key: user.whatsapp_api_key || '',
        gmail_api_key: user.gmail_api_key || '',
        gemini_api_key: user.gemini_api_key || ''
      });
      
      setAutomationSettings({
        gemini_auto_reply_enabled: user.gemini_auto_reply_enabled || false,
        gemini_knowledge_base: user.gemini_knowledge_base || ''
      });
      
      setNotificationSettings({
        email_notifications: user.email_notifications !== undefined ? user.email_notifications : true,
        push_notifications: user.push_notifications !== undefined ? user.push_notifications : true,
        sms_notifications: user.sms_notifications !== undefined ? user.sms_notifications : false
      });
      
      setPrivacySettings({
        profile_visible: user.profile_visible !== undefined ? user.profile_visible : true,
        data_sharing: user.data_sharing !== undefined ? user.data_sharing : false,
        analytics: user.analytics !== undefined ? user.analytics : true
      });
      
      setSystemSettings({
        language: user.language || 'es',
        timezone: user.timezone || 'Europe/Madrid',
        theme: user.theme || 'light'
      });
    }
  }, [user]);

  const handleSave = async () => {
    setIsLoading(true);
    setMessage('');
    
    try {
      const updateData = {
        ...profileData,
        ...apiKeys,
        ...automationSettings,
        ...notificationSettings,
        ...privacySettings,
        ...systemSettings
      };
      
      const response = await ApiService.updateProfile(updateData);
      updateUser(response.user);
      setMessage('Configuración guardada exitosamente');
      
      // Actualizar tema si cambió
      if (systemSettings.theme !== theme) {
        setTheme(systemSettings.theme);
      }
      
    } catch (error) {
      setMessage('Error al guardar la configuración: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const tabs = [
    { id: 'profile', label: 'Perfil', icon: User },
    { id: 'api', label: 'API Keys', icon: Key },
    { id: 'automation', label: 'Automatización', icon: Bot },
    { id: 'notifications', label: 'Notificaciones', icon: Bell },
    { id: 'privacy', label: 'Privacidad', icon: Shield },
    { id: 'system', label: 'Sistema', icon: Monitor }
  ];

  const TabButton = ({ tab, isActive, onClick }) => (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`flex items-center gap-3 w-full p-3 rounded-lg text-left transition-colors ${
        isActive 
          ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300' 
          : 'hover:bg-gray-100 dark:hover:bg-gray-800'
      }`}
    >
      <tab.icon className="w-5 h-5" />
      <span className="font-medium">{tab.label}</span>
    </motion.button>
  );

  const renderProfileTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Nombre Completo</label>
          <Input
            value={profileData.name}
            onChange={(e) => setProfileData({...profileData, name: e.target.value})}
            placeholder="Tu nombre completo"
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">Email</label>
          <Input
            value={profileData.email}
            onChange={(e) => setProfileData({...profileData, email: e.target.value})}
            placeholder="tu@ejemplo.com"
            type="email"
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">Teléfono</label>
          <Input
            value={profileData.phone}
            onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
            placeholder="+34 612 345 678"
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">Empresa</label>
          <Input
            value={profileData.company}
            onChange={(e) => setProfileData({...profileData, company: e.target.value})}
            placeholder="Tu empresa"
          />
        </div>
      </div>
    </div>
  );

  const renderApiTab = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            WhatsApp API Key
          </label>
          <div className="relative">
            <Input
              type={showApiKeys.whatsapp ? "text" : "password"}
              value={apiKeys.whatsapp_api_key}
              onChange={(e) => setApiKeys({...apiKeys, whatsapp_api_key: e.target.value})}
              placeholder="Ingresa tu WhatsApp API Key"
            />
            <button
              type="button"
              onClick={() => setShowApiKeys({...showApiKeys, whatsapp: !showApiKeys.whatsapp})}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              {showApiKeys.whatsapp ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Gmail API Key
          </label>
          <div className="relative">
            <Input
              type={showApiKeys.gmail ? "text" : "password"}
              value={apiKeys.gmail_api_key}
              onChange={(e) => setApiKeys({...apiKeys, gmail_api_key: e.target.value})}
              placeholder="Ingresa tu Gmail API Key"
            />
            <button
              type="button"
              onClick={() => setShowApiKeys({...showApiKeys, gmail: !showApiKeys.gmail})}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              {showApiKeys.gmail ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block flex items-center gap-2">
            <Brain className="w-4 h-4" />
            Gemini API Key
          </label>
          <div className="relative">
            <Input
              type={showApiKeys.gemini ? "text" : "password"}
              value={apiKeys.gemini_api_key}
              onChange={(e) => setApiKeys({...apiKeys, gemini_api_key: e.target.value})}
              placeholder="Ingresa tu Gemini API Key"
            />
            <button
              type="button"
              onClick={() => setShowApiKeys({...showApiKeys, gemini: !showApiKeys.gemini})}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              {showApiKeys.gemini ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAutomationTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="w-5 h-5" />
            Configuración General
          </CardTitle>
          <CardDescription>
            Configura tu agente de IA para responder mensajes automáticamente
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium">Activar respuestas automáticas</label>
              <p className="text-xs text-muted-foreground">
                Cuando está activado, el Bot responderá a los mensajes de los contactos que tengan la opción habilitada
              </p>
            </div>
            <Switch
              checked={automationSettings.gemini_auto_reply_enabled}
              onCheckedChange={(checked) => setAutomationSettings({...automationSettings, gemini_auto_reply_enabled: checked})}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            Base de Conocimiento del Agente
          </CardTitle>
          <CardDescription>
            Proporciona toda la información relevante sobre tu negocio para que Gemini pueda responder con precisión
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            value={automationSettings.gemini_knowledge_base}
            onChange={(e) => setAutomationSettings({...automationSettings, gemini_knowledge_base: e.target.value})}
            placeholder="Incluye detalles sobre productos, servicios, horarios, políticas, preguntas frecuentes, etc."
            rows={8}
            className="resize-none"
          />
          <p className="text-xs text-muted-foreground mt-2">
            Incluye detalles sobre productos, servicios, horarios, políticas, preguntas frecuentes, etc.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Actividad Reciente del Bot
          </CardTitle>
          <CardDescription>
            Monitoreo de las acciones del agente de IA
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <span className="text-sm">No hay actividad reciente</span>
              <Badge variant="outline">Inactivo</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-blue-600" />
            <div>
              <label className="text-sm font-medium">Notificaciones por Email</label>
              <p className="text-xs text-muted-foreground">Recibir notificaciones importantes por correo</p>
            </div>
          </div>
          <Switch
            checked={notificationSettings.email_notifications}
            onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, email_notifications: checked})}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 text-green-600" />
            <div>
              <label className="text-sm font-medium">Notificaciones Push</label>
              <p className="text-xs text-muted-foreground">Notificaciones en tiempo real en el navegador</p>
            </div>
          </div>
          <Switch
            checked={notificationSettings.push_notifications}
            onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, push_notifications: checked})}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Smartphone className="w-5 h-5 text-purple-600" />
            <div>
              <label className="text-sm font-medium">Notificaciones SMS</label>
              <p className="text-xs text-muted-foreground">Recibir alertas críticas por SMS</p>
            </div>
          </div>
          <Switch
            checked={notificationSettings.sms_notifications}
            onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, sms_notifications: checked})}
          />
        </div>
      </div>
    </div>
  );

  const renderPrivacyTab = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium">Perfil Visible</label>
            <p className="text-xs text-muted-foreground">Permitir que otros usuarios vean tu perfil</p>
          </div>
          <Switch
            checked={privacySettings.profile_visible}
            onCheckedChange={(checked) => setPrivacySettings({...privacySettings, profile_visible: checked})}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium">Compartir Datos</label>
            <p className="text-xs text-muted-foreground">Compartir datos anónimos para mejorar el servicio</p>
          </div>
          <Switch
            checked={privacySettings.data_sharing}
            onCheckedChange={(checked) => setPrivacySettings({...privacySettings, data_sharing: checked})}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium">Analytics</label>
            <p className="text-xs text-muted-foreground">Permitir recopilación de datos de uso</p>
          </div>
          <Switch
            checked={privacySettings.analytics}
            onCheckedChange={(checked) => setPrivacySettings({...privacySettings, analytics: checked})}
          />
        </div>
      </div>
    </div>
  );

  const renderSystemTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block flex items-center gap-2">
            <Globe className="w-4 h-4" />
            Idioma
          </label>
          <select
            value={systemSettings.language}
            onChange={(e) => setSystemSettings({...systemSettings, language: e.target.value})}
            className="w-full p-2 border rounded-md bg-background"
          >
            <option value="es">Español</option>
            <option value="en">English</option>
            <option value="fr">Français</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Zona Horaria
          </label>
          <select
            value={systemSettings.timezone}
            onChange={(e) => setSystemSettings({...systemSettings, timezone: e.target.value})}
            className="w-full p-2 border rounded-md bg-background"
          >
            <option value="Europe/Madrid">Madrid (GMT+1)</option>
            <option value="America/New_York">New York (GMT-5)</option>
            <option value="America/Los_Angeles">Los Angeles (GMT-8)</option>
            <option value="Asia/Tokyo">Tokyo (GMT+9)</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block flex items-center gap-2">
            <Palette className="w-4 h-4" />
            Tema
          </label>
          <select
            value={systemSettings.theme}
            onChange={(e) => setSystemSettings({...systemSettings, theme: e.target.value})}
            className="w-full p-2 border rounded-md bg-background"
          >
            <option value="light">Claro</option>
            <option value="dark">Oscuro</option>
            <option value="system">Sistema</option>
          </select>
        </div>
      </div>

      <div className="pt-6 border-t">
        <Button
          variant="destructive"
          onClick={logout}
          className="flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          Cerrar Sesión
        </Button>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile': return renderProfileTab();
      case 'api': return renderApiTab();
      case 'automation': return renderAutomationTab();
      case 'notifications': return renderNotificationsTab();
      case 'privacy': return renderPrivacyTab();
      case 'system': return renderSystemTab();
      default: return renderProfileTab();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Configuración</h1>
          <p className="text-muted-foreground">Gestiona tu cuenta y preferencias</p>
        </div>
        <Button onClick={handleSave} disabled={isLoading} className="flex items-center gap-2">
          <Save className="w-4 h-4" />
          {isLoading ? 'Guardando...' : 'Guardar Cambios'}
        </Button>
      </div>

      {message && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-3 rounded-lg ${
            message.includes('Error') 
              ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400' 
              : 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
          }`}
        >
          {message}
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-4">
              <div className="space-y-2">
                {tabs.map((tab) => (
                  <TabButton
                    key={tab.id}
                    tab={tab}
                    isActive={activeTab === tab.id}
                    onClick={() => setActiveTab(tab.id)}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {tabs.find(tab => tab.id === activeTab)?.icon && 
                  React.createElement(tabs.find(tab => tab.id === activeTab).icon, { className: "w-5 h-5" })
                }
                {tabs.find(tab => tab.id === activeTab)?.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {renderTabContent()}
              </motion.div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;

