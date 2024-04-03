import { Schema, model } from "mongoose";


const taskSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String
    },
   
    status: {
        type: String,
        enum: ['toDo' , 'doing' , 'done'],
        default: 'toDo'
    },
    userID: {
        type: Schema.Types.ObjectId,
         ref:'User'
    },
    assignTo: {
        type: Schema.Types.ObjectId,
        ref:'User'
    },
    deadline:Date
}, { timestamps: true })


const taskModel = model('Task', taskSchema)

export default taskModel
