import Joi from "joi";

export const getProductsSchema = Joi.object({
  sortBy: Joi.string().valid("name", "price", "stocks", "createdAt"),
  orderBy: Joi.string().valid("asc", "desc"),
  minPrice: Joi.number(),
  maxPrice: Joi.number(),
  limit: Joi.number().integer().min(2).max(10),
  page: Joi.number().integer().min(1),
});

export const getDeletedProductsSchema = Joi.object({
  sortBy: Joi.string().valid("name", "stocks", "deletedAt"),
  orderBy: Joi.string().valid("asc", "desc"),
  limit: Joi.number().integer().min(2).max(10),
  page: Joi.number().integer().min(1),
});

export const createProductSchema = Joi.object({
  name: Joi.string().min(3).required(),
  description: Joi.string().min(5).required(),
  price: Joi.number().required(),
  stocks: Joi.number().min(1).required(),
});

export const updateProductSchema = Joi.object({
  name: Joi.string().min(3),
  description: Joi.string().min(5),
  price: Joi.number(),
  stocks: Joi.number(),
  picture: Joi.string(),
});
