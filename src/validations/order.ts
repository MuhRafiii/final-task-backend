import Joi from "joi";

export const getAllOrdersSchema = Joi.object({
  sortBy: Joi.string().valid("email", "total", "createdAt"),
  orderBy: Joi.string().valid("asc", "desc"),
  minTotal: Joi.number(),
  maxTotal: Joi.number(),
  startDate: Joi.date(),
  endDate: Joi.date(),
  limit: Joi.number().integer().min(2).max(10),
  page: Joi.number().integer().min(1),
});

export const getOrdersByUserSchema = Joi.object({
  minCart: Joi.number().integer(),
  maxCart: Joi.number().integer(),
  minTotal: Joi.number(),
  maxTotal: Joi.number(),
  limit: Joi.number().integer().min(2).max(10),
  page: Joi.number().integer().min(1),
});

export const getMyOrdersSchema = Joi.object({
  sortBy: Joi.string().valid("total", "createdAt"),
  orderBy: Joi.string().valid("asc", "desc"),
  minTotal: Joi.number(),
  maxTotal: Joi.number(),
  startDate: Joi.date(),
  endDate: Joi.date(),
  limit: Joi.number().integer().min(2).max(10),
  page: Joi.number().integer().min(1),
});

export const createOrderSchema = Joi.object({
  cart: Joi.array()
    .items(
      Joi.object({
        productName: Joi.string().required(),
        quantity: Joi.number().required(),
      })
    )
    .required(),
});
