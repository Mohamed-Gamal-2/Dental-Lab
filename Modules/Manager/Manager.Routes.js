import express from "express";
import { getAllManagers, getOneManager, addManager, signInManager, updateManager,deleteManager } from "./Manager.Controller.js";
import validation from "../../middleware/validation.js";
import auth from "../../middleware/auth.js";
import { managerRegisterValidationSchema, managerSignInValidationSchema, managerUpdateValidationSchema } from "./Manager.Validation.js";
const managerRoutes = express.Router();

managerRoutes.get("/manager/all",auth, getAllManagers);
managerRoutes.get("/manager/:id", auth,getOneManager);
managerRoutes.post("/manager/add",[auth,validation(managerRegisterValidationSchema,'body')], addManager);
managerRoutes.post("/manager/signin",validation(managerSignInValidationSchema,'body'), signInManager);
managerRoutes.patch("/manager/:id",[auth,validation(managerUpdateValidationSchema,'body')], updateManager);
managerRoutes.delete("/manager/:id",auth, deleteManager);

export default managerRoutes;
