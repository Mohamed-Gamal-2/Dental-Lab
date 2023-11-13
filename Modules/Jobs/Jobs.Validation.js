import Joi from "joi";

const jobRegisterValidationSchema = Joi.object({
  createdBy: Joi.string(),
  serial: Joi.number().integer(),
  doctorId: Joi.string().required(),
  pationName: Joi.string()
    .max(40)
    .pattern(/^[a-zA-Z\s()]+$/)
    .required(),
  typeOfWork: Joi.string().valid("PFM", "Zircon").required(),
  teethNumber: Joi.array().items(Joi.string()).required(),
  shade: Joi.string().required(),
  deadLine: Joi.date().required(),
  price: Joi.number().required(),
  tryIn: Joi.boolean().required(),
  comments: Joi.string(),
  status: Joi.string().valid("cast", "build", "finish").required(),
});

const jobUpdateValidationSchema = Joi.object({
  createdBy: Joi.string(),
  serial: Joi.number().integer(),
  pationName: Joi.string(),
  doctorId: Joi.string(),
  typeOfWork: Joi.string().valid("PFM", "Zircon"),
  teethNumber: Joi.array().items(Joi.string()),
  shade: Joi.string(),
  deadLine: Joi.date(),
  price: Joi.number(),
  tryIn: Joi.boolean(),
  comments: Joi.string(),
  status: Joi.string().valid("cast", "build", "finish"),
});

export { jobRegisterValidationSchema, jobUpdateValidationSchema };
