import managerModel from "../../Database/Models/Manager.Model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/*Start getAllManager*/
const getAllManagers = async (req, res) => {
  try {
    const userId = req.decodedToken.id;
    const targetedUser = await managerModel.findById(userId);
    if (!targetedUser) {
      console.log("user not authorized");
      return res.status(401).json({ message: "user not authorized" });
    }
    const allManagers = await managerModel.find();
    console.log("managers retrieved successfully", allManagers);
    return res
      .status(200)
      .json({ message: "managers retrieved successfully", allManagers });
  } catch (err) {
    console.log("catch error: ", err);
    return res.status(400).json({ message: "catch error: ", err });
  }
};
/*End getAllManager*/

/*Start getOneManager*/
const getOneManager = async (req, res) => {
  try {
    const userId = req.decodedToken.id;
    const targetedUser = await managerModel.findById(userId);
    if (!targetedUser) {
      console.log("user not authorized");
      return res.status(401).json({ message: "user not authorized" });
    }
    const managerId = req.param.id;
    const oneManager = await managerModel.findById(managerId);
    if (!oneManager) {
      console.log("manager not found");
      return res.status(401).json({ message: "manager not found" });
    }
    console.log("manager retrieved successfully", oneManager);
    return res
      .status(200)
      .json({ message: "manager retrieved successfully", oneManager });
  } catch (err) {
    console.log("catch error: ", err);
    return res.status(400).json({ message: "catch error: ", err });
  }
};
/*End getOneManager*/

/*Start addManager*/
const addManager = async (req, res) => {
  try {
    const userId = req.decodedToken.id;
    console.log("decodedToken: ", userId);
    const targetedUser = await managerModel.findById(userId);
    if (!targetedUser) {
      console.log("user not authorized");
      return res.status(401).json({ message: "user not authorized" });
    }

    const hashedPassword = bcrypt.hashSync(req.body.password, 4);
    const addedManager = await managerModel.create({
      ...req.body,
      password: hashedPassword,
    });
    console.log("manager added successfully", addedManager);
    return res
      .status(200)
      .json({ message: "manager added successfully", addedManager });
  } catch (err) {
    console.log("catch error: ", err);
    return res.status(400).json({ message: "catch error: ", err });
  }
};
/*End addManager*/

const signInManager = async (req, res) => {
  try {
    const {userName, password} = req.body
    const foundedManager = await managerModel.findOne({userName})
    if(!foundedManager){
      console.log("no managers found")
      res.status(401).json({message: "no managers found"})
    }
    else{
     const matched = bcrypt.compareSync(password, foundedManager.password);
     if(!matched){
      console.log("password incorrect")
      res.status(401).json({message: "password incorrect"})
     } 
     else {
      const token = jwt.sign({ id: foundedManager.id }, 'bl7 5ales');
      console.log("manager logged in successfully")
      res.status(401).json({message: "manager logged in successfully", token})
     }
    }
  } catch (err) {
    console.log("catch error: ", err);
    return res.status(400).json({ message: "catch error: ", err });
  }
};

const updateManager = async (req, res) => {
  try {
    const userId = req.decodedToken.id;
    const targetedUser = await managerModel.findById(userId);
    if (!targetedUser) {
      console.log("user not authorized");
      return res.status(401).json({ message: "user not authorized" });
    }
    const managerId = req.param.id;
    const foundedManager = await managerModel.findById(managerId);
    if (!foundedManager) {
      console.log("manager not found");
      return res.status(401).json({ message: "manager not found" });
    }
    const { email, userName, password } = req.body;
    const updatedManager = await managerModel.findByIdAndUpdate(
      managerId,
      {
        email: email ? email : targetedUser.email,
        userName: userName ? userName : targetedUser.userName,
        password: password
          ? bcrypt.hashSync(password, 4)
          : targetedUser.password,
      },
      { new: true }
    );
    console.log("manager updated successfully: ", updatedManager);
    return res
      .status(200)
      .json({ message: "manager updated successfully", updatedManager });
  } catch (err) {
    console.log("catch error: ", err);
    return res.status(400).json({ message: "catch error: ", err });
  }
};

const deleteManager = async (req, res) => {
  try {
    const userId = req.decodedToken.id;
    const targetedUser = await managerModel.findById(userId);
    if (!targetedUser) {
      console.log("user not authorized");
      return res.status(401).json({ message: "user not authorized" });
    }
    const managerId = req.param.id;
    const foundedManager = await managerModel.findById(managerId);
    if (!foundedManager) {
      console.log("manager not found");
      return res.status(401).json({ message: "manager not found" });
    }
    const deletedManager = await managerModel.findByIdAndDelete(managerId);
    console.log("manager deleted successfully", deletedManager);
    return res
      .status(200)
      .json({ message: "manager deleted successfully", deletedManager });
  } catch (err) {
    console.log("catch error: ", err);
    return res.status(400).json({ message: "catch error: ", err });
  }
};

export {
  getAllManagers,
  getOneManager,
  addManager,
  signInManager,
  updateManager,
  deleteManager,
};
