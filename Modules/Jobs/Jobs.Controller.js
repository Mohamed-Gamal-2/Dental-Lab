import adminModel from "../../Database/Models/Admin.Model.js";
import jobModel from "../../Database/Models/Jobs.Model.js";




function allJobs (req,res){
    try {
        res.status(200).json({status:"success", data:"all Jobs"})
    } catch (error) {
        res.status(400).json({status:"fail",message:"error"})
    }
}
function addJob(req, res) {
  try {
    res.status(200).json({ status: "success", data: " job added" });
  } catch (error) {
    res.status(400).json({ status: "fail", message: "error" });
  }
}
function deleteJob(req, res) {
  try {
    res.status(200).json({ status: "success", data: "Job deleted" });
  } catch (error) {
    res.status(400).json({ status: "fail", message: "error" });
  }
}

function updateJob(req, res) {
  try {
    console.log("all Jobs");
    res.status(200).json({ status: "success", data: "Job updated" });
  } catch (error) {
    res.status(400).json({ status: "fail", message: "error" });
  }
}

function getJob(req, res) {
  try {
    console.log("all Jobs");
    res.status(200).json({ status: "success", data: "all Jobs" });
  } catch (error) {
    res.status(400).json({ status: "fail", message: "error" });
  }
}
export{
    allJobs,
    addJob,
    deleteJob,
    updateJob,
    getJob
}