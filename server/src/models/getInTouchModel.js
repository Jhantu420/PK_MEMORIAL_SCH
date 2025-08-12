import mongoose from "mongoose";

const getInTouchSchema = new mongoose.Schema({
    name:"String",
    ph:"Number",
    msg:"String",
    isRead:{
        type:"Boolean",
        default:false
    }
}, { timestamps: true });

export const getInTouchModel = mongoose.model("getInTouchModel",getInTouchSchema)
