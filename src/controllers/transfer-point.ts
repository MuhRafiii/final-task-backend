import { Request, Response } from "express";
import { getPoint, transferPoints } from "../services/transfer.points";
import { transferPointsSchema } from "../validations/transfer-point";

export async function handleGetPoint(req: Request, res: Response) {
  try {
    const user = (req as any).user;
    const point = await getPoint(user.email);
    res.status(200).json({
      statusCode: 200,
      status: "success",
      message: "Points fetched successfully",
      point,
    });
  } catch (err: any) {
    res
      .status(400)
      .json({ statusCode: 400, status: "error", message: err.message });
  }
}

export async function handleTransferPoints(req: Request, res: Response) {
  try {
    const { error } = transferPointsSchema.validate(req.body);
    if (error) {
      res
        .status(400)
        .json({ statusCode: 400, status: "error", error: error.message });
      return;
    }

    const user = (req as any).user;
    const { receiverEmail, amount } = req.body;
    const transfer = await transferPoints(user.email, receiverEmail, amount);
    res.status(200).json({
      statusCode: 200,
      status: "success",
      message: "Points transferred successfully",
      transfer,
    });
  } catch (err: any) {
    res
      .status(400)
      .json({ statusCode: 400, status: "error", message: err.message });
  }
}
