import jwt from "jsonwebtoken";
import { User } from "../models/Auth.js"; // or wherever your User model is

export const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token; // read JWT token from cookie

    if (!token) {
      return res.status(401).json({ success: false, message: "Not authorized, token missing" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user by decoded id and exclude password
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ success: false, message: "Not authorized, user not found" });
    }

    // Attach user to req object for controllers to use
    req.user = user;

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ success: false, message: "Not authorized, token invalid" });
  }
};
