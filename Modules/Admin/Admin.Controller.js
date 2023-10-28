import adminModel from "../../Database/Models/Admin.Model.js";
import managerModel from "../../Database/Models/Manager.Model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const getAllAdmins = async (req, res) => {
  try {

    const userId = req.decodedToken.id
    console.log("decodedToken: ",userId)
    const targetedUserManager = await managerModel.findById(userId)
    const trgetedUserAdmin  = await adminModel.findById(userId)
    if(!targetedUserManager && !trgetedUserAdmin){
      console.log("user not authorized")
      return res.status(401).json({ message: "user not authorized" });
    }
    const allAdmins = await adminModel.find()
    console.log("admins retrieved successfully", allAdmins)
    return res.status(200).json({ message: "admins retrieved successfully", allAdmins });
  } catch (err) {
    console.log("catch error: ",err);
    return res.status(400).json({ message: "catch error: ",err });
  }
}
const getOneAdmin = async (req, res) => {
  try {

    const userId = req.decodedToken.id
    console.log("decodedToken: ",userId)
    const targetedUserManager = await managerModel.findById(userId)
    const trgetedUserAdmin  = await adminModel.findById(userId)
    if(!targetedUserManager && !trgetedUserAdmin){
      console.log("user not authorized")
      return res.status(401).json({ message: "user not authorized" });
    }
    const adminId = req.param.id
    const oneAdmin = await adminModel.findById(adminId)
    if(!oneAdmin){
      console.log("admin not found")
      return res.status(401).json({message:"admin not found"})
    }
    console.log("admin retrieved successfully", oneAdmin)
    return res.status(200).json({message:"adnub retrieved successfully", oneAdmin})
  } catch (err) {
    console.log("catch error: ",err);
    return res.status(400).json({ message: "catch error: ",err });
  }
}


const addAdmin = async (req, res) => {
  try {
    const userId = req.decodedToken.id
    console.log("decodedToken: ",userId)
    const targetedUserManager = await managerModel.findById(userId)
    if(!targetedUserManager){
      console.log("user not authorized")
      return res.status(401).json({ message: "user not authorized" });
    }
    const hashedPassword = bcrypt.hashSync(req.body.password, 4);
    const addedAdmin= await adminModel.create({...req.body,password: hashedPassword,});
    console.log("admin added successfully", addedAdmin)
    return res.status(200).json({ message: "admin added successfully", addedAdmin})
  } catch (err) {
    console.log("catch error: ",err);
    return res.status(400).json({ message: "catch error: ",err });
  }
}
const signInAdmin = async (req, res) => {
  try {
    const {userName, password}= req.body
    let foundedAdmin = await adminModel.findOne({ userName });
    if(!foundedAdmin){
      console.log("no admin found")
      return res.status(401).json({message: "no admin found"})
    }
    const matched = bcrypt.compareSync(password,foundedAdmin.password);
    if(!matched){
      console.log("invalid username or password")
      return res.status(401).json({message: "invalid username or password"})
        
      }
      const token = jwt.sign({ id: foundedAdmin.id }, 'bl7 5ales');
      console.log('logged in successfully', token);
      return res.status(200).json({ message: 'logged in successfully', token });
  } catch (err) {
    console.log("catch error: ",err);
    return res.status(400).json({ message: "catch error: ",err });
  }
}
const updateAdmin = async (req, res) => {
  try {
    const userId = req.decodedToken.id
    console.log("decodedToken: ",userId)
    const targetedUserManager = await managerModel.findById(userId)
    if(!targetedUserManager){
      console.log("user not authorized")
      return res.status(401).json({ message: "user not authorized" });
    }
    const adminId = req.param.id
    const targetedUser= await adminModel.findById(adminId)
    if(!targetedUser){
      console.log("admin not found")
      return res.status(200).json({message: "admin not found"})

    }
    const {email,userName,password}=req.body
    const updatedAdmin = await adminModel.findByIdAndUpdate(adminId,{email : email? email : targetedUser.email,userName: userName? userName : targetedUser.userName,password:password? bcrypt.hashSync(password, 4) : targetedUser.password},{ new: true })
    console.log("admin updated successfully: ", updatedAdmin)
    return res.status(200).json({message: "admin updated successfully", updatedAdmin})
  } catch (err) {
    console.log("catch error: ",err);
    return res.status(400).json({ message: "catch error: ",err });
  }
}


const deleteAdmin = async (req, res) => {
  try {
    const userId = req.decodedToken.id
    console.log("decodedToken: ",userId)
    const authorizedManager = await managerModel.findById(userId)
    if(!authorizedManager){
      console.log("user not authorized")
      return res.status(401).json({ message: "user not authorized" });
    }
    const adminId = req.param.id
    const targetedUser= await adminModel.findById(adminId)
    if(!targetedUser){
      console.log("admin not found")
      return res.status(200).json({message: "admin not found"})

    }
    const deletedAdmin = await adminModel.findByIdAndDelete(adminId)
    console.log("admin deleted successfully", deletedAdmin)
    return res.status(200).json({message: "admin deleted successfully", deletedAdmin})
  } catch (err) {
    console.log("catch error: ",err);
    return res.status(400).json({ message: "catch error: ",err });
  }
}


export { getAllAdmins, getOneAdmin, addAdmin,signInAdmin, updateAdmin, deleteAdmin };
