import mongoose from "mongoose";
const { Schema } = mongoose;
const adminSchema = new Schema(
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

const adminModel = mongoose.model("Admin", adminSchema);
export default adminModel;
