import Joi from "joi";

export const transferPointsSchema = Joi.object({
  receiverEmail: Joi.string().email().required(),
  amount: Joi.number().required(),
});
