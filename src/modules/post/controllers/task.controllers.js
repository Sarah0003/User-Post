import taskModel from "../../../../Database/model/task.model.js";
import userModel from "../../../../Database/model/user.model.js";




const addTask=async(req,res)=>{
  let {title,description,status,userID,assignTo,deadline}=req.body;
  let existUser=await userModel.findById(userID);
  if(!existUser) return res.status(404).json({message:"User not found!"});
  let addedTask=await taskModel.insertMany({title,description,status,userID,assignTo,deadline});
  res.json({message:"Message added successfully",addedTask});
}




const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, assignTo } = req.body;
    const userId = req.userId;
    const task = await taskModel.findOne({ _id: id });
    if (!task) return res.json({ message: "Task not found!" });
    if (task.userID != userId) return res.json({ message: "Only the creator can update the task" });
    const updatedTask = await taskModel.findOneAndUpdate({ _id: id },{ title, description, status, assignTo },{ new: true });
    res.json({ message: "Task updated successfully", updatedTask });
  } catch (error) {
    res.json({ message: "Error", error });
  }
};


const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const task = await taskModel.findOne({ _id: id });
    if (!task) return res.json({ message: "Task not found!" });
    if (task.userID != userId) return res.json({ message: "Only the creator can delete the task" });
    const deletedTask = await taskModel.findByIdAndDelete( id ,{ new: true });
    res.json({ message: "Task deleted successfully", deletedTask });
  } catch (error) {
    res.json({ message: "Error", error });
  }
};

const getAllTasks=async(req,res)=>{
  let getTasks=await taskModel.find();
  res.json({ message: "Show all tasks", getTasks });
};




const getTaskByUser = async (req, res) => {
  const { id } = req.params;
  const tasks = await taskModel.findOne({userID:id}).populate([{path:'userID'}])
  res.json({ message: 'Done', tasks })
  }

const taskDoneAfterDeadline= async (req, res) =>{
  try {
    const tasks = await taskModel.find({status: { $ne: 'done' }, deadline: { $lt: new Date() } });

    res.json({message:"Task not done" ,tasks });
  } catch (error) {
    res.json({ message: "Error", error });
  }
}


export{
  addTask,updateTask,deleteTask,getAllTasks,getTaskByUser,taskDoneAfterDeadline
}