require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Configuración de CORS
const corsOptions = {
  origin: 'https://nexus-communicator.netlify.app', // Temporalmente fijo para depuración
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));
app.use(express.json()); // Para parsear JSON en las solicitudes

// Middleware de log para ver las solicitudes
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Endpoints de Autenticación (Placeholders)
app.post('/api/auth/register', (req, res) => {
  console.log('Registro solicitado:', req.body);
  // Lógica de registro simulada
  const { email, password } = req.body;
  if (email && password) {
    res.status(201).json({ message: 'Usuario registrado con éxito (simulado)', user: { id: 'user-123', email } });
  } else {
    res.status(400).json({ message: 'Email y contraseña son requeridos' });
  }
});

app.post('/api/auth/login', (req, res) => {
  console.log('Login solicitado:', req.body);
  // Lógica de login simulada
  const { email, password } = req.body;
  if (email === 'test@example.com' && password === 'password') {
    res.status(200).json({ message: 'Login exitoso (simulado)', token: 'mock-jwt-token', user: { id: 'user-123', email } });
  } else {
    res.status(401).json({ message: 'Credenciales inválidas (simulado)' });
  }
});

// Endpoint de Suscripción (Placeholder)
app.get('/api/subscription', (req, res) => {
  console.log('Estado de suscripción solicitado');
  // Lógica de suscripción simulada
  res.status(200).json({ status: 'active', plan: 'premium', expires: '2025-12-31' });
});

// Endpoint de Configuración (API Keys - Placeholder)
app.get('/api/config/apikeys', (req, res) => {
  console.log('API Keys solicitadas');
  // Lógica para devolver API Keys (¡NUNCA devolverlas directamente en un entorno real!)
  // Esto es solo un placeholder. En un entorno real, se devolverían solo las necesarias
  // y se gestionarían con mucha más seguridad.
  res.status(200).json({
    whatsappApiKey: process.env.WHATSAPP_API_KEY || 'mock_whatsapp_key',
    geminiApiKey: process.env.GEMINI_API_KEY || 'mock_gemini_key',
    gmailApiKey: process.env.GMAIL_API_KEY || 'mock_gmail_key'
  });
});

// Ruta de prueba
app.get('/api/status', (req, res) => {
  res.status(200).json({ status: 'Backend is running', version: '1.0.0' });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
  console.log(`Frontend URL for CORS: ${corsOptions.origin}`);
});
