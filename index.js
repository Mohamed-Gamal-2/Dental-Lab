import express from "express";
import connection from "./Database/Connection.js";
import dentistsRoutes from "./Modules/Dentists/Dentists.Routes.js";
import jobsRoutes from "./Modules/Jobs/jobs.Routes.js";
import staffRoutes from "./Modules/Staff/Staff.Routes.js";
import adminRoutes from "./Modules/Admin/Admin.Routes.js";
import managerRoutes from "./Modules/Manager/Manager.Routes.js";
import dotenv from "dotenv";
import morgan from "morgan";
import ApiError from "./utils/apiError.js";
import globalError from "./middleware/errorMiddleware.js";
import {createServer} from 'http'
dotenv.config({ path: "config.env" });

const server = express();

// const serv = createServer(server)


if (process.env.NODE_ENV === "development") {
  server.use(morgan("dev"));
  console.log(`mode : ${process.env.NODE_ENV}`);
}
server.use(express.json());
server.use(dentistsRoutes);
server.use(jobsRoutes);
server.use(staffRoutes);
server.use(adminRoutes);
server.use(managerRoutes);
server.use("*", (res, req, next) => {
  next(new ApiError(`can't find this route`, 400));
});
//Global error handle middleware for express
server.use(globalError);

connection();
const port = process.env.PORT || 3000;
const servers = server.listen(port, () => console.log("Server Started"));
