import express from "express";
import {
  addDentist,
  deleteDentist,
  getAllDentists,
  getDentist,
  updateDentist,
  loginDentist, 
  getDentistEndUser,
  updateDentistEndUser
} from "./Dentists.Controller.js";
import validation from "../../middleware/validation.js";
import auth from "../../middleware/auth.js";
import {
  dentistRegisterValidationSchema,
  dentistUpdateValidationSchema,
  dentistLoginValidationSchema,
  dentistUpdateEndUserValidationSchema
} from "./Dentists.Validation.js";
const dentistsRoutes = express.Router();

dentistsRoutes.get("/dentist/all", auth, getAllDentists);
dentistsRoutes.delete("/dentist/:id", auth, deleteDentist);
dentistsRoutes.patch(
  "/dentist/:id",
  [auth, validation(dentistUpdateValidationSchema, "body")],
  updateDentist
);
dentistsRoutes.get("/dentist/:id", auth, getDentist);
dentistsRoutes.post("/dentist/add",validation(dentistRegisterValidationSchema, "body"),addDentist);
dentistsRoutes.post("/dentist/login",validation(dentistLoginValidationSchema, "body"),loginDentist);
dentistsRoutes.get("/getDentistEndUser",auth,getDentistEndUser);
dentistsRoutes.patch("/updateDentistEndUser/:id",[auth,validation(dentistUpdateEndUserValidationSchema)], updateDentistEndUser);



export default dentistsRoutes;
