import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"];

    if (!token) {
        return res.status(403).json({ success: false, message: "No token provided" });
    }

    // Remove 'Bearer ' if present
    const tokenString = token.startsWith("Bearer ") ? token.slice(7, token.length) : token;

    try {
        const decoded = jwt.verify(tokenString, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: "Unauthorized: Invalid token" });
    }
};

export const isEmployee = (req, res, next) => {
    console.log(roleId,'roleIdroleIdroleIdroleId')
    // Check if roleId is 3 (Employee)
    if (req.user) {
        next();
    } else {
        return res.status(403).json({
            success: false,
            message: "Access Denied: Employees only!"
        });
    }
};
