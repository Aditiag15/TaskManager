import jwt from "jsonwebtoken";


export const generateToken = (userId, res) => {
    // jwt.sign(payload, secret, options):
    const token = jwt.sign(
        {
            id: userId,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
 
    );

    // Set a cookie named 'token' with the value that is the JWT stored in the variable token.”
    res.cookie("token", token, {
        httpOnly: true,  //JavaScript in the browser cannot read this cookie (protects from XSS attacks).
        secure: process.env.NODE_ENV === "production", //cookie only sent over HTTPS in production.
        sameSite: "strict",  //cookie only sent from same domain requests (helps prevent CSRF attacks).
        maxAge: 24 * 60 * 60 * 1000, //cookie expires in 1 day (in milliseconds).
    });
};