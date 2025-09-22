import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Shield,
  Palette,
  Database,
  Key,
  Globe,
  Save,
  Moon,
  Sun,
  MessageSquare,
  Mail,
  Bot,
  Upload,
  FileText,
  Activity
} from 'lucide-react';

const Settings = ({ theme, setTheme }) => {
  const [settings, setSettings] = useState({
    // Perfil
    name: 'Usuario Admin',
    email: 'admin@nexus.com',
    phone: '+34 612 345 678',
    company: 'Nexus Communications',
    
    // Notificaciones
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    marketingEmails: true,
    
    // Privacidad
    profileVisible: true,
    dataSharing: false,
    analytics: true,
    
    // Mensajería
    autoReply: true,
    readReceipts: true,
    typingIndicators: true,
    messagePreview: true,
    
    // Sistema
    language: 'es',
    timezone: 'Europe/Madrid',
    dateFormat: 'DD/MM/YYYY',
    
    // Automatización
    autoBackup: true,
    backupFrequency: 'daily',
    retentionPeriod: '90',

    // API Keys
    whatsappApiKey: 'sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    gmailApiKey: 'sk-yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy',
    geminiApiKey: 'sk-zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz',

    // Gemini AI Automation
    geminiAutoReplyEnabled: false,
    geminiKnowledgeBase: 'Proporciona toda la información relevante sobre tu negocio para que Gemini pueda responder con precisión. Incluye detalles sobre productos, servicios, horarios, políticas, preguntas frecuentes, etc.',
  });

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const SettingCard = ({ title, description, icon: Icon, children }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon className="w-5 h-5" />
            {title}
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {children}
        </CardContent>
      </Card>
    </motion.div>
  );

  const ToggleSetting = ({ label, description, checked, onChange }) => (
    <div className="flex items-center justify-between">
      <div className="space-y-0.5">
        <Label className="text-base">{label}</Label>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Configuración del Sistema</h1>
          <p className="text-muted-foreground">Personaliza tu experiencia en Nexus Communicator</p>
        </div>
        <Button>
          <Save className="w-4 h-4 mr-2" />
          Guardar Cambios
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Perfil de Usuario */}
        <SettingCard
          title="Perfil de Usuario"
          description="Información personal y de contacto"
          icon={User}
        >
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Nombre Completo</Label>
              <Input
                id="name"
                value={settings.name}
                onChange={(e) => updateSetting('name', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                type="email"
                value={settings.email}
                onChange={(e) => updateSetting('email', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="phone">Teléfono</Label>
              <Input
                id="phone"
                value={settings.phone}
                onChange={(e) => updateSetting('phone', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="company">Empresa</Label>
              <Input
                id="company"
                value={settings.company}
                onChange={(e) => updateSetting('company', e.target.value)}
              />
            </div>
          </div>
        </SettingCard>

        {/* Apariencia */}
        <SettingCard
          title="Apariencia"
          description="Personaliza la interfaz y el tema"
          icon={Palette}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Tema</Label>
                <p className="text-sm text-muted-foreground">Elige entre tema claro u oscuro</p>
              </div>
              <div className="flex items-center gap-2">
                <Sun className="w-4 h-4" />
                <Switch
                  checked={theme === 'dark'}
                  onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                />
                <Moon className="w-4 h-4" />
              </div>
            </div>
            <div>
              <Label htmlFor="language">Idioma</Label>
              <select
                id="language"
                className="w-full p-2 border rounded-md bg-background"
                value={settings.language}
                onChange={(e) => updateSetting('language', e.target.value)}
              >
                <option value="es">Español</option>
                <option value="en">English</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
              </select>
            </div>
            <div>
              <Label htmlFor="timezone">Zona Horaria</Label>
              <select
                id="timezone"
                className="w-full p-2 border rounded-md bg-background"
                value={settings.timezone}
                onChange={(e) => updateSetting('timezone', e.target.value)}
              >
                <option value="Europe/Madrid">Madrid (GMT+1)</option>
                <option value="Europe/London">Londres (GMT+0)</option>
                <option value="America/New_York">Nueva York (GMT-5)</option>
                <option value="America/Los_Angeles">Los Ángeles (GMT-8)</option>
              </select>
            </div>
          </div>
        </SettingCard>

        {/* Notificaciones */}
        <SettingCard
          title="Notificaciones"
          description="Configura cómo y cuándo recibir notificaciones"
          icon={Bell}
        >
          <div className="space-y-4">
            <ToggleSetting
              label="Notificaciones por Email"
              description="Recibe notificaciones importantes por correo"
              checked={settings.emailNotifications}
              onChange={(checked) => updateSetting('emailNotifications', checked)}
            />
            <ToggleSetting
              label="Notificaciones Push"
              description="Notificaciones en tiempo real en el navegador"
              checked={settings.pushNotifications}
              onChange={(checked) => updateSetting('pushNotifications', checked)}
            />
            <ToggleSetting
              label="Notificaciones SMS"
              description="Recibe alertas críticas por SMS"
              checked={settings.smsNotifications}
              onChange={(checked) => updateSetting('smsNotifications', checked)}
            />
            <ToggleSetting
              label="Emails de Marketing"
              description="Recibe información sobre nuevas funciones"
              checked={settings.marketingEmails}
              onChange={(checked) => updateSetting('marketingEmails', checked)}
            />
          </div>
        </SettingCard>

        {/* Privacidad y Seguridad */}
        <SettingCard
          title="Privacidad y Seguridad"
          description="Controla tu privacidad y seguridad de datos"
          icon={Shield}
        >
          <div className="space-y-4">
            <ToggleSetting
              label="Perfil Visible"
              description="Permite que otros usuarios vean tu perfil"
              checked={settings.profileVisible}
              onChange={(checked) => updateSetting('profileVisible', checked)}
            />
            <ToggleSetting
              label="Compartir Datos de Uso"
              description="Ayuda a mejorar el producto compartiendo datos anónimos"
              checked={settings.dataSharing}
              onChange={(checked) => updateSetting('dataSharing', checked)}
            />
            <ToggleSetting
              label="Analytics"
              description="Permite el seguimiento para mejorar la experiencia"
              checked={settings.analytics}
              onChange={(checked) => updateSetting('analytics', checked)}
            />
            <Button variant="outline" className="w-full">
              <Key className="w-4 h-4 mr-2" />
              Cambiar Contraseña
            </Button>
          </div>
        </SettingCard>

        {/* Integraciones API Keys */}
        <SettingCard
          title="Integraciones API Keys"
          description="Configura tus claves API para servicios externos"
          icon={Key}
        >
          <div className="space-y-4">
            <div>
              <Label htmlFor="whatsappApiKey">WhatsApp API Key</Label>
              <Input
                id="whatsappApiKey"
                type="password"
                value={settings.whatsappApiKey}
                onChange={(e) => updateSetting('whatsappApiKey', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="gmailApiKey">Gmail API Key</Label>
              <Input
                id="gmailApiKey"
                type="password"
                value={settings.gmailApiKey}
                onChange={(e) => updateSetting('gmailApiKey', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="geminiApiKey">Gemini API Key</Label>
              <Input
                id="geminiApiKey"
                type="password"
                value={settings.geminiApiKey}
                onChange={(e) => updateSetting('geminiApiKey', e.target.value)}
              />
            </div>
          </div>
        </SettingCard>

        {/* Automatización con Gemini 2.5 Pro */}
        <SettingCard
          title="Automatización con Gemini 2.5 Pro"
          description="Configura tu agente de IA para responder mensajes automáticamente"
          icon={Bot}
        >
          <div className="space-y-4">
            <ToggleSetting
              label="Activar respuestas automáticas"
              description="Cuando está activado, el Bot responderá a los mensajes de los contactos que tengan la opción habilitada"
              checked={settings.geminiAutoReplyEnabled}
              onChange={(checked) => updateSetting('geminiAutoReplyEnabled', checked)}
            />
            <div>
              <Label htmlFor="geminiKnowledgeBase">Base de Conocimiento del Agente</Label>
              <Textarea
                id="geminiKnowledgeBase"
                value={settings.geminiKnowledgeBase}
                onChange={(e) => updateSetting('geminiKnowledgeBase', e.target.value)}
                rows={6}
                placeholder="Proporciona toda la información relevante sobre tu negocio para que Gemini pueda responder con precisión. Incluye detalles sobre productos, servicios, horarios, políticas, preguntas frecuentes, etc."
              />
              <p className="text-sm text-muted-foreground mt-1">Gemini 2.5 Pro será el modelo de IA para esta aplicación.</p>
            </div>
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Actividad Reciente del Bot</h4>
              <Button variant="outline" size="sm">
                <Activity className="w-4 h-4 mr-2" />
                Ver Logs
              </Button>
            </div>
          </div>
        </SettingCard>

        {/* Configuración de Mensajería */}
        <SettingCard
          title="Mensajería"
          description="Personaliza el comportamiento de los mensajes"
          icon={MessageSquare}
        >
          <div className="space-y-4">
            <ToggleSetting
              label="Respuesta Automática"
              description="Envía respuestas automáticas cuando no estés disponible"
              checked={settings.autoReply}
              onChange={(checked) => updateSetting('autoReply', checked)}
            />
            <ToggleSetting
              label="Confirmaciones de Lectura"
              description="Muestra cuando los mensajes han sido leídos"
              checked={settings.readReceipts}
              onChange={(checked) => updateSetting('readReceipts', checked)}
            />
            <ToggleSetting
              label="Indicadores de Escritura"
              description="Muestra cuando alguien está escribiendo"
              checked={settings.typingIndicators}
              onChange={(checked) => updateSetting('typingIndicators', checked)}
            />
            <ToggleSetting
              label="Vista Previa de Mensajes"
              description="Muestra una vista previa en las notificaciones"
              checked={settings.messagePreview}
              onChange={(checked) => updateSetting('messagePreview', checked)}
            />
          </div>
        </SettingCard>

        {/* Respaldo y Datos */}
        <SettingCard
          title="Respaldo y Datos"
          description="Gestiona el respaldo y retención de datos"
          icon={Database}
        >
          <div className="space-y-4">
            <ToggleSetting
              label="Respaldo Automático"
              description="Crea respaldos automáticos de tus datos"
              checked={settings.autoBackup}
              onChange={(checked) => updateSetting('autoBackup', checked)}
            />
            <div>
              <Label htmlFor="backupFrequency">Frecuencia de Respaldo</Label>
              <select
                id="backupFrequency"
                className="w-full p-2 border rounded-md bg-background"
                value={settings.backupFrequency}
                onChange={(e) => updateSetting('backupFrequency', e.target.value)}
              >
                <option value="daily">Diario</option>
                <option value="weekly">Semanal</option>
                <option value="monthly">Mensual</option>
              </select>
            </div>
            <div>
              <Label htmlFor="retention">Período de Retención (días)</Label>
              <Input
                id="retention"
                type="number"
                value={settings.retentionPeriod}
                onChange={(e) => updateSetting('retentionPeriod', e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1">
                Crear Respaldo
              </Button>
              <Button variant="outline" className="flex-1">
                Restaurar Datos
              </Button>
            </div>
          </div>
        </SettingCard>
      </div>

      {/* Mensaje de Respuesta Automática */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Mensaje de Respuesta Automática</CardTitle>
            <CardDescription>
              Configura el mensaje que se enviará automáticamente cuando no estés disponible
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Gracias por tu mensaje. Actualmente no estoy disponible, pero te responderé lo antes posible."
              rows={4}
              className="w-full"
            />
            <div className="flex justify-end mt-4">
              <Button>Guardar Mensaje</Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Zona de Peligro */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <Card className="border-red-200 dark:border-red-800">
          <CardHeader>
            <CardTitle className="text-red-600">Zona de Peligro</CardTitle>
            <CardDescription>
              Acciones irreversibles que afectarán permanentemente tu cuenta
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-red-200 dark:border-red-800 rounded-lg">
              <div>
                <h4 className="font-medium">Eliminar Todos los Datos</h4>
                <p className="text-sm text-muted-foreground">
                  Elimina permanentemente todos tus mensajes, contactos y configuraciones
                </p>
              </div>
              <Button variant="destructive">
                Eliminar Datos
              </Button>
            </div>
            <div className="flex items-center justify-between p-4 border border-red-200 dark:border-red-800 rounded-lg">
              <div>
                <h4 className="font-medium">Desactivar Cuenta</h4>
                <p className="text-sm text-muted-foreground">
                  Desactiva temporalmente tu cuenta manteniendo los datos
                </p>
              </div>
              <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
                Desactivar
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Settings;

