import express from "express";
import {
  addDentist,
  deleteDentist,
  getAllDentists,
  getDentist,
  updateDentist,
} from "./Dentists.Controller.js";
const dentistsRouter = express.Router();

dentistsRouter.get("/dentist/all", getAllDentists);
dentistsRouter.delete("/dentist/:id", deleteDentist);
dentistsRouter.patch("/dentist/:id", updateDentist);
dentistsRouter.get("/dentist/:id", getDentist);
dentistsRouter.post("/dentist/add", addDentist);

export default dentistsRouter;
