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

    // Fix for potential double-token issue (client sending two tokens concatenated)
    const parts = tokenString.split('.');
    const cleanToken = parts.length > 3 ? parts.slice(0, 3).join('.') : tokenString;

    try {
        const decoded = jwt.verify(cleanToken, process.env.JWT_SECRET);
        req.user = decoded;
        console.log("Decoded Token Data:", decoded);
        
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error.message);
        console.log("Received Token:", tokenString);
        return res.status(401).json({ success: false, message: "Unauthorized: Invalid token" });
    }
};

export const isEmployee = (req, res, next) => {
    console.log(roleId, 'roleIdroleIdroleIdroleId')
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
