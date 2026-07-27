import express from 'express';
import { getUsers, deleteUser, updateUserRole } from '../controllers/userController';
import { protect, admin } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/')
  .get(protect, admin, getUsers);

router.route('/:id')
  .delete(protect, admin, deleteUser)
  .put(protect, admin, updateUserRole);

export default router;
