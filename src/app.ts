import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import path from "path";
import corsMiddleware from "./middlewares/cors";
import authRoute from "./routes/auth";
import userRoute from "./routes/order";
import productRoute from "./routes/product";
import transferPointRoute from "./routes/transfer-points";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(corsMiddleware);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/auth", authRoute);
app.use("/product", productRoute);
app.use("/order", userRoute);
app.use("/transfer-point", transferPointRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
