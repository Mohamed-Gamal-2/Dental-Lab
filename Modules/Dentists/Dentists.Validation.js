import Joi from "joi";

const dentistRegisterValidationSchema = Joi.object({
  type: Joi.string().valid("Indvidual", "Hospital", "Clinic").required(),
  name: Joi.string().required(),
  phone: Joi.string()
    .required()
    .pattern(/[0-9]+/),
  address: Joi.string().required(),
  email: Joi.string().email().required(),
});

const dentistUpdateValidationSchema = Joi.object({
  type: Joi.string().valid("Indvidual", "Hospital", "Clinic"),
  name: Joi.string(),
  phone: Joi.string().pattern(/[0-9]+/),
  address: Joi.string(),
  email: Joi.string().email(),
});

export { dentistRegisterValidationSchema, dentistUpdateValidationSchema };
