import Joi from "joi"

const adminRegisterValidationSchema= Joi.object({
  email: Joi.string().email().required(),
  userName: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().required().pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,}$/)
});

  const adminSignInValidationSchema = Joi.object({
    userName: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string()
      .required().pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,}$/)

  });

  const adminUpdateValidationSchema = Joi.object({
    email: Joi.string().email(),
    userName: Joi.string().alphanum().min(3).max(30),
    password: Joi.string().pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,}$/)
      ,
  
  });

  export {adminRegisterValidationSchema, adminSignInValidationSchema, adminUpdateValidationSchema }