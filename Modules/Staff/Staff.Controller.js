import adminModel from "../../Database/Models/Admin.Model.js";
import staffModel from "../../Database/Models/Staff.Model.js";




function getAllStaff(req, res) {
  try {
    res.status(200).json({ message: "welcome" });
  } catch (err) {
    console.log(err);
  }
}
function getOneStaff(req, res) {
  try {
  } catch {}
}
function addStaff(req, res) {
  try {
  } catch {}
}
function updataStaff(req, res) {
  try {
  } catch {}
}
function deleteStaff(req, res) {
  try {
  } catch {}
}

export { getAllStaff, getOneStaff, addStaff, updataStaff, deleteStaff };
