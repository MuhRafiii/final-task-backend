import dotenv from "dotenv";
import { prisma } from "../prisma/client";

dotenv.config();

export async function getAllOrders(
  sortBy: string,
  orderBy: string,
  minTotal: string,
  maxTotal: string,
  startDate: string,
  endDate: string,
  limit: string,
  page: string
) {
  const filters: any = {};
  if (minTotal || maxTotal) {
    if (minTotal) filters.total = { gte: parseFloat(minTotal) };
    if (maxTotal)
      filters.total = { ...(filters.total || {}), lte: parseFloat(maxTotal) };
  } else if (startDate || endDate) {
    if (startDate) filters.createdAt = { gte: startDate };
    if (endDate)
      filters.createdAt = { ...(filters.createdAt || {}), lte: endDate };
  }

  const offset = (Number(page) - 1) * Number(limit);
  const orders = await prisma.order.findMany({
    where: filters,
    orderBy: {
      [sortBy]: orderBy,
    },
    take: Number(limit),
    skip: offset,
  });

  if (orders.length === 0) {
    throw new Error("No orders found");
  }

  const total = await prisma.order.count({ where: filters });
  return { orders, total };
}

export async function getOrdersByUser(
  minCart: string,
  maxCart: string,
  minTotal: string,
  maxTotal: string,
  limit: string,
  page: string
) {
  const filters: any = {};
  if (minCart || maxCart) {
    if (minCart)
      filters.cart = {
        gte: parseInt(minCart),
      };
    if (maxCart)
      filters.cart = {
        ...(filters.cart || {}),
        lte: parseInt(maxCart),
      };
  } else if (minTotal || maxTotal) {
    if (minTotal)
      filters.total = {
        gte: parseFloat(minTotal),
      };
    if (maxTotal)
      filters.total = {
        ...(filters.total || {}),
        lte: parseFloat(maxTotal),
      };
  }

  const offset = (Number(page) - 1) * Number(limit);
  const orders = await prisma.order.groupBy({
    by: ["email"],
    where: filters,
    orderBy: {
      email: "asc",
    },
    _count: {
      cart: true,
    },
    _sum: {
      total: true,
    },
    take: Number(limit),
    skip: offset,
  });

  const result = orders.map((order) => {
    return {
      email: order.email,
      cart: order._count.cart,
      total: order._sum.total,
    };
  });

  const total = await prisma.order.count({ where: filters });
  return { result, total };
}

export async function getMyOrders(
  email: string,
  sortBy: string,
  orderBy: string,
  minTotal: string,
  maxTotal: string,
  startDate: string,
  endDate: string,
  limit: string,
  page: string
) {
  const filters: any = { email };
  if (minTotal || maxTotal) {
    if (minTotal) filters.total = { gte: parseFloat(minTotal) };
    if (maxTotal)
      filters.total = { ...(filters.total || {}), lte: parseFloat(maxTotal) };
  } else if (startDate || endDate) {
    if (startDate) filters.createdAt = { gte: startDate };
    if (endDate)
      filters.createdAt = { ...(filters.createdAt || {}), lte: endDate };
  }

  const offset = (Number(page) - 1) * Number(limit);
  const orders = await prisma.order.findMany({
    where: filters,
    orderBy: {
      [sortBy]: orderBy,
    },
    take: Number(limit),
    skip: offset,
    select: {
      id: true,
      cart: true,
      total: true,
      createdAt: true,
    },
  });
  if (orders.length === 0) {
    throw new Error("No orders found");
  }

  const total = await prisma.order.count({ where: filters });
  return { orders, total };
}

export async function createOrder(email: string, cart: any) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("User not found");

  let total = 0;

  for (const item of cart) {
    const product = await prisma.product.findUnique({
      where: { name: item.productName },
    });

    if (!product) throw new Error(`Product ${item.productName} not found`);
    total += product.price * item.quantity;
  }

  const order = await prisma.$transaction(async (tx) => {
    const point = total / Number(process.env.POINT);
    const orders = await tx.order.create({
      data: { email, cart, total },
    });

    const points = await tx.point.update({
      where: { email },
      data: { points: { increment: point } },
    });

    return { orders, points };
  });

  return order;
}
