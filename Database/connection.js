import mongoose from 'mongoose';

export function connection(){
  mongoose.connect('mongodb://127.0.0.1:27017/assignment7')
  .then(()=>console.log("DB connected"))
  .catch((err)=>console.log("Db error",err));
}
