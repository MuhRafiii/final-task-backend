import { Request, Response } from "express";
import { login, register, updateUser } from "../services/auth";
import {
  loginSchema,
  registerSchema,
  updateUserSchema,
} from "../validations/auth";

export async function handleRegister(req: Request, res: Response) {
  try {
    const { error } = registerSchema.validate(req.body);
    if (error) {
      res
        .status(400)
        .json({ statusCode: 400, status: "error", error: error.message });
      return;
    }

    const { name, email, role, password } = req.body;
    const picture = req.file ? req.file.filename : "default.jpg";

    const user = await register(name, email, role, picture, password);

    res.status(201).json({
      statusCode: 201,
      status: "success",
      message: "User registered successfully",
      user,
    });
  } catch (err: any) {
    res
      .status(400)
      .json({ statusCode: 400, status: "error", message: err.message });
  }
}

export async function handleLogin(req: Request, res: Response) {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      res
        .status(400)
        .json({ statusCode: 400, status: "error", error: error.message });
      return;
    }

    const { email, password } = req.body;
    const result = await login(email, password);
    res.cookie("token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24,
    });
    res.status(200).json({
      statusCode: 200,
      status: "success",
      message: "Login successful",
      session: result.session,
    });
  } catch (err: any) {
    res
      .status(400)
      .json({ statusCode: 400, status: "error", message: err.message });
  }
}

export async function handleUpdateUser(req: Request, res: Response) {
  try {
    const { error } = updateUserSchema.validate(req.body);
    if (error) {
      res
        .status(400)
        .json({ statusCode: 400, status: "error", error: error.message });
      return;
    }

    if (!req.file) {
      res.status(400).json({
        statusCode: 400,
        status: "error",
        message: "Image is required",
      });
      return;
    }

    const user = (req as any).user;
    const { name } = req.body;
    const picture = req.file.filename;

    const update = await updateUser(user.id, name, picture);

    res.status(200).json({
      statusCode: 200,
      status: "success",
      message: "User updated successfully",
      update,
    });
  } catch (err: any) {
    res
      .status(400)
      .json({ statusCode: 400, status: "error", message: err.message });
  }
}
