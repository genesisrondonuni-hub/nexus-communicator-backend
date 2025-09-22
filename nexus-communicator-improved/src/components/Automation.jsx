import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Bot, 
  Plus, 
  Play, 
  Pause, 
  Settings, 
  MessageCircle, 
  Clock, 
  Zap,
  ArrowRight,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const Automation = () => {
  const [automations, setAutomations] = useState([
    {
      id: 1,
      name: 'Bienvenida Nuevos Contactos',
      description: 'Envía un mensaje de bienvenida automático a nuevos contactos',
      trigger: 'Nuevo contacto agregado',
      action: 'Enviar mensaje de bienvenida',
      status: 'active',
      executions: 45,
      lastRun: '2024-01-15 14:30'
    },
    {
      id: 2,
      name: 'Recordatorio de Seguimiento',
      description: 'Recuerda hacer seguimiento a contactos después de 3 días',
      trigger: 'Después de 3 días sin respuesta',
      action: 'Enviar recordatorio de seguimiento',
      status: 'active',
      executions: 23,
      lastRun: '2024-01-15 10:15'
    },
    {
      id: 3,
      name: 'Respuesta Automática Fuera de Horario',
      description: 'Responde automáticamente cuando se reciben mensajes fuera del horario laboral',
      trigger: 'Mensaje recibido fuera de horario',
      action: 'Enviar mensaje automático',
      status: 'paused',
      executions: 156,
      lastRun: '2024-01-14 22:45'
    },
    {
      id: 4,
      name: 'Cumpleaños de Contactos',
      description: 'Envía felicitaciones automáticas en cumpleaños',
      trigger: 'Cumpleaños de contacto',
      action: 'Enviar felicitación',
      status: 'active',
      executions: 8,
      lastRun: '2024-01-12 09:00'
    }
  ]);

  const toggleAutomation = (id) => {
    setAutomations(prev => prev.map(automation => 
      automation.id === id 
        ? { ...automation, status: automation.status === 'active' ? 'paused' : 'active' }
        : automation
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'paused': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'error': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'Activa';
      case 'paused': return 'Pausada';
      case 'error': return 'Error';
      default: return 'Desconocido';
    }
  };

  const AutomationCard = ({ automation }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <Bot className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-lg">{automation.name}</CardTitle>
                <CardDescription className="mt-1">
                  {automation.description}
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={getStatusColor(automation.status)}>
                {getStatusText(automation.status)}
              </Badge>
              <Switch
                checked={automation.status === 'active'}
                onCheckedChange={() => toggleAutomation(automation.id)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Flujo de automatización */}
          <div className="bg-muted/30 p-4 rounded-lg">
            <div className="flex items-center gap-3 text-sm">
              <div className="flex items-center gap-2 bg-blue-100 dark:bg-blue-900/20 px-3 py-1 rounded-full">
                <Zap className="w-3 h-3 text-blue-600" />
                <span className="text-blue-700 dark:text-blue-300">{automation.trigger}</span>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
              <div className="flex items-center gap-2 bg-green-100 dark:bg-green-900/20 px-3 py-1 rounded-full">
                <MessageCircle className="w-3 h-3 text-green-600" />
                <span className="text-green-700 dark:text-green-300">{automation.action}</span>
              </div>
            </div>
          </div>

          {/* Estadísticas */}
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-blue-600">{automation.executions}</p>
              <p className="text-xs text-muted-foreground">Ejecuciones</p>
            </div>
            <div>
              <p className="text-sm font-medium">{automation.lastRun}</p>
              <p className="text-xs text-muted-foreground">Última ejecución</p>
            </div>
          </div>

          {/* Acciones */}
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1">
              <Settings className="w-4 h-4 mr-2" />
              Configurar
            </Button>
            <Button variant="outline" size="sm">
              {automation.status === 'active' ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4" />
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  const templates = [
    {
      id: 1,
      name: 'Bienvenida de Nuevos Clientes',
      description: 'Automatización para dar la bienvenida a nuevos clientes',
      category: 'Onboarding',
      icon: CheckCircle
    },
    {
      id: 2,
      name: 'Seguimiento Post-Venta',
      description: 'Seguimiento automático después de una compra',
      category: 'Ventas',
      icon: MessageCircle
    },
    {
      id: 3,
      name: 'Recordatorio de Citas',
      description: 'Recordatorios automáticos para citas programadas',
      category: 'Recordatorios',
      icon: Clock
    },
    {
      id: 4,
      name: 'Respuesta de Emergencia',
      description: 'Respuestas automáticas para situaciones urgentes',
      category: 'Soporte',
      icon: AlertCircle
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Automatización de Mensajes</h1>
          <p className="text-muted-foreground">Configura respuestas y acciones automáticas</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Nueva Automatización
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{automations.length}</p>
                <p className="text-sm text-muted-foreground">Total Automatizaciones</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Play className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{automations.filter(a => a.status === 'active').length}</p>
                <p className="text-sm text-muted-foreground">Activas</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Pause className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold">{automations.filter(a => a.status === 'paused').length}</p>
                <p className="text-sm text-muted-foreground">Pausadas</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">{automations.reduce((sum, a) => sum + a.executions, 0)}</p>
                <p className="text-sm text-muted-foreground">Ejecuciones Totales</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Automatizaciones Activas */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Automatizaciones Configuradas</CardTitle>
              <CardDescription>
                Gestiona tus automatizaciones existentes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4">
                {automations.map((automation) => (
                  <AutomationCard key={automation.id} automation={automation} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Templates */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Plantillas Disponibles</CardTitle>
              <CardDescription>
                Usa plantillas predefinidas para crear automatizaciones rápidamente
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {templates.map((template) => {
                const Icon = template.icon;
                return (
                  <motion.div
                    key={template.id}
                    whileHover={{ scale: 1.02 }}
                    className="p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                        <Icon className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{template.name}</h4>
                        <p className="text-xs text-muted-foreground mt-1">{template.description}</p>
                        <Badge variant="outline" className="text-xs mt-2">
                          {template.category}
                        </Badge>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
              <Button variant="outline" className="w-full mt-4">
                Ver Todas las Plantillas
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Automation;

