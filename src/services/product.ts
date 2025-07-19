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
      id: true,
      name: true,
      description: true,
      price: true,
      stocks: true,
      picture: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (products.length === 0) throw new Error("Products not found");

  const fullProducts = products.map((product) => ({
    ...product,
    picture: `http://localhost:3000/uploads/${product.picture}`, // ⬅️ ubah path gambar
  }));

  const total = await prisma.product.count({ where: filters });
  return { fullProducts, total };
}

export async function getDeletedProducts(
  sortBy: string,
  orderBy: string,
  limit: string,
  page: string
) {
  const offset = (Number(page) - 1) * Number(limit);
  const products = await prisma.product.findMany({
    where: { status: false },
    orderBy: {
      [sortBy]: orderBy,
    },
    take: Number(limit),
    skip: offset,
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      stocks: true,
      picture: true,
      deletedAt: true,
    },
  });

  if (products.length === 0) throw new Error("Products not found");

  const deletedProducts = products.map((product) => ({
    ...product,
    picture: `http://localhost:3000/uploads/${product.picture}`, // ⬅️ ubah path gambar
  }));

  const total = await prisma.product.count({ where: { status: false } });
  return { deletedProducts, total };
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
