import asyncHandler from "express-async-handler";
import staffModel from "../../Database/Models/Staff.Model.js";
import ApiError from "../../utils/apiError.js";
import adminModel from "../../Database/Models/Admin.Model.js";
import jwt from "jsonwebtoken";

const getAllStaff = asyncHandler(async (req, res) => {
  // to add pagination
  const page = req.query.page * 1 || 1; //page number
  const limit = req.query.limit * 1 || 5; // number of staff in one page
  const skip = (page - 1) * limit; // to skip previous date
  const staffs = await staffModel.find({}).skip(skip).limit(limit);
  res
    .status(200)
    .json({ status: "success", results: staffs.length, page, data: staffs });
});

const getOneStaff = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const staff = await staffModel.findById(id);
  if (staff) {
    res.status(200).json({ status: "success", data: staff });
  } else {
    return next(new ApiError(`no staff for this id ${id}`, 404));
  }
});

const addStaff = async (req, res) => {
  try {
    const decoded = jwt.verify(req.headers.token, "bl7 5ales");
    const { id: creatorId } = decoded;
    const admin = await adminModel.findById(creatorId);
    if (admin) {
      const newuser = await staffModel.insertMany([
        { ...req.body, createdBy: creatorId },
      ]);
      res
        .status(200)
        .json({ status: "Success", message: "User added", data: newuser });
    } else {
      res.status(401).json({ status: "Fail", message: "Unauthorized" });
    }
  } catch (error) {
    res.status(400).json({ status: "Fail", message: error });
  }
};

const updataStaff = async (req, res, next) => {
  try {
    const decoded = jwt.verify(req.headers.token, "bl7 5ales");
    const { id: creatorId } = decoded;
    const admin = await adminModel.findById(creatorId);
    if (admin) {
      const { id } = req.params;
      const isFound = await staffModel.findById(id);
      if (isFound) {
        const staff = await staffModel.findOneAndUpdate(
          id,
          {
            ...req.body,
          },
          { new: true }
        );
        res.status(200).json({ status: "success", data: staff });
      } else {
        res.status(404).json({ status: "Fail", message: "Staff not found" });
      }
    } else {
      return next(new ApiError("no staff for this id ${id}", 404));
    }
  } catch (error) {
    res.status(400).json({ status: "fail", message: error });
  }
};

const deleteStaff = asyncHandler(async (req, res, next) => {
  const decoded = jwt.verify(req.headers.token, "bl7 5ales");
  const { id: creatorId } = decoded;
  const admin = await adminModel.findById(creatorId);
  if (admin) {
    const { id } = req.params;
    const isFound = await staffModel.findById(id);
    if (isFound) {
      const staff = await staffModel.findByIdAndDelete(id);
      res.status(204).json({ status: "success" });
    } else {
      res.status(404).json({ status: "Fail", message: "Staff not found" });
    }
  } else {
    return next(new ApiError("Unauthorized", 401));
  }
  return next(new ApiError(`no staff for this id ${id}`, 404));
});

export { getAllStaff, getOneStaff, addStaff, updataStaff, deleteStaff };
