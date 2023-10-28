import mongoose, { Schema, model } from 'mongoose';
const jobSchema = new Schema(
  {
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'Staff',
      required: true,
    },
    serial: {
      type: Number,
      unique: true,
      required: true,
    },
    doctorId: {
      type: mongoose.Types.ObjectId,
      ref: 'Dentist',
      required: true,
    },
    typeOfWork: {
      type: String,
      enum: ['PFM', 'Zircon'],
      required: true,
    },
    teethNumber: [
      {
        type: Number,
        validate: {
          validator: Number.isInteger,
          message: 'Each value in teethNumber array must be an integer.',
        },
        required: true,
        min: 1,
        max: 32,
      },
    ],
    shade: {
      type: String,
      enum: [
        'A1',
        'A2',
        'A3',
        'A3.5',
        'A4',
        'B1',
        'B2',
        'B3',
        'B4',
        'C1',
        'C2',
        'C3',
        'C4',
        'D2',
        'D3',
        'D4',
      ],
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
    materialOfPorclain: { type: String, required: true },
  },
  { timestamps: true }
);

//........................Create Model.................................
const jobModel = model('Job', jobSchema); // import in controlled.js

export default jobModel;
