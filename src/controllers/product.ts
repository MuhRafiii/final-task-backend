import { Request, Response } from "express";
import {
  createProduct,
  deleteProduct,
  getProducts,
  restoreProduct,
  updateProduct,
} from "../services/product";
import {
  createProductSchema,
  getProductsSchema,
  updateProductSchema,
} from "../validations/product";

export async function handleGetProducts(req: Request, res: Response) {
  try {
    const { error } = getProductsSchema.validate(req.query);
    if (error) {
      res
        .status(400)
        .json({ statusCode: 400, status: "error", error: error.message });
      return;
    }

    const {
      sortBy = "name",
      orderBy = "asc",
      minPrice = 0,
      maxPrice,
      limit = 10,
      page = 1,
    } = req.query;
    const products = await getProducts(
      sortBy as string,
      orderBy as string,
      minPrice as string,
      maxPrice as string,
      limit as string,
      page as string
    );
    res.status(200).json({ statusCode: 200, status: "success", products });
  } catch (err: any) {
    res
      .status(400)
      .json({ statusCode: 400, status: "error", message: err.message });
  }
}

export async function handleCreateProduct(req: Request, res: Response) {
  try {
    const { error } = createProductSchema.validate(req.body);
    if (error) {
      res
        .status(400)
        .json({ statusCode: 400, status: "error", error: error.message });
      return;
    }

    const { name, description, price, stocks } = req.body;
    const picture = req.file ? req.file.filename : "placeholder.png";

    const product = await createProduct(
      name,
      description,
      Number(price),
      Number(stocks),
      picture
    );

    res.status(201).json({
      statusCode: 201,
      status: "success",
      message: "Product created successfully",
      product,
    });
  } catch (err: any) {
    res
      .status(400)
      .json({ statusCode: 400, status: "error", message: err.message });
  }
}

export async function handleUpdateProduct(req: Request, res: Response) {
  try {
    const { error } = updateProductSchema.validate(req.body);
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

    const { id } = req.params;
    const { name, description, price, stocks } = req.body;
    const picture = req.file.filename;

    const product = await updateProduct(
      Number(id),
      name,
      description,
      Number(price),
      Number(stocks),
      picture
    );

    res.status(200).json({
      statusCode: 200,
      status: "success",
      message: "Product updated successfully",
      product,
    });
  } catch (err: any) {
    res
      .status(400)
      .json({ statusCode: 400, status: "error", message: err.message });
  }
}

export async function handleDeleteProduct(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const product = await deleteProduct(Number(id));
    res.status(200).json({
      statusCode: 200,
      status: "success",
      message: "Product deleted successfully",
      product,
    });
  } catch (err: any) {
    res
      .status(400)
      .json({ statusCode: 400, status: "error", message: err.message });
  }
}

export async function handleRestoreProduct(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const product = await restoreProduct(Number(id));
    res.status(200).json({
      statusCode: 200,
      status: "success",
      message: "Product restored successfully",
      product,
    });
  } catch (err: any) {
    res
      .status(400)
      .json({ statusCode: 400, status: "error", message: err.message });
  }
}
