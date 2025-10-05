import express from 'express';
import { deleteMedia, getAllMedia, getMediaById, streamMedia, uploadMedia, uploadMiddleware } from '../controllers/media.controller.js';
import { validateToken } from '../middleware/validateToken.js';

const router = express.Router();

router.use(validateToken);

router.post("/upload", uploadMiddleware, uploadMedia as express.RequestHandler);
router.get("/", getAllMedia);
router.get('/:id', getMediaById);
router.delete('/:id', deleteMedia);
router.get('/:id/stream', streamMedia);

export default router;