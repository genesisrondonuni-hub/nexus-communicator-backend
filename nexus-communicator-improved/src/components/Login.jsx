import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, Mail, Lock, Eye, EyeOff, Sparkles, Chrome } from 'lucide-react';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simular autenticación
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1500);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  const floatingElements = Array.from({ length: 6 }, (_, i) => (
    <motion.div
      key={i}
      className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20"
      animate={{
        x: [0, 100, 0],
        y: [0, -100, 0],
        scale: [1, 1.5, 1],
      }}
      transition={{
        duration: 8 + i * 2,
        repeat: Infinity,
        ease: "easeInOut",
        delay: i * 0.5
      }}
      style={{
        left: `${10 + i * 15}%`,
        top: `${20 + i * 10}%`
      }}
    />
  ));

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Elementos flotantes de fondo */}
      {floatingElements}
      
      {/* Gradiente de fondo animado */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10"
        animate={{
          background: [
            "linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1), rgba(236, 72, 153, 0.1))",
            "linear-gradient(45deg, rgba(147, 51, 234, 0.1), rgba(236, 72, 153, 0.1), rgba(59, 130, 246, 0.1))",
            "linear-gradient(45deg, rgba(236, 72, 153, 0.1), rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))"
          ]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md relative z-10"
      >
        <Card className="backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 border-white/20 shadow-2xl">
          <CardHeader className="text-center space-y-4">
            <motion.div
              variants={itemVariants}
              className="flex justify-center"
            >
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-md opacity-30"
                />
                <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-full">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Nexus Communicator
              </CardTitle>
              <CardDescription className="text-lg mt-2">
                Plataforma de Mensajería Avanzada
              </CardDescription>
            </motion.div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div variants={itemVariants} className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Correo Electrónico
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@ejemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-12 bg-white/50 dark:bg-slate-800/50 border-white/30 focus:border-blue-500 transition-colors"
                    required
                  />
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Contraseña
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 h-12 bg-white/50 dark:bg-slate-800/50 border-white/30 focus:border-blue-500 transition-colors"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      Iniciar Sesión
                    </span>
                  )}
                </Button>
              </motion.div>
            </form>

            <motion.div
              variants={itemVariants}
              className="mt-6 text-center text-sm text-muted-foreground"
            >
              <p>¿Olvidaste tu contraseña? <span className="text-blue-600 hover:text-blue-700 cursor-pointer font-medium">Recuperar</span></p>
            </motion.div>

            <div className="relative flex items-center justify-center my-6">
              <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
              <span className="flex-shrink mx-4 text-gray-500 dark:text-gray-400">O</span>
              <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
            </div>

            <motion.div variants={itemVariants}>
              <Button variant="outline" className="w-full flex items-center justify-center gap-2 border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                <Chrome className="w-5 h-5" />
                Registrarse o Iniciar Sesión con Google
              </Button>
            </motion.div>
          </CardContent>
        </Card>

        <motion.div
          variants={itemVariants}
          className="mt-8 text-center text-sm text-muted-foreground"
        >
          <p>© 2024 Nexus Communicator. Todos los derechos reservados.</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;

