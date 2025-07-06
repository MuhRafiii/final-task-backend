import express from "express";
import {
  handleCreateProduct,
  handleDeleteProduct,
  handleGetProducts,
  handleRestoreProduct,
  handleUpdateProduct,
} from "../controllers/product";
import { authenticate } from "../middlewares/auth";
import { isAdmin } from "../middlewares/role";
import { upload } from "../utils/multer";

const router = express.Router();

router.get("/", authenticate, handleGetProducts);
router.post(
  "/add",
  authenticate,
  isAdmin,
  upload.single("picture"),
  handleCreateProduct
);
router.put(
  "/:id/update",
  authenticate,
  isAdmin,
  upload.single("picture"),
  handleUpdateProduct
);
router.delete("/:id/delete", authenticate, isAdmin, handleDeleteProduct);
router.patch("/:id/restore", authenticate, isAdmin, handleRestoreProduct);

export default router;
