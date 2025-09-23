import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Megaphone,
  Send,
  Save,
  Eye,
  Calendar,
  Users,
  MessageSquare,
  Target,
  Clock,
  CheckCircle,
  Play,
  Pause,
  Paperclip,
  Sparkles,
  Image as ImageIcon
} from 'lucide-react';

const CampaignCreator = () => {
  const [campaignName, setCampaignName] = useState('');
  const [campaignMessage, setCampaignMessage] = useState('');
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [mediaAttached, setMediaAttached] = useState(false);

  const campaigns = [];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'scheduled': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'completed': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      case 'paused': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'Activa';
      case 'scheduled': return 'Programada';
      case 'completed': return 'Completada';
      case 'paused': return 'Pausada';
      default: return 'Desconocido';
    }
  };

  const CampaignCard = ({ campaign }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-lg">{campaign.name}</CardTitle>
              <CardDescription className="mt-2">
                Programada para: {campaign.scheduled}
              </CardDescription>
            </div>
            <Badge className={getStatusColor(campaign.status)}>
              {getStatusText(campaign.status)}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground line-clamp-2">
            {campaign.message}
          </p>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-blue-600">{campaign.sent}</p>
              <p className="text-xs text-muted-foreground">Enviados</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">{campaign.opened}</p>
              <p className="text-xs text-muted-foreground">Abiertos</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600">{campaign.clicked}</p>
              <p className="text-xs text-muted-foreground">Clicks</p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1">
              <Eye className="w-4 h-4 mr-2" />
              Ver
            </Button>
            {campaign.status === 'active' ? (
              <Button variant="outline" size="sm">
                <Pause className="w-4 h-4" />
              </Button>
            ) : campaign.status === 'scheduled' ? (
              <Button variant="outline" size="sm">
                <Play className="w-4 h-4" />
              </Button>
            ) : null}
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
          <h1 className="text-2xl font-bold">Creador de Campañas</h1>
          <p className="text-muted-foreground">Crea y gestiona tus campañas de mensajería</p>
        </div>
        <Button>
          <Megaphone className="w-4 h-4 mr-2" />
          Nueva Campaña
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{campaigns.length}</p>
                <p className="text-sm text-muted-foreground">Total Campañas</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Play className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{campaigns.filter(c => c.status === 'active').length}</p>
                <p className="text-sm text-muted-foreground">Activas</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold">{campaigns.filter(c => c.status === 'scheduled').length}</p>
                <p className="text-sm text-muted-foreground">Programadas</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">{campaigns.filter(c => c.status === 'completed').length}</p>
                <p className="text-sm text-muted-foreground">Completadas</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Campaign Creator */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Crear Nueva Campaña
              </CardTitle>
              <CardDescription>
                Configura los detalles de tu campaña
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Nombre de la Campaña</label>
                <Input
                  placeholder="Ej: Promoción Black Friday"
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Mensaje</label>
                <Textarea
                  placeholder="Escribe tu mensaje aquí..."
                  value={campaignMessage}
                  onChange={(e) => setCampaignMessage(e.target.value)}
                  rows={4}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {campaignMessage.length}/160 caracteres
                </p>
              </div>

              {/* Adjuntar Multimedia */}
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Adjuntar Multimedia</label>
                <Button variant="outline" size="sm" onClick={() => setMediaAttached(!mediaAttached)}>
                  <Paperclip className="w-4 h-4 mr-2" />
                  {mediaAttached ? 'Multimedia Adjunta' : 'Adjuntar Archivo'}
                </Button>
              </div>
              {mediaAttached && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ImageIcon className="w-4 h-4" />
                  <span>imagen_promocional.jpg</span>
                </div>
              )}

              {/* Asistencia con IA */}
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Asistencia con IA</label>
                <Button variant="outline" size="sm">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generar Mensaje (Gemini)
                </Button>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Programar Envío</label>
                <Input type="datetime-local" />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Destinatarios</label>
                <Button variant="outline" className="w-full">
                  <Users className="w-4 h-4 mr-2" />
                  Seleccionar Contactos (0)
                </Button>
              </div>

              <div className="space-y-2">
                <Button className="w-full">
                  <Send className="w-4 h-4 mr-2" />
                  Enviar Ahora
                </Button>
                <Button variant="outline" className="w-full">
                  <Eye className="w-4 h-4 mr-2" />
                  Previsualizar
                </Button>
                <Button variant="outline" className="w-full">
                  <Save className="w-4 h-4 mr-2" />
                  Guardar Borrador
                </Button>
                <Button variant="outline" className="w-full">
                  <Calendar className="w-4 h-4 mr-2" />
                  Programar Envío
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Campaigns List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Campañas Recientes</CardTitle>
              <CardDescription>
                Gestiona tus campañas existentes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {campaigns.map((campaign) => (
                  <CampaignCard key={campaign.id} campaign={campaign} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CampaignCreator;

