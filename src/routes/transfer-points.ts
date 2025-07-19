import express from "express";
import {
  handleGetPoint,
  handleTransferPoints,
} from "../controllers/transfer-point";
import { authenticate } from "../middlewares/auth";
import { isUser } from "../middlewares/role";

const router = express.Router();

router.get("/point", authenticate, isUser, handleGetPoint);
router.post("/", authenticate, isUser, handleTransferPoints);

export default router;
