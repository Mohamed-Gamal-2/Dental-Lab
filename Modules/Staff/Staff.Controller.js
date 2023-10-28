import asyncHandler from "express-async-handler";
import staffModel from "../../Database/Models/Staff.Model.js";
import ApiError from "../../utils/apiError.js";
import adminModel from "../../Database/Models/Admin.Model.js";

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
  if (!staff) {
    // res.status(404).json({ message: `no staff for this id ${id}` });
    return next(new ApiError(`no staff for this id ${id}`, 404));
  } else {
    res.status(200).json({ status: "success", data: staff });
  }
});

const addStaff = asyncHandler(async (req, res, next) => {
  const { ssn, name, jobTitle, age, salary, phone, email, gender } = req.body;
  const creatorId = req.decodedToken.id;
  const admin = await adminModel.findById(creatorId);
  if (admin) {
    const staff = await staffModel.create({
      createdBy: creatorId,
      ...req.body,
    });
    res.status(201).json({ status: "success", data: staff });
  } else {
    return next(new ApiError("invaild token", 401));
  }
});

const updataStaff = async (req, res, next) => {
  try {
    const creatorId = req.decodedToken.id;
    const admin = await adminModel.findById(creatorId);
    if (admin) {
      const { id } = req.params;
      const { name, salary, jobTitle } = req.body;
      const staff = await staffModel.findOneAndUpdate(
        { _id: id },
        { name, salary, jobTitle },
        { new: true }
      );
      res.status(200).json({ status: "success", data: staff });
    } else {
      return next(new ApiError("no staff for this id ${id}", 404));
    }
  } catch (error) {
    res.status(400).json({ status: "fail", message: error });
  }
};

const deleteStaff = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const staff = await staffModel.findByIdAndDelete(id);
  if (!staff) {
    return next(new ApiError(`no staff for this id ${id}`, 404));
  } else {
    res.status(204).json({ status: "success" });
  }
});

export { getAllStaff, getOneStaff, addStaff, updataStaff, deleteStaff };
