import Joi from "joi";

const dentistRegisterValidationSchema = Joi.object({
  type: Joi.string().valid("Indvidual", "Hospital", "Clinic").required(),
  name: Joi.string().required().min(3).max(30),
  phone: Joi.string()
    .pattern(/01(0|1|2|5)[0-9]{8}$/)
    .required(),
  address: Joi.string().min(4).required(),
  email: Joi.string()
    .pattern(/^[a-z]+([a-z]|[0-9]|_|.)*@(gmail|yahoo|hotmail).(com)$/)
    .required(),
  password: Joi.string()
    .pattern(/^[A-Za-z0-9!@#$%^&*()-_+=]{4,}$/)
    .allow(""),
});

const dentistUpdateValidationSchema = Joi.object({
  type: Joi.string().valid("Indvidual", "Hospital", "Clinic"),
  name: Joi.string().min(3).max(30),
  phone: Joi.string().pattern(/01(0|1|2|5)[0-9]{8}$/),
  address: Joi.string().min(4),
  email: Joi.string().pattern(
    /^[a-z]+([a-z]|[0-9]|_|.)*@(gmail|yahoo|hotmail).(com)$/
  ),
});

const dentistLoginValidationSchema = Joi.object({
  email: Joi.string().pattern(
    /^[a-z]+([a-z]|[0-9]|_|.)*@(gmail|yahoo|hotmail).(com)$/
  ),
  password: Joi.string().pattern(/^[A-Za-z0-9!@#$%^&*()-_+=]{4,}$/),
});

const dentistUpdateEndUserValidationSchema = Joi.object({
  type: Joi.string().valid("Indvidual", "Hospital", "Clinic"),
  name: Joi.string().min(3).max(30),
  phone: Joi.string().pattern(/01(0|1|2|5)[0-9]{8}$/),
  address: Joi.string().min(4),
  email: Joi.string().pattern(
    /^[a-z]+([a-z]|[0-9]|_|.)*@(gmail|yahoo|hotmail).(com)$/
  ),
  password: Joi.string()
    .pattern(/^[A-Za-z0-9!@#$%^&*()-_+=]{4,}$/)
    .allow(""),
});

export {
  dentistRegisterValidationSchema,
  dentistUpdateValidationSchema,
  dentistLoginValidationSchema,
  dentistUpdateEndUserValidationSchema,
};
