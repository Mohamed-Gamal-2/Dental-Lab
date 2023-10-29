import express from "express";
import { addJob, allJobs, deleteJob, getJob, updateJob } from "./Jobs.Controller.js";
import validation from "../../middleware/validation.js";
import auth from "../../middleware/auth.js";
import { jobRegisterValidationSchema, jobUpdateValidationSchema } from "./Jobs.Validation.js";
const jobsRoutes = express.Router();

jobsRoutes.get("/jobs/all", allJobs);
jobsRoutes.post("/job/add",[auth,validation(jobRegisterValidationSchema)],addJob);
jobsRoutes.delete("/job/:id",auth ,deleteJob);
jobsRoutes.patch("/job/:id",[auth,validation(jobUpdateValidationSchema)],updateJob );
jobsRoutes.get("/job/:id",auth,getJob );

// 
export default jobsRoutes;

