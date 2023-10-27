import mongoose from "mongoose";

const connection = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/DentalLabDB")
    .then(() => {
      console.log("Database Connected");
    })
    .catch((err) => {
      console.log(err);
    });
};

export default connection;
