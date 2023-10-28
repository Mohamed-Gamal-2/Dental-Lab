import Joi from 'joi';




const jobRegisterValidationSchema = Joi.object({
    createdBy: Joi.string(), 
  serial: Joi.number().integer(),
  doctorId: Joi.string().required(), 
  typeOfWork: Joi.string().valid('PFM', 'Zircon').required(),
  teethNumber: Joi.array()
    .items(Joi.number().integer().min(1).max(32))
    .required(),
  shade: Joi.string().valid(
    'A1', 'A2', 'A3', 'A3.5', 'A4',
    'B1', 'B2', 'B3', 'B4',
    'C1', 'C2', 'C3', 'C4',
    'D2', 'D3', 'D4'
  ).required(),
  deadLine: Joi.date().required(),
  price: Joi.number().required(),
  tryIn: Joi.boolean().required(),
  materialOfPorclain: Joi.string().required() 
  });

  const jobUpdateValidationSchema = Joi.object({
    createdBy: Joi.string(), 
  serial: Joi.number().integer(),
  doctorId: Joi.string(), 
  typeOfWork: Joi.string().valid('PFM', 'Zircon'),
  teethNumber: Joi.array()
    .items(Joi.number().integer().min(1).max(32))
    ,
  shade: Joi.string().valid('A1', 'A2', 'A3', 'A3.5', 'A4',
  'B1', 'B2', 'B3', 'B4',
  'C1', 'C2', 'C3', 'C4',
  'D2', 'D3', 'D4'),
  deadLine: Joi.date(),
  price: Joi.number(),
  tryIn: Joi.boolean(),
  materialOfPorclain: Joi.string() 
  });
  


export {jobRegisterValidationSchema,jobUpdateValidationSchema}