import os
from dotenv import load_dotenv

load_dotenv() # Cargar variables de entorno desde .env

# Configuración de la aplicación
SECRET_KEY = os.getenv("SECRET_KEY", "tu_clave_secreta_jwt_aqui")
JWT_ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))

# Configuración de la base de datos
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./sql_app.db")

# Orígenes permitidos para CORS (se sobrescribe con FRONTEND_URL en Render)
CORS_ORIGINS = os.getenv("CORS_ORIGINS", "http://localhost:5173,http://localhost:3000").split(',')