import express from 'express';
import { getTreks, getTrekById, createTrek, updateTrek, deleteTrek } from '../controllers/trekController';
import { protect, admin } from '../middleware/authMiddleware';
import { upload } from '../middleware/uploadMiddleware';

const router = express.Router();

const uploadFields = [
  { name: 'image', maxCount: 1 },
  { name: 'images', maxCount: 5 }
];

router.route('/')
  .get(getTreks)
  .post(protect, admin, upload.fields(uploadFields), createTrek);

router.route('/:id')
  .get(getTrekById)
  .put(protect, admin, upload.fields(uploadFields), updateTrek)
  .delete(protect, admin, deleteTrek);

export default router;
