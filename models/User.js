import mongoose from "mongoose";

const {Schema, model} = mongoose;


const UserSchema = new Schema({
    name:{type:String},
    email:{type:String, required:true, unique:true},
    username:{type:String},
    password:{type:String},
    description:{type:String},
    profilePic:{type:String},
    coverPic:{type:String},
    paymentId:{type:String},
    paymentSecret:{type:String}
    // createdAt:{type:Date, default:Date.now},
    // updatedAt:{type:Date, default:Date.now},
}, {timestamps:true})

// const User = model("User", UserSchema)

export default mongoose.models.User ||  model("User", UserSchema)