import mongoose, { Schema, model } from 'mongoose';
const jobSchema = new Schema(
  {
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
    pationName: {
      type: String,
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
    teethNumber: [
      {
        type: String,
        required: true,
      },
    ],

    shade: {
      type: String,
      required:true
    },
    deadLine: {
      type: Date,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    comments: String ,
    tryIn: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

//........................Create Model.................................
const jobModel = model('Job', jobSchema); // import in controlled.js

export default jobModel;


