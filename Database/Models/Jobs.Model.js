import mongoose, { Schema, model } from "mongoose";
const jobSchema = new Schema({
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "Staff",
    required: true,
  },
  serial: {
    type: Number,
    unique: true,
    required: true,
  },
  doctorId: {
    type: mongoose.Types.ObjectId,
    ref: "Dentist",
    required: true,
  },
  typeOfWork: {
    type: String,
    enum: ["PFM", "Zircon"],
    required: true,
  },
  teethNumber: {
    type: Number,
    min: 1,
    max: 32,
    validate: {
      validator: Number.isInteger,
      message: "YourField must be an integer.",
    },
    required: true,
  },
  shade: {
    type: String,
    required: true,
  },
  deadLine: {
    type: Date,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  tryIn: {
    type: Boolean,
    required: true,
  },
  materialOfPorclain: String,
},
{timestamps:true}
);

//........................Create Model.................................
const jobModel = model("Job", jobSchema); // import in controlled.js

export default jobModel;