import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
    address:{type:String, required:true},
    studentClass:{type:String, required:true},
    rollNo:{type:String, required:true},
    parentName:{type:String, required:true},
    parentPh:{type:String, required:true},
}, { timestamps: true });

export const Student = mongoose.model("Student", studentSchema);
