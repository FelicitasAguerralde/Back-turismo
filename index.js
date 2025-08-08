require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

// Routes
const cardsRoutes = require('./routes/cards.routes');
const utilsRoutes = require('./routes/utils.routes');
const userRoutes = require('./routes/user.routes');
const translateRoutes = require('./routes/translate');
const carouselRoutes = require('./routes/carousel.routes');

// Configuración de Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors({
  origin: true,  // Permite cualquier origen (ajusta en producción si es necesario)
  credentials: true,
}));

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos
app.use('/public', express.static(path.join(__dirname, 'public')));

// Rutas
app.use('/api', cardsRoutes);
app.use('/api', utilsRoutes);
app.use('/api', userRoutes);
app.use('/api', carouselRoutes);
app.use('/api/translate', translateRoutes);

// Ruta de salud para verificar el despliegue
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: `Servidor backend operativo en el puerto ${PORT}` 
  });
});

// Manejo de errores global (opcional pero recomendado)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo salió mal en el servidor' });
});

// Iniciar servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`
  ==================================================
  ✅ Servidor backend escuchando en el puerto ${PORT}
  🚀 Entorno: ${process.env.NODE_ENV || 'development'}
  🌐 URL local: http://localhost:${PORT}
  ==================================================
  `);
});