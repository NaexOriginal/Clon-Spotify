import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.send('Ruta de estadisticas adquirida con metodo GET');
})

export default router;