import express from "express";
import { getAllAdmins, getOneAdmin, addAdmin, signInAdmin, updateAdmin, deleteAdmin} from "./Admin.Controller.js";
import validation from "../../middleware/validation.js";
import auth from "../../middleware/auth.js";
import { adminRegisterValidationSchema, adminSignInValidationSchema, adminUpdateValidationSchema } from "./Admin.Validation.js";
const adminRoutes = express.Router();

adminRoutes.get("/admin/all",auth, getAllAdmins);
adminRoutes.get("/admin/id", auth,getOneAdmin);
adminRoutes.post("/admin/add",validation(adminRegisterValidationSchema), addAdmin);
adminRoutes.post("/admin/signin",validation(adminSignInValidationSchema), signInAdmin);
adminRoutes.patch("/admin/:id",[auth,validation(adminUpdateValidationSchema)], updateAdmin);
adminRoutes.delete("/admin/:id",auth, deleteAdmin);

export default adminRoutes;
