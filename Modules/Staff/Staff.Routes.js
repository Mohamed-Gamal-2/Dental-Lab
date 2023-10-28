import express from "express";
import {
  getAllStaff,
  getOneStaff,
  addStaff,
  updataStaff,
  deleteStaff,
} from "./Staff.Controller.js";

import validation from "../../middleware/validation.js";
import auth from "../../middleware/auth.js";
import { staffRegisterValidationSchema, staffUpdateValidationSchema } from "./Staff.Validation.js";
const staffRoutes = express.Router();

staffRoutes.get("/staff/all",auth, getAllStaff);
staffRoutes.get("/staff/id",auth, getOneStaff);
staffRoutes.post("/staff/add",[auth,validation(staffRegisterValidationSchema)], addStaff);
staffRoutes.patch("/staff/:id",[auth,validation(staffUpdateValidationSchema)], updataStaff);
staffRoutes.delete("/staff/:id",auth, deleteStaff);

export default staffRoutes;
