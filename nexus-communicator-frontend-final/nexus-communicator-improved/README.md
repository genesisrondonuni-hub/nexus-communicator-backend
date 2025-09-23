# Nexus Communicator - Frontend

Plataforma de mensajería avanzada con IA integrada construida con React y Vite.

## 🚀 Características

- **Interfaz Moderna**: Diseño responsivo con Tailwind CSS y componentes shadcn/ui
- **Autenticación Segura**: Sistema de login/registro con gestión de sesiones
- **Gestión de Contactos**: Importación desde Excel, CSV y Google Sheets
- **Campañas Inteligentes**: Creador de campañas con asistencia de IA (Gemini 2.5 Pro)
- **Automatización**: Respuestas automáticas inteligentes
- **Analytics en Tiempo Real**: Dashboard con métricas y gráficos interactivos
- **Multimedia**: Soporte para imágenes, videos y documentos

## 📋 Requisitos Previos

- Node.js 18+ 
- npm o yarn
- Backend de Nexus Communicator ejecutándose

## 🛠️ Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <repository-url>
   cd nexus-communicator-frontend
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.example .env
   # Edita .env con tu configuración
   ```

4. **Iniciar en modo desarrollo**
   ```bash
   npm run dev
   ```

## 🏗️ Construcción para Producción

```bash
npm run build
```

Los archivos optimizados se generarán en la carpeta `dist/`.

## 🌐 Despliegue en Netlify

### Opción 1: Drag & Drop
1. Ejecuta `npm run build`
2. Arrastra la carpeta `dist/` a Netlify

### Opción 2: Git Integration
1. Conecta tu repositorio a Netlify
2. Configuración de build:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`

### Variables de Entorno en Netlify
Configura estas variables en Netlify Dashboard > Site Settings > Environment Variables:

```
VITE_API_BASE_URL=https://tu-backend-url.com/api
```

## 🔧 Configuración

### API Backend
Asegúrate de que el backend esté ejecutándose y accesible. Actualiza `VITE_API_BASE_URL` en tu archivo `.env`.

### Autenticación
La aplicación usa autenticación basada en sesiones con cookies. Asegúrate de que el backend tenga CORS configurado correctamente.

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes React
│   ├── ui/             # Componentes base (shadcn/ui)
│   ├── Dashboard.jsx   # Panel principal
│   ├── Contacts.jsx    # Gestión de contactos
│   ├── CampaignCreator.jsx # Creador de campañas
│   ├── Settings.jsx    # Configuración
│   └── ...
├── context/            # Contextos de React
│   └── AuthContext.jsx # Contexto de autenticación
├── services/           # Servicios API
│   └── api.js         # Cliente API
├── App.jsx            # Componente principal
└── main.jsx          # Punto de entrada
```

## 🎨 Tecnologías Utilizadas

- **React 18**: Framework principal
- **Vite**: Build tool y dev server
- **Tailwind CSS**: Framework de estilos
- **shadcn/ui**: Componentes UI
- **Framer Motion**: Animaciones
- **Lucide React**: Iconos
- **Recharts**: Gráficos y visualizaciones

## 🔐 Seguridad

- Autenticación basada en sesiones
- Validación de formularios
- Sanitización de datos
- Headers de seguridad configurados

## 📱 Responsive Design

La aplicación está optimizada para:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🐛 Solución de Problemas

### Error de CORS
Si encuentras errores de CORS, verifica que el backend tenga configurado:
```python
CORS(app, supports_credentials=True, origins=["http://localhost:5173"])
```

### Variables de entorno no funcionan
- Asegúrate de que las variables empiecen con `VITE_`
- Reinicia el servidor de desarrollo después de cambiar `.env`

### Build falla
- Verifica que todas las dependencias estén instaladas
- Ejecuta `npm run lint` para verificar errores de código

## 📞 Soporte

Para soporte técnico:
- Email: soporte@nexuscommunicator.com
- Documentación: [Ver documentación completa](./docs/)

## 📄 Licencia

© 2024 Nexus Communicator. Todos los derechos reservados.

