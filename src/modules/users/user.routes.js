import express from 'express';
import { changePassword, deleteUser, getAllUsers, signIn, signUp, softDeleteUser, updateUser } from './controllers/user.controller.js';
import { auth } from '../auth/auth.js';



const userRoutes=express.Router();

userRoutes.post("/signUp",signUp)
userRoutes.post("/signIn",signIn)
userRoutes.get("/getAllUsers",getAllUsers)
userRoutes.patch("/changePassword/:id",auth,changePassword)
userRoutes.patch("/updateUser/:id",auth,updateUser)
userRoutes.delete('/deleteUser', auth, deleteUser)
userRoutes.delete('/softDeleteUser', auth, softDeleteUser)

export default userRoutes;
