import Joi from "joi";

export const registerSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  role: Joi.string().valid("user", "admin"),
  password: Joi.string().min(6).required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const updateUserSchema = Joi.object({
  name: Joi.string().min(3),
  picture: Joi.string(),
});
