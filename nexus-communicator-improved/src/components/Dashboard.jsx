import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  MessageCircle, 
  Users, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Send,
  Eye,
  Target,
  Zap,
  Calendar,
  Activity
} from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalMessages: 12847,
    activeContacts: 2341,
    campaignsActive: 8,
    responseRate: 87.3
  });

  const [realtimeData, setRealtimeData] = useState([]);

  // Datos de ejemplo para gráficos
  const messageData = [
    { name: 'Lun', enviados: 1200, recibidos: 800, leidos: 950 },
    { name: 'Mar', enviados: 1900, recibidos: 1200, leidos: 1400 },
    { name: 'Mié', enviados: 1600, recibidos: 1000, leidos: 1200 },
    { name: 'Jue', enviados: 2200, recibidos: 1400, leidos: 1800 },
    { name: 'Vie', enviados: 2800, recibidos: 1800, leidos: 2200 },
    { name: 'Sáb', enviados: 1400, recibidos: 900, leidos: 1100 },
    { name: 'Dom', enviados: 1000, recibidos: 600, leidos: 750 }
  ];

  const campaignData = [
    { name: 'Promoción Verano', value: 35, color: '#3b82f6' },
    { name: 'Newsletter', value: 25, color: '#8b5cf6' },
    { name: 'Ofertas Especiales', value: 20, color: '#06b6d4' },
    { name: 'Recordatorios', value: 15, color: '#10b981' },
    { name: 'Otros', value: 5, color: '#f59e0b' }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'message',
      title: 'Campaña "Promoción Verano" enviada',
      description: '1,250 mensajes enviados exitosamente',
      time: '5 min',
      status: 'success'
    },
    {
      id: 2,
      type: 'contact',
      title: 'Nuevos contactos agregados',
      description: '15 contactos importados desde CSV',
      time: '12 min',
      status: 'info'
    },
    {
      id: 3,
      type: 'automation',
      title: 'Automatización activada',
      description: 'Respuestas automáticas configuradas',
      time: '25 min',
      status: 'success'
    },
    {
      id: 4,
      type: 'alert',
      title: 'Límite de mensajes alcanzado',
      description: 'Considera actualizar tu plan',
      time: '1 h',
      status: 'warning'
    }
  ];

  // Simular datos en tiempo real
  useEffect(() => {
    const interval = setInterval(() => {
      const newData = {
        time: new Date().toLocaleTimeString(),
        messages: Math.floor(Math.random() * 100) + 50,
        responses: Math.floor(Math.random() * 50) + 20
      };
      
      setRealtimeData(prev => {
        const updated = [...prev, newData];
        return updated.slice(-10); // Mantener solo los últimos 10 puntos
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const StatCard = ({ title, value, change, icon: Icon, color, description }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="relative overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${color}`} />
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          <div className={`p-2 rounded-lg bg-gradient-to-r ${color} bg-opacity-10`}>
            <Icon className="h-4 w-4 text-current" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value.toLocaleString()}</div>
          <div className="flex items-center gap-2 mt-2">
            <Badge 
              variant={change >= 0 ? "default" : "destructive"} 
              className="text-xs"
            >
              {change >= 0 ? '+' : ''}{change}%
            </Badge>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  const ActivityItem = ({ activity }) => {
    const getIcon = () => {
      switch (activity.type) {
        case 'message': return <Send className="w-4 h-4" />;
        case 'contact': return <Users className="w-4 h-4" />;
        case 'automation': return <Zap className="w-4 h-4" />;
        case 'alert': return <AlertCircle className="w-4 h-4" />;
        default: return <Activity className="w-4 h-4" />;
      }
    };

    const getStatusColor = () => {
      switch (activity.status) {
        case 'success': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
        case 'warning': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
        case 'info': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
        default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
      }
    };

    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
      >
        <div className={`p-2 rounded-full ${getStatusColor()}`}>
          {getIcon()}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium">{activity.title}</p>
          <p className="text-xs text-muted-foreground">{activity.description}</p>
        </div>
        <span className="text-xs text-muted-foreground">{activity.time}</span>
      </motion.div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Mensajes Enviados"
          value={stats.totalMessages}
          change={12.5}
          icon={MessageCircle}
          color="from-blue-500 to-blue-600"
          description="vs mes anterior"
        />
        <StatCard
          title="Contactos Activos"
          value={stats.activeContacts}
          change={8.2}
          icon={Users}
          color="from-green-500 to-green-600"
          description="nuevos este mes"
        />
        <StatCard
          title="Campañas Activas"
          value={stats.campaignsActive}
          change={-2.1}
          icon={Target}
          color="from-purple-500 to-purple-600"
          description="en ejecución"
        />
        <StatCard
          title="Tasa de Respuesta"
          value={stats.responseRate}
          change={5.7}
          icon={TrendingUp}
          color="from-orange-500 to-orange-600"
          description="promedio semanal"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Messages Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-600" />
                Actividad de Mensajes
              </CardTitle>
              <CardDescription>
                Mensajes enviados, recibidos y leídos esta semana
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={messageData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="enviados" 
                    stackId="1" 
                    stroke="#3b82f6" 
                    fill="#3b82f6" 
                    fillOpacity={0.6}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="recibidos" 
                    stackId="1" 
                    stroke="#10b981" 
                    fill="#10b981" 
                    fillOpacity={0.6}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="leidos" 
                    stackId="1" 
                    stroke="#8b5cf6" 
                    fill="#8b5cf6" 
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Campaign Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-600" />
                Distribución de Campañas
              </CardTitle>
              <CardDescription>
                Porcentaje de mensajes por tipo de campaña
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={campaignData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {campaignData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {campaignData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-xs text-muted-foreground">{item.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Real-time Data and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Real-time Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-600" />
                Actividad en Tiempo Real
                <Badge variant="outline" className="ml-auto">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse" />
                  En vivo
                </Badge>
              </CardTitle>
              <CardDescription>
                Mensajes y respuestas en los últimos minutos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={realtimeData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="messages" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="responses" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-indigo-600" />
                Actividad Reciente
              </CardTitle>
              <CardDescription>
                Últimas acciones del sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {recentActivities.map((activity) => (
                <ActivityItem key={activity.id} activity={activity} />
              ))}
              <Button variant="outline" className="w-full mt-4">
                Ver todas las actividades
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;

