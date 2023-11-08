import adminModel from "../../Database/Models/Admin.Model.js";
import DentistsModel from "../../Database/Models/Dentists.Model.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import jobModel from "../../Database/Models/Jobs.Model.js";

async function getAllDentists(req, res) {
  try {
    const dentists = await DentistsModel.find().populate("cases");
    res.status(200).json({ status: "Success", data: dentists });
  } catch (error) {
    res.status(400).json({ status: "Fail", message: error });
  }
}
async function deleteDentist(req, res) {
  try {
    const { id: dentistId } = req.params;
    const isFound = await DentistsModel.findById(dentistId);
    if (isFound) {
      if (!isFound.cases){
        const deletedDentist = await DentistsModel.findByIdAndDelete(dentistId);
        res.status(200).json({
          status: "Success",
          message: "Dentist Deleted",
          data: deletedDentist,
        });
 
      }else{
res.json({
    status: "Fail",
    message:
      "Deletion of this dentist is not allowed as it is associated with jobs.",
  });
      }
    } else
      res.status(404).json({ status: "Fail", message: "Dentist not found" });
  } catch (error) {
    res.status(400).json({ status: "Fail", message: error });
  }
}

async function updateDentist(req, res) {
  try {
    const decoded = jwt.verify(req.headers.token, "bl7 5ales");
    const { id: creatorId } = decoded;

    const admin = await adminModel.findById(creatorId);
    if (admin) {
      const dentistId = req.params.id;
      const isFound = await DentistsModel.findById(dentistId);
      if (isFound) {
        const dentist = await DentistsModel.findByIdAndUpdate(
          dentistId,
          {
            ...req.body,
          },
          { new: true }
        );
        res
          .status(200)
          .json({ status: "Success", message: "User Updated", data: dentist });
      } else
        res.status(404).json({ status: "Fail", message: "Dentist not found" });
    } else {
      res.status(401).json({ status: "Fail", message: "Unauthorized" });
    }
  } catch (error) {
    res.status(400).json({ status: "Fail", message: error });
  }
}
async function getDentist(req, res) {
  try {
    const { id: dentistId } = req.params;
    const isFound = await DentistsModel.findById(dentistId);
    if (isFound) {
      const dentist = await DentistsModel.findById(dentistId);
      res.status(200).json({ status: "Success", data: dentist });
    } else
      res.status(404).json({ status: "Fail", message: "Dentist not found" });
  } catch (error) {
    res.status(400).json({ status: "Fail", message: error });
  }
}


async function addDentist(req, res) {
  try{
    const decoded = jwt.verify(req.headers.token, "bl7 5ales");
    const { id: creatorId } = decoded;
    const admin = await adminModel.findById(creatorId);
    if (admin) {
      const hashedPassword = bcrypt.hashSync(req.body.password, 4);
      const newuser = await DentistsModel.insertMany([
        { ...req.body, createdBy: creatorId, password: hashedPassword },
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
}



async function loginDentist(req, res){
  try {

   

    if(!req.headers.token){
      const {email, password}= req.body
      let foundedDentist = await DentistsModel.findOne({ email });
      if(!foundedDentist){
        console.log("no dentist found")
        return res.status(401).json({message: "no dentist found"})
      }
      const matched = bcrypt.compareSync(password,foundedDentist.password);
      if(!matched){
        console.log("invalid email or password")
        return res.status(401).json({message: "invalid email or password"})
          
        }
           const jobs = await jobModel.find({doctorId:foundedDentist.id})
        const token = jwt.sign({ id: foundedDentist.id }, 'bl7 5ales');
        console.log('logged in successfully', token);
        return res.status(200).json({ message: 'logged in successfully', token, foundedDentist, jobs });
    }
    const decoded = jwt.verify(req.headers.token, "bl7 5ales");
    if(!decoded){
      console.log("user not authorized")
        return res.status(401).json({message: "user not authorized"})
    }
    let foundedDentist = await DentistsModel.findById(decoded.id);
    if(!foundedDentist){
      console.log("no dentist found")
        return res.status(401).json({message: "no dentist found"})
    }
    const jobs = await jobModel.find({doctorId:foundedDentist.id})
    return res.status(200).json({ message: ' data received successfully', foundedDentist, jobs });
  
  } catch (err) {
    console.log("catch error: ",err);
    return res.status(400).json({ message: "catch error: ",err });
  }
}

export { getAllDentists, deleteDentist, updateDentist, getDentist, addDentist,loginDentist};
