import mongoose from "mongoose";
const { Schema } = mongoose;
const dentistsSchema = new Schema(
  {
    createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "Admin",
    required: true,
  },
    type: {
      type: String,
      required: true,
      enum: {
        values: ["Indvidual", "Hospital", "Clinic"],
        message: "{VALUE} is not supported",
      },
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
      password: {
        type: String,
        required: true
      }
  },
  { timestamps: true }
);

const DentistsModel = mongoose.model("Dentist", dentistsSchema);
export default DentistsModel;
