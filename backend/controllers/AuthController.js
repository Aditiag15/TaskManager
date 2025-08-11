import bcrypt from "bcrypt";
import { User } from "../models/Auth.js";
import { generateToken } from "../utils/generateToken.js";
export const registerUser = async (req, res, next) => {

    try {

        // Step 1: Handle completely empty body
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: "Request body is empty" });
        }

        const {name, email, password, role } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please enter all details",
            })
        }

        const isRegistered = await User.findOne({ email });
        if (isRegistered) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            })
        }

        if (password.length < 8 || password.length > 16) {
            return res.status(400).json({
                success: false,
                message: "Password must be between 8 to 16 characters",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: role || "Manager",
        });

       generateToken(user._id,res);

        return res.status(200).json({
            success: true,
            message: "User registered succesfully",
            //when user is registered successfully then what to display
            // all details aas per you except password because passwords are never displayed
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const loginUser = async (req, res, next) => {
    try{
        // Step 1: Handle completely empty body
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: "Request body is empty" });
    }
    const { email, password } = req.body;

    //if anyone of the field is empty
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Please enter all fields",
        });
    }
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({
            success: false,
            message: "User not found",
        });
    }

    const isPassword =await bcrypt.compare(password, user.password);
    if (!isPassword) {
        return res.status(400).json({
            success: false,
            message: "Invalid email or password",
        });
    }

    generateToken(user._id,res);

    return res.status(200).json({
        success: true,
        message: "Login successful",
        //when user is logged insuccessfully then what to display
            // all details aas per you except password because passwords are never displayed
        user: {
            name: user.name,
            email: user.email,
            role: user.role,
        }
    });
    }catch(err){
        console.log(err);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const logoutUser = async (req, res, next) => {
     if (!req.cookies.token) {
        return res.status(400).json({ message: "User already logged out" });
    }

    res.clearCookie("token", {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({ success: true, message: "Logout successful" });
}