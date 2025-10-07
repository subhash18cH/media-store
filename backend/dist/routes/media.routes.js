import express from 'express';
import { getAllMedia, uploadMedia, uploadMiddleware } from '../controllers/media.controller.js';
import { validateToken } from '../middleware/validateToken.js';
const router = express.Router();
router.use(validateToken);
router.get("/", getAllMedia);
router.post("/upload", uploadMiddleware, uploadMedia);
export default router;
//# sourceMappingURL=media.routes.js.map