import express from "express";
import {
  handleCreateOrder,
  handleGetAllOrders,
  handleGetMyOrders,
  handleGetOrdersByUser,
} from "../controllers/order";
import { authenticate } from "../middlewares/auth";
import { isAdmin, isUser } from "../middlewares/role";

const router = express.Router();

router.get("/", authenticate, isAdmin, handleGetAllOrders);
router.get("/group-by-user", authenticate, isAdmin, handleGetOrdersByUser);
router.get("/my-orders", authenticate, isUser, handleGetMyOrders);
router.post("/add", authenticate, isUser, handleCreateOrder);

export default router;
