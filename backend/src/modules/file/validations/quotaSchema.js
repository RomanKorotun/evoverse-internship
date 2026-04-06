import Joi from "joi";

const quotaSchema = Joi.object({
  quota: Joi.number()
    .integer()
    .min(1024 * 1024)
    .max(1024 * 1024 * 1024)
    .required()
    .strict(),
});

export default quotaSchema;
