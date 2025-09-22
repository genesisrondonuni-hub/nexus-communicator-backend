import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Send, 
  Paperclip, 
  Smile, 
  MoreVertical, 
  Phone, 
  Video, 
  Search,
  User,
  Circle,
  Check,
  CheckCheck,
  Image,
  File,
  Mic,
  Plus
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Chat = () => {
  const [selectedContact, setSelectedContact] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const contacts = [
    {
      id: 1,
      name: 'María González',
      avatar: 'MG',
      status: 'online',
      lastMessage: 'Perfecto, nos vemos mañana',
      lastTime: '10:30',
      unread: 2,
      color: 'from-pink-500 to-rose-500'
    },
    {
      id: 2,
      name: 'Carlos Rodríguez',
      avatar: 'CR',
      status: 'away',
      lastMessage: '¿Tienes los documentos listos?',
      lastTime: '09:45',
      unread: 0,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 3,
      name: 'Ana Martínez',
      avatar: 'AM',
      status: 'online',
      lastMessage: 'Gracias por la información',
      lastTime: 'Ayer',
      unread: 1,
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 4,
      name: 'Luis Fernández',
      avatar: 'LF',
      status: 'offline',
      lastMessage: 'Hablamos la próxima semana',
      lastTime: 'Ayer',
      unread: 0,
      color: 'from-purple-500 to-violet-500'
    },
    {
      id: 5,
      name: 'Sofia López',
      avatar: 'SL',
      status: 'online',
      lastMessage: '¡Excelente trabajo!',
      lastTime: '2 días',
      unread: 3,
      color: 'from-orange-500 to-amber-500'
    }
  ];

  const sampleMessages = [
    {
      id: 1,
      text: 'Hola, ¿cómo estás?',
      sender: 'contact',
      time: '10:00',
      status: 'read'
    },
    {
      id: 2,
      text: '¡Hola! Todo bien por aquí, ¿y tú?',
      sender: 'me',
      time: '10:02',
      status: 'read'
    },
    {
      id: 3,
      text: 'Muy bien también. ¿Tienes tiempo para revisar el proyecto?',
      sender: 'contact',
      time: '10:05',
      status: 'read'
    },
    {
      id: 4,
      text: 'Claro, déjame revisarlo y te comento',
      sender: 'me',
      time: '10:07',
      status: 'delivered'
    },
    {
      id: 5,
      text: 'Perfecto, nos vemos mañana',
      sender: 'contact',
      time: '10:30',
      status: 'read'
    }
  ];

  useEffect(() => {
    // Automatically select the first contact on initial render
    if (contacts.length > 0 && !selectedContact) {
      setSelectedContact(contacts[0]);
    }
  }, []);

  useEffect(() => {
    if (selectedContact) {
      setMessages(sampleMessages);
    }
  }, [selectedContact]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: message,
        sender: 'me',
        time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
        status: 'sent'
      };
      
      setMessages([...messages, newMessage]);
      setMessage('');
      
      // Simular respuesta automática
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const autoReply = {
          id: messages.length + 2,
          text: 'Mensaje recibido, te responderé pronto.',
          sender: 'contact',
          time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
          status: 'read'
        };
        setMessages(prev => [...prev, autoReply]);
      }, 2000);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'sent':
        return <Check className="w-3 h-3 text-gray-400" />;
      case 'delivered':
        return <CheckCheck className="w-3 h-3 text-gray-400" />;
      case 'read':
        return <CheckCheck className="w-3 h-3 text-blue-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'away':
        return 'bg-yellow-500';
      case 'offline':
        return 'bg-gray-400';
      default:
        return 'bg-gray-400';
    }
  };

  const ContactItem = ({ contact }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => setSelectedContact(contact)}
      className={`p-3 rounded-lg cursor-pointer transition-colors ${
        selectedContact?.id === contact.id 
          ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800' 
          : 'hover:bg-muted/50'
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${contact.color} flex items-center justify-center text-white font-semibold`}>
            {contact.avatar}
          </div>
          <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(contact.status)} rounded-full border-2 border-white dark:border-slate-900`} />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="font-medium truncate">{contact.name}</h3>
            <span className="text-xs text-muted-foreground">{contact.lastTime}</span>
          </div>
          <p className="text-sm text-muted-foreground truncate">{contact.lastMessage}</p>
        </div>
        
        {contact.unread > 0 && (
          <Badge className="bg-blue-500 text-white text-xs">
            {contact.unread}
          </Badge>
        )}
      </div>
    </motion.div>
  );

  const MessageBubble = ({ message }) => {
    const isMe = message.sender === 'me';
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`flex ${isMe ? 'justify-end' : 'justify-start'} mb-4`}
      >
        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
          isMe 
            ? 'bg-blue-500 text-white rounded-br-md' 
            : 'bg-muted text-foreground rounded-bl-md'
        }`}>
          <p className="text-sm">{message.text}</p>
          <div className={`flex items-center gap-1 mt-1 ${isMe ? 'justify-end' : 'justify-start'}`}>
            <span className={`text-xs ${isMe ? 'text-blue-100' : 'text-muted-foreground'}`}>
              {message.time}
            </span>
            {isMe && getStatusIcon(message.status)}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="h-full flex gap-6">
      {/* Contacts Sidebar */}
      <div className="w-80 flex flex-col">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Conversaciones
            </CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar contactos..."
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-2 overflow-y-auto">
            {contacts.map((contact) => (
              <ContactItem key={contact.id} contact={contact} />
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedContact ? (
          <Card className="flex-1 flex flex-col">
            {/* Chat Header */}
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${selectedContact.color} flex items-center justify-center text-white font-semibold`}>
                      {selectedContact.avatar}
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-3 h-3 ${getStatusColor(selectedContact.status)} rounded-full border-2 border-white dark:border-slate-900`} />
                  </div>
                  <div>
                    <h3 className="font-semibold">{selectedContact.name}</h3>
                    <p className="text-sm text-muted-foreground capitalize">{selectedContact.status}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Video className="w-4 h-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Ver perfil</DropdownMenuItem>
                      <DropdownMenuItem>Silenciar notificaciones</DropdownMenuItem>
                      <DropdownMenuItem>Limpiar chat</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">Bloquear contacto</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>

            {/* Messages Area */}
            <CardContent className="flex-1 overflow-y-auto p-4">
              <div className="space-y-2">
                {messages.map((msg) => (
                  <MessageBubble key={msg.id} message={msg} />
                ))}
                
                {/* Typing Indicator */}
                <AnimatePresence>
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex justify-start mb-4"
                    >
                      <div className="bg-muted text-foreground px-4 py-2 rounded-2xl rounded-bl-md">
                        <div className="flex space-x-1">
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                            className="w-2 h-2 bg-muted-foreground rounded-full"
                          />
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                            className="w-2 h-2 bg-muted-foreground rounded-full"
                          />
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                            className="w-2 h-2 bg-muted-foreground rounded-full"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <div ref={messagesEndRef} />
              </div>
            </CardContent>

            {/* Message Input */}
            <div className="border-t p-4">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Paperclip className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Image className="w-4 h-4" />
                </Button>
                
                <div className="flex-1 relative">
                  <Input
                    placeholder="Escribe un mensaje..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="pr-20"
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                    <Button variant="ghost" size="sm">
                      <Smile className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Mic className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <Button 
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ) : (
          <Card className="flex-1 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto">
                <MessageCircle className="w-10 h-10 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Selecciona una conversación</h3>
                <p className="text-muted-foreground">Elige un contacto para comenzar a chatear</p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Chat;

