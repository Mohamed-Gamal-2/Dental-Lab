import adminModel from "../../Database/Models/Admin.Model.js";
import DentistsModel from "../../Database/Models/Dentists.Model.js";


function getAllDentists(req, res) {
  try {
    res.status(200).json({ status: "Success", data: "Get all" });
  } catch (error) {
    res.status(400).json({ status: "Fail", message: error });
  }
}
function deleteDentist(req, res) {
  try {
    res.status(200).json({ status: "Success", data: "Delete" });
  } catch (error) {
    res.status(400).json({ status: "Fail", message: error });
  }
}
function updateDentist(req, res) {
  try {
    res.status(200).json({ status: "Success", data: "Update" });
  } catch (error) {
    res.status(400).json({ status: "Fail", message: error });
  }
}
function getDentist(req, res) {
  try {
    res.status(200).json({ status: "Success", data: "Get Dentist" });
  } catch (error) {
    res.status(400).json({ status: "Fail", message: error });
  }
}
function addDentist(req, res) {
  try {
    res.status(200).json({ status: "Success", data: "add" });
  } catch (error) {
    res.status(400).json({ status: "Fail", message: error });
  }
}

export { getAllDentists, deleteDentist, updateDentist, getDentist, addDentist };
