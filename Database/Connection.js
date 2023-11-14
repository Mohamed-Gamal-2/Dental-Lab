import managerModel from "./Models/Manager.Model.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from 'bcrypt';

const createManager = async () => {
  const managerCount = await managerModel.countDocuments();

  if (managerCount === 0) {
    const hashedPassword = bcrypt.hashSync("admin", 4);
    await managerModel.create({
      userName: "admin",
      password: hashedPassword,
      email: "admin@admin.com",
    });
    console.log(
      `there were no managers, created one!, userName:"admin", password:"admin"`
    );
  }
};

const connection = () => {
  mongoose
    .connect(process.env.DB_URI)
    .then((conn) => {
      console.log(`Database Connected ${conn.connection.host}`);

      createManager();
    })
    .catch((err) => {
      console.log(err);
    });
};

export default connection;
