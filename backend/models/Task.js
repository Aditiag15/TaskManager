import mongoose from "mongoose";

export const taskSchema =new mongoose.Schema ({
    taskId:{
         type:Number,
         required:true,
         unique:true,
    },

    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    completed:{
        type:Boolean,
    },
    userId: {
         type: mongoose.Schema.Types.ObjectId, 
         ref: "User", 
         required: true },
});

export const Task =  mongoose.model("Task",taskSchema);