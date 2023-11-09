import adminModel from "../../Database/Models/Admin.Model.js";
import DentistsModel from "../../Database/Models/Dentists.Model.js";
import jobModel from "../../Database/Models/Jobs.Model.js";
import jwt from "jsonwebtoken";


// get all Jobs
async function allJobs (req,res){
    try {
       let getallJobs = await jobModel.find();
        res.status(200).json({ status: "success",  getallJobs });
    } catch (error) {
        res.status(400).json({status:"fail",message:"error"})
    }
}

// add Job
async function addJob(req, res) {
  try{
    const decoded = jwt.verify(req.headers.token, "bl7 5ales");
    const { id: createdBy } = decoded;
      const adminFounded = await adminModel.findById(createdBy)
    if(!adminFounded){
      console.log(" Not Allowed , You aren't Admin")
      return res.status(401).json({ message: " Not Allowed , You aren't Admin" });
    }else{
          let newJob = await jobModel.insertMany({
            ...req.body,
            createdBy,
          });
        let dentist = await DentistsModel.findByIdAndUpdate(
          req.body.doctorId,
          { $push: { cases: newJob[0]._id } },
          { new: true }
        );
      res
        .status(200)
        .json({
          status: "success",
          message: "A New Job Added successfully",
          newJob
        });
    }
  } catch (error) {
    res.status(400).json({ status: "fail", message: "error",error });
  }
}


// Delete Job
async function deleteJob(req, res) {
  try {
     let { id } = req.params;
     const decoded = jwt.verify(req.headers.token, "bl7 5ales");
     const { id: createdBy } = decoded;
       const adminFounded = await adminModel.findById(createdBy)
    if(!adminFounded){
      console.log(" Not Allowed , You aren't Admin")
      return res.status(401).json({ message: " Not Allowed , You aren't Admin" });
    }else{
      let jobDeleted = await jobModel.findByIdAndDelete(id);
      let allJobs = await jobModel.find();
      if (jobDeleted) {
        res.status(201).json({ massage: "Job deleted", allJobs });
      } else {
        res.status(400).json({ massage: "Job not found" });
      }}
  } catch (error) {
    res.status(400).json({ status: "fail", message: "error" });
  }
}
// Update Job
async function updateJob(req, res) {
  try{
    const { id } = req.params;
    const decoded = jwt.verify(req.headers.token, "bl7 5ales");
    const { id: createdBy } = decoded;
    const adminFound = await adminModel.findById(createdBy);
    if (!adminFound) {
      return res
        .status(401)
        .json({ message: "Not Allowed, You are not an Admin" });
    }else{

      const updatedJob = await jobModel.findByIdAndUpdate(
        id,
        {
          serial: req.body.serial,
          pationName: req.body.pationName,
          doctorId: req.body.doctorId,
          typeOfWork: req.body.typeOfWork,
          teethNumber: req.body.teethNumber,
          shade: req.body.shade,
          deadLine: req.body.deadLine,
          price: req.body.price,
          tryIn: req.body.tryIn,
          materialOfPorclain: req.body.materialOfPorclain, // Corrected the field name
        },
        { new: true }
        );
        
        if (updatedJob) {
          return res.status(200).json({ message: "Job updated", updatedJob });
        } else {
          return res.status(404).json({ message: "Job not found" });
        }
      }
      } catch (error) {
    return res
      .status(500)
      .json({ status: "fail", message: "An error occurred",error });
  }
}

// get a specific Job
async function getJob(req, res) {
  try {
    let{id}=req.params
     const decoded = jwt.verify(req.headers.token, "bl7 5ales");
    const { id: createdBy } = decoded;
    const adminFound = await adminModel.findById(createdBy);
    if (!adminFound) {
      return res
        .status(401)
        .json({ message: "Not Allowed, You are not an Admin" });
    }else{
    let getJob = await jobModel.findById(id);
    res.status(200).json({ status: "success", getJob });
  }} catch (error) {
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