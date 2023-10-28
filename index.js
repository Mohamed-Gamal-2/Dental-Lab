import express from "express";
import connection from "./Database/Connection.js";
import dentistsRoutes from "./Modules/Dentists/Dentists.Routes.js";
import jobsRoutes from "./Modules/Jobs/jobs.Routes.js";
import staffRoutes from "./Modules/Staff/Staff.Routes.js";
import adminRoutes from "./Modules/Admin/Admin.Routes.js";
import managerRoutes from "./Modules/Manager/Manager.Routes.js";


const server = express();
const port=6000;
server.use(express.json());
server.use(dentistsRoutes);
server.use(jobsRoutes);
server.use(staffRoutes);
server.use(adminRoutes)
server.use(managerRoutes)
connection();
server.listen(port, () => console.log("Server Started"));
