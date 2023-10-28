import adminModel from "../../Database/Models/Admin.Model.js";



function getAllAdmins(req, res) {
  try {
    res.status(200).json({ message: "welcome" });
  } catch (err) {
    console.log(err);
  }
}
function getOneAdmin(req, res) {
  try {
  } catch {}
}
function addAdmin(req, res) {
  try {
  } catch {}
}
function signInAdmin(req, res) {
  try {
  } catch {}
}
function updateAdmin(req, res) {
  try {
  } catch {}
}
function deleteAdmin(req, res) {
  try {
  } catch {}
}


export { getAllAdmins, getOneAdmin, addAdmin,signInAdmin, updateAdmin, deleteAdmin };
