import express from "express";
import { addJob, allJobs, deleteJob, getJob, updateJob } from "./Jobs.Controller.js";
const jobsRouter = express.Router();

jobsRouter.get("/jobs/all", allJobs);
jobsRouter.post("/job/add",addJob);
jobsRouter.delete("/job/:id" ,deleteJob);
jobsRouter.patch("/job/:id",updateJob );
jobsRouter.get("/job/:id",getJob );


export default jobsRouter;

