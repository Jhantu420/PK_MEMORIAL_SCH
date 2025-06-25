import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    name:{type:String, required:true},
    ph:{type:Number, required:true, unique:true},
    email:{type:String, required:true},
    role:{type:String, required:true, default:"admin"},
    password:{type:String, required:true}
}, { timestamps: true });

export const Admin = mongoose.model("Admin", adminSchema);
