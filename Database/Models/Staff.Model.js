import mongoose from "mongoose";

const { Schema } = mongoose;

const staffSchema = new Schema(
  {
    ssn: {
      type: Number,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    jobTitle: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    salary: {
      type: Number,
      required: true,
    },
    phone: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

const staffModel = mongoose.model("Staff", staffSchema);
export default staffModel;
