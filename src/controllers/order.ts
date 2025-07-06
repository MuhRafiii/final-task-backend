import { Request, Response } from "express";
import {
  createOrder,
  getAllOrders,
  getMyOrders,
  getOrdersByUser,
} from "../services/order";
import {
  createOrderSchema,
  getAllOrdersSchema,
  getMyOrdersSchema,
  getOrdersByUserSchema,
} from "../validations/order";

export async function handleGetAllOrders(req: Request, res: Response) {
  try {
    const { error } = getAllOrdersSchema.validate(req.query);
    if (error) {
      res
        .status(400)
        .json({ statusCode: 400, status: "error", error: error.message });
      return;
    }

    const {
      sortBy = "createdAt",
      orderBy = "desc",
      minTotal = 0,
      maxTotal,
      startDate,
      endDate = new Date().toISOString(),
      limit = 10,
      page = 1,
    } = req.query;
    const orders = await getAllOrders(
      sortBy as string,
      orderBy as string,
      minTotal as string,
      maxTotal as string,
      startDate as string,
      endDate as string,
      limit as string,
      page as string
    );
    res.status(200).json({ statusCode: 200, status: "success", orders });
  } catch (err: any) {
    res
      .status(400)
      .json({ statusCode: 400, status: "error", message: err.message });
  }
}

export async function handleGetOrdersByUser(req: Request, res: Response) {
  try {
    const { error } = getOrdersByUserSchema.validate(req.query);
    if (error) {
      res
        .status(400)
        .json({ statusCode: 400, status: "error", error: error.message });
      return;
    }

    const {
      minCart = 0,
      maxCart,
      minTotal = 0,
      maxTotal,
      limit = 10,
      page = 1,
    } = req.query;

    const orders = await getOrdersByUser(
      minCart as string,
      maxCart as string,
      minTotal as string,
      maxTotal as string,
      limit as string,
      page as string
    );
    res.status(200).json({ statusCode: 200, status: "success", orders });
  } catch (err: any) {
    res
      .status(400)
      .json({ statusCode: 400, status: "error", message: err.message });
  }
}

export async function handleGetMyOrders(req: Request, res: Response) {
  try {
    const { error } = getMyOrdersSchema.validate(req.query);
    if (error) {
      res
        .status(400)
        .json({ statusCode: 400, status: "error", error: error.message });
      return;
    }

    const email = (req as any).user.email;
    const {
      sortBy = "createdAt",
      orderBy = "desc",
      minTotal = 0,
      maxTotal,
      startDate,
      endDate = new Date().toISOString(),
      limit = 10,
      page = 1,
    } = req.query;
    const orders = await getMyOrders(
      email,
      sortBy as string,
      orderBy as string,
      minTotal as string,
      maxTotal as string,
      startDate as string,
      endDate as string,
      limit as string,
      page as string
    );
    res.status(200).json({ statusCode: 200, status: "success", orders });
  } catch (err: any) {
    res
      .status(400)
      .json({ statusCode: 400, status: "error", message: err.message });
  }
}

export async function handleCreateOrder(req: Request, res: Response) {
  try {
    const { error } = createOrderSchema.validate(req.body);
    if (error) {
      res
        .status(400)
        .json({ statusCode: 400, status: "error", error: error.message });
      return;
    }

    const { cart } = req.body;
    const email = (req as any).user.email;
    const order = await createOrder(email, cart);
    res.status(201).json({
      statusCode: 201,
      status: "success",
      message: "Order created successfully",
      order,
    });
  } catch (err: any) {
    res
      .status(400)
      .json({ statusCode: 400, status: "error", message: err.message });
  }
}
