import express from 'express';
import fileUpload from 'express-fileupload';
import path from 'path';

import { adminRoutes, albumRoutes, authRoutes, songRoutes, statsRoutes, userRoutes } from './routes/barrelRoutes.js';
import { clerkMiddleware } from '@clerk/express'
import { connectDB } from './lib/db.js';


const __dirname = path.resolve();
const app = express();
const puerto = process.env.PORT || 3000;

app.use(express.json());
app.use(clerkMiddleware());
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: path.join(__dirname, 'temp'),
  createParentPath: true,
  limits: {
    fileSize: 10 * 1024 * 1024  // 10MB como almacenamineto maximo de archivo
  }
}))

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/song", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statsRoutes);


// Error handler
app.use((err, req, res, next) => {
  res.status(500).json({
    mensaje: process.env.NODE_ENV === 'production' ? 'Error interno del servidor' : err.message
  });
});

app.listen(puerto, () => {
  console.log(`El servidor esta ejecutandose en el puerto ${puerto}`);
  connectDB();
});


// Todo: El Web Socket debe ser implementado