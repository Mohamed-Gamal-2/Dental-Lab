import Joi from "joi";

const staffRegisterValidationSchema = Joi.object({
  createdBy: Joi.string(), // You can specify ObjectId validation here
  ssn: Joi.string()
    .required()
    .pattern(/^\d{14}$/),
  name: Joi.string().required().min(3).max(30),
  jobTitle: Joi.string().required().min(3).max(30),
  age: Joi.number().integer().required().max(80).min(15),
  salary: Joi.number().required().max(30000),
  phone: Joi.string()
    .required()
    .pattern(/01(0|1|2|5)[0-9]{8}$/),
  email: Joi.string()
    .required()
    .pattern(/^[a-z]+([a-z]|[0-9]|_|.)*@(gmail|yahoo|hotmail).(com)$/),
  gender: Joi.string().valid("male", "female").required(),
  role: Joi.string().valid("user", "admin").default("user"),
});

const staffUpdateValidationSchema = Joi.object({
  ssn: Joi.string().pattern(/^\d{14}$/),
  name: Joi.string().min(3).max(30),
  jobTitle: Joi.string().min(3).max(30),
  age: Joi.number().integer().max(80).min(15),
  salary: Joi.number().max(30000),
  phone: Joi.string().pattern(/01(0|1|2|5)[0-9]{8}$/),
  email: Joi.string().pattern(
    /^[a-z]+([a-z]|[0-9]|_|.)*@(gmail|yahoo|hotmail).(com)$/
  ),
  gender: Joi.string().valid("male", "female"),
  role: Joi.string().valid("user", "admin").default("user"),
});

export { staffRegisterValidationSchema, staffUpdateValidationSchema };
