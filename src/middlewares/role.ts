import { NextFunction, Request, Response } from "express";

export function isAdmin(req: Request, res: Response, next: NextFunction) {
  const user = (req as any).user;
  if (user.role !== "admin") {
    res
      .status(403)
      .json({ statusCode: 403, status: "error", message: "Forbidden" });
    return;
  }
  next();
}

export function isUser(req: Request, res: Response, next: NextFunction) {
  const user = (req as any).user;
  if (user.role !== "user") {
    res.status(403).json({
      statusCode: 403,
      status: "error",
      message: "You are not a user",
    });
    return;
  }
  next();
}
