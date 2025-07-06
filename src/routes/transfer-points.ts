import express from "express";
import { handleTransferPoints } from "../controllers/transfer-point";
import { authenticate } from "../middlewares/auth";
import { isUser } from "../middlewares/role";

const router = express.Router();

router.post("/", authenticate, isUser, handleTransferPoints);

export default router;
