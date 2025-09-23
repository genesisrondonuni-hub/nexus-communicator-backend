import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  Download, 
  Calendar, 
  TrendingUp, 
  TrendingDown,
  MessageCircle,
  Users,
  Target,
  Eye
} from 'lucide-react';
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

const Reports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');

  const messageData = [];

  const campaignPerformance = [];

  const deviceData = [];

  const periods = [
    { value: '7d', label: 'Últimos 7 días' },
    { value: '30d', label: 'Últimos 30 días' },
    { value: '90d', label: 'Últimos 90 días' },
    { value: '1y', label: 'Último año' }
  ];

  const MetricCard = ({ title, value, change, icon: Icon, color, description }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">{title}</p>
              <p className="text-3xl font-bold mt-2">{value.toLocaleString()}</p>
              <div className="flex items-center gap-2 mt-2">
                {change >= 0 ? (
                  <TrendingUp className="w-4 h-4 text-green-600" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-600" />
                )}
                <span className={`text-sm font-medium ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {change >= 0 ? '+' : ''}{change}%
                </span>
                <span className="text-sm text-muted-foreground">{description}</span>
              </div>
            </div>
            <div className={`p-3 rounded-full ${color}`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Reportes y Análisis</h1>
          <p className="text-muted-foreground">Analiza el rendimiento de tus campañas y mensajes</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            {periods.map((period) => (
              <Button
                key={period.value}
                variant={selectedPeriod === period.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedPeriod(period.value)}
              >
                {period.label}
              </Button>
            ))}
          </div>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Métricas Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Mensajes Enviados"
          value={12847}
          change={12.5}
          icon={MessageCircle}
          color="bg-blue-500"
          description="vs período anterior"
        />
        <MetricCard
          title="Tasa de Entrega"
          value={98.2}
          change={2.1}
          icon={Target}
          color="bg-green-500"
          description="% de mensajes entregados"
        />
        <MetricCard
          title="Tasa de Apertura"
          value={76.8}
          change={-1.3}
          icon={Eye}
          color="bg-purple-500"
          description="% de mensajes abiertos"
        />
        <MetricCard
          title="Contactos Activos"
          value={2341}
          change={8.7}
          icon={Users}
          color="bg-orange-500"
          description="contactos que respondieron"
        />
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tendencia de Mensajes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                Tendencia de Mensajes
              </CardTitle>
              <CardDescription>
                Evolución diaria de mensajes enviados y respuestas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={messageData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(value) => new Date(value).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' })}
                  />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                    labelFormatter={(value) => new Date(value).toLocaleDateString('es-ES')}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="enviados" 
                    stackId="1" 
                    stroke="#3b82f6" 
                    fill="#3b82f6" 
                    fillOpacity={0.6}
                    name="Enviados"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="leidos" 
                    stackId="2" 
                    stroke="#10b981" 
                    fill="#10b981" 
                    fillOpacity={0.6}
                    name="Leídos"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="respondidos" 
                    stackId="3" 
                    stroke="#8b5cf6" 
                    fill="#8b5cf6" 
                    fillOpacity={0.6}
                    name="Respondidos"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Dispositivos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-600" />
                Dispositivos de Lectura
              </CardTitle>
              <CardDescription>
                Distribución por tipo de dispositivo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={deviceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {deviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                    formatter={(value) => [`${value}%`, 'Porcentaje']}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-3 gap-4 mt-4">
                {deviceData.map((item, index) => (
                  <div key={index} className="text-center">
                    <div 
                      className="w-4 h-4 rounded-full mx-auto mb-1" 
                      style={{ backgroundColor: item.color }}
                    />
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.value}%</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Rendimiento de Campañas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-green-600" />
              Rendimiento de Campañas
            </CardTitle>
            <CardDescription>
              Comparativa de métricas por campaña
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={campaignPerformance} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
                <Bar dataKey="enviados" fill="#3b82f6" name="Enviados" />
                <Bar dataKey="abiertos" fill="#10b981" name="Abiertos" />
                <Bar dataKey="clicks" fill="#8b5cf6" name="Clicks" />
                <Bar dataKey="conversiones" fill="#f59e0b" name="Conversiones" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Tabla de Resumen */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Resumen Detallado</CardTitle>
            <CardDescription>
              Métricas detalladas por campaña
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b">
                  <tr>
                    <th className="text-left p-3 font-medium">Campaña</th>
                    <th className="text-left p-3 font-medium">Enviados</th>
                    <th className="text-left p-3 font-medium">Tasa Apertura</th>
                    <th className="text-left p-3 font-medium">Tasa Click</th>
                    <th className="text-left p-3 font-medium">Conversiones</th>
                    <th className="text-left p-3 font-medium">ROI</th>
                  </tr>
                </thead>
                <tbody>
                  {campaignPerformance.map((campaign, index) => (
                    <tr key={index} className="border-b hover:bg-muted/50 transition-colors">
                      <td className="p-3 font-medium">{campaign.name}</td>
                      <td className="p-3">{campaign.enviados.toLocaleString()}</td>
                      <td className="p-3">
                        <Badge variant="outline">
                          {((campaign.abiertos / campaign.enviados) * 100).toFixed(1)}%
                        </Badge>
                      </td>
                      <td className="p-3">
                        <Badge variant="outline">
                          {((campaign.clicks / campaign.abiertos) * 100).toFixed(1)}%
                        </Badge>
                      </td>
                      <td className="p-3">{campaign.conversiones}</td>
                      <td className="p-3">
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                          +{(campaign.conversiones * 2.5).toFixed(0)}%
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Reports;

