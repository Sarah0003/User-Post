import userModel from "../../../../Database/model/user.model.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

//1-Sign Up

const signUp = async (req, res) => {
    try {
        let { username, email, password,age,gender,phone } = req.body;
        let existUser = await userModel.findOne({ email });
        if (existUser) {
            return res.status(400).json({ message: "Email already exists" });
        } else {
            // Hash the password before saving to the database
            const hashedPassword = await bcrypt.hash(password, 10);
            let addedUser = await userModel.insertMany({ username, email, password: hashedPassword,age,gender,phone });

            res.json({ message: "Signed up successfully", addedUser });
        }
    } catch (error) {
        res.status(500).json({ message: "Error", error });
    }
}
//2-Sign in
const signIn = async (req, res) => {
    try {
        let { email, password } = req.body;
        let existUser = await userModel.findOne({ email });
        if (existUser) {
            const passwordMatch = await bcrypt.compare(password, existUser.password);
            if (passwordMatch) {
                let token = jwt.sign({ email: existUser.email, userId: existUser._id }, 'treka');
                res.json({ message: "Signed in successfully", token });
            } else {
                res.status(401).json({ message: "Wrong password" });
            }
        } else {
            res.status(404).json({ message: "Email not registered!" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error", error });
    }
}
//3-change password (user must be logged in)
const changePassword = async (req, res) => {
    try {
        let userId =  req.userId;
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        let changedPassword = await userModel.findByIdAndUpdate(userId, { password: hashedPassword }, { new: true });
        if (!changedPassword) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.json({ message: "Password has been updated", changedPassword });

    } catch (error) {
        return res.json({ message: "Error.", error });
    }
};

//4-Update user
  const updateUser=async(req,res)=>{
    try{
        let userId =  req.userId;

        let updatedUser=await userModel.findByIdAndUpdate(userId,req.body,{new:true});
        if(!updatedUser){
            return res.status(404).json({message:"not found user"}) 
        }else{
            res.json({message:"User been updated",updatedUser});
        }   
    }catch(error){
        return res.status(500).json({ message: "Error in updating user's data.",error });

    }
  };

//5-Delete user
const deleteUser=async(req,res)=>{
        try {
         
            let userId =  req.userId;
            let deletedUser = await userModel.findByIdAndDelete(userId);
            if (!deletedUser) return res.status(404).json({ message: "User not found" }) ;
            return res.json({ message: "User has been deleted", deletedUser });
            
        } catch (error) {
            return res.status(500).json({ message: "Error in deleting user's account.", error });
        }
    };
    
//Soft Delete
const softDeleteUser = async (req, res) => {
    try {
        let userId = req.userId;
        let softDeletedUser = await userModel.findByIdAndUpdate(userId, { deleted: true }, { new: true });
        if (!softDeletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.json({ message: "User has been soft deleted", softDeletedUser });
    } catch (error) {
        return res.status(500).json({ message: "Error in soft deleting user's account.", error });
    }
};

//GetAllUsers
const getAllUsers=async(req,res)=>{
    let getUsers=await userModel.find().populate(req.userId);
    res.json({ message: "Get all users", getUsers });
  };

export {
  signUp,signIn,changePassword,updateUser,deleteUser,getAllUsers,softDeleteUser
}