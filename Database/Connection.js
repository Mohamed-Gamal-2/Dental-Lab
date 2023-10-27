import mongoose from "mongoose";

const connection = () => {
  mongoose
    .connect("mongodb://localhost:27017")
    .then(() => {
      console.log("Database Connected");
    })
    .catch((err) => {
      console.log(err);
    });
};

export default connection;
