import mongoose from "mongoose";
const { Schema } = mongoose;
const managerSchema = new Schema(
    {
      email: {
        type: String,
        required: true, 
        unique: true,
      },
      userName: {
        type: String,
        required: true, 
        unique: true,
      },
      password: {
        type: String,
        required: true, 
        unique: true,
      },
    },
    { timestamps: true }
  );

const managerModel = mongoose.model("Manager", managerSchema);


export default managerModel;
