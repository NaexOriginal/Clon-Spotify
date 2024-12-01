import express from 'express';
import { adminRoutes, albumRoutes, authRoutes, songRoutes, statsRoutes, userRoutes } from './routes/barrelRoutes.js';
import { connectDB } from './lib/db.js';


const app = express();
const puerto = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/song", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statsRoutes);


app.listen(puerto, () => {
  console.log(`El servidor esta ejecutandose en el puerto ${puerto}`);
  connectDB();
});