import { Schema, model } from "mongoose";


const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ['female', 'male'],
        default: 'female'
    },
    age: {
        type: Number,
    },
    phone:String,
    deleted: { type: Boolean, default: false } 
   
}, { timestamps: true })




const userModel = model('User', userSchema)

export default userModel