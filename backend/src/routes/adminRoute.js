import { Router } from 'express';
import { checkAdmin, createAlbum, createSong, deleteAlbum, deleteSong } from '../controller/adminController.js';
import { protectRoute, requireAdmin } from '../middleware/authMiddleware.js';

const router = Router();

router.use(protectRoute, requireAdmin)

router.get('/check', protectRoute, requireAdmin, checkAdmin)

router.post('/songs', protectRoute, requireAdmin ,createSong);
router.delete('/songs/:id', protectRoute. requireAdmin, deleteSong);

router.post('/albums', protectRoute, requireAdmin, createAlbum);
router.post('/albums/:id', protectRoute, requireAdmin, deleteAlbum);

export default router;