import express from 'express';
import { addTask, deleteTask, getAllTasks, getTaskByUser, taskDoneAfterDeadline, updateTask } from './controllers/task.controllers.js';
import { auth } from '../auth/auth.js';



const taskRoutes=express.Router();

taskRoutes.post("/addTask",auth,addTask);
taskRoutes.get("/getAllTasks",getAllTasks);
taskRoutes.patch("/updateTask/:id",auth,updateTask);
taskRoutes.delete("/deletedTask/:id",auth,deleteTask);
taskRoutes.get("/getTaskByUser/:id",auth,getTaskByUser);
taskRoutes.get("/taskDoneAfterDeadline",taskDoneAfterDeadline);

export default taskRoutes;
