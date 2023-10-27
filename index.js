import express from "express";
import dentistsRouter from "./Modules/Dentists/Dentists.Router";
import jobsRouter from "./Modules/Jobs/jobs.Router";
import staffRouter from "./Modules/Staff/Staff.Router";
const server = express();
server.use(express.json());
server.use(dentistsRouter);
server.use(jobsRouter);
server.use(staffRouter);

server.listen(3000, () => console.log("Server Started"));
