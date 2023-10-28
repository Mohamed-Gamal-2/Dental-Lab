import managerModel from "./Models/Manager.Model.js";
import mongoose from "mongoose";



const createManager = async ()=>{
  const managerCount = await managerModel.countDocuments();

if (managerCount === 0) {
await managerModel.create({
userName: "admin",
password: "admin",
email:"admin@admin.com"
})
console.log(`there were no managers, created one!, userName:"admin", password:"admin"`)}}


const connection = () => {
  mongoose

    .connect("mongodb://127.0.0.1:27017/DentalLabDB")
    .then(() => {
      console.log("Database Connected");
      
      createManager()
    })
    .catch((err) => {
      console.log(err);
    });
};

export default connection;
