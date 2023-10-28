import Joi from 'joi';



const staffRegisterValidationSchema = Joi.object({
    createdBy: Joi.string(), // You can specify ObjectId validation here
    ssn: Joi.number().integer().required(),
    name: Joi.string().required(),
    jobTitle: Joi.string().required(),
    age: Joi.number().integer().required(),
    salary: Joi.number().required(),
    phone: Joi.string().required(),
    email: Joi.string().email().required(),
    gender: Joi.string().valid('male', 'female').required(),
    role: Joi.string().valid('user', 'admin').default('user'),
  });

  const staffUpdateValidationSchema = Joi.object({
    ssn: Joi.number().integer(),
    name: Joi.string(),
    jobTitle: Joi.string(),
    age: Joi.number().integer(),
    salary: Joi.number(),
    phone: Joi.string(),
    email: Joi.string().email(),
    gender: Joi.string().valid('male', 'female'),
    role: Joi.string().valid('user', 'admin').default('user'),
  });



  export {staffRegisterValidationSchema, staffUpdateValidationSchema}