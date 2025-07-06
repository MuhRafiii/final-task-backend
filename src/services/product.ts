import { prisma } from "../prisma/client";

export async function getProducts(
  sortBy: string,
  orderBy: string,
  minPrice: string,
  maxPrice: string,
  limit: string,
  page: string
) {
  const filters: any = { status: true };
  if (minPrice) filters.price = { gte: parseFloat(minPrice) };
  if (maxPrice)
    filters.price = { ...(filters.price || {}), lte: parseFloat(maxPrice) };

  const offset = (Number(page) - 1) * Number(limit);
  const products = await prisma.product.findMany({
    where: filters,
    orderBy: {
      [sortBy]: orderBy,
    },
    take: Number(limit),
    skip: offset,
    select: {
      name: true,
      description: true,
      price: true,
      stocks: true,
      picture: true,
    },
  });

  if (products.length === 0) throw new Error("Products not found");

  const total = await prisma.product.count({ where: filters });
  return { products, total };
}

export async function createProduct(
  name: string,
  description: string,
  price: number,
  stocks: number,
  picture: string
) {
  let product = await prisma.product.findUnique({ where: { name } });
  if (product) {
    throw new Error("Product already exists");
  }

  product = await prisma.product.create({
    data: { name, description, price, stocks, picture },
  });
  return { product };
}

export async function updateProduct(
  id: number,
  name: string,
  description: string,
  price: number,
  stocks: number,
  picture: string
) {
  let product = await prisma.product.findUnique({ where: { id } });
  if (!product) {
    throw new Error("Product not found");
  }

  if (product.status === false) throw new Error("Product already deleted");

  product = await prisma.product.update({
    where: { id },
    data: { name, description, price, stocks, picture },
  });
  return product;
}

export async function deleteProduct(id: number) {
  let product = await prisma.product.findUnique({ where: { id } });
  if (!product) {
    throw new Error("Product not found");
  }

  if (product.status === false) throw new Error("Product already deleted");

  product = await prisma.product.update({
    where: { id },
    data: { deletedAt: new Date(), status: false },
  });
  return product;
}

export async function restoreProduct(id: number) {
  let product = await prisma.product.findUnique({ where: { id } });
  if (!product) {
    throw new Error("Product not found");
  }

  if (product.status === true) throw new Error("Product not deleted");

  product = await prisma.product.update({
    where: { id },
    data: { deletedAt: null, status: true },
  });
  return product;
}
