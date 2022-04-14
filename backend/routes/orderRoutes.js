import express from 'express';
const router = express.Router();
import {
  addOrderItems,
  getOrderById
} from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';


router.route('/').post(protect, addOrderItems)
// :/id has to be at the bottom or else it wont find
router.route('/:id').get(protect, getOrderById)


export default router

