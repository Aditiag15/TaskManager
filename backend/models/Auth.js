import mongoose from "mongoose";

export const userSchema =new mongoose.Schema ({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique:true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "Manager",
        enum: ["Admin", "Manager"]
    }
})

export const User = mongoose.model("User", userSchema);