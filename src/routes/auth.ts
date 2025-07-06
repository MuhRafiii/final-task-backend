import express from "express";
import {
  handleLogin,
  handleRegister,
  handleUpdateUser,
} from "../controllers/auth";
import { authenticate } from "../middlewares/auth";
import { upload } from "../utils/multer";

const router = express.Router();

router.post("/register", upload.single("picture"), handleRegister);
router.post("/login", handleLogin);
router.put(
  "/update-profile",
  authenticate,
  upload.single("picture"),
  handleUpdateUser
);

export default router;
