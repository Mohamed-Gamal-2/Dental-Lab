import express from "express";
import {
  getAllStaff,
  getOneStaff,
  addStaff,
  updataStaff,
  deleteStaff,
} from "./Staff.Controller.js";
const staffRouter = express.Router();

staffRouter.get("/staff/all", getAllStaff);
staffRouter.get("/staff/id", getOneStaff);
staffRouter.post("/staff/add", addStaff);
staffRouter.patch("/staff/:id", updataStaff);
staffRouter.delete("/staff/:id", deleteStaff);

export default staffRouter;
