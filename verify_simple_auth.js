
// import 'dotenv/config';
// import jwt from 'jsonwebtoken';
// import { verifyToken } from './Middleware/auth.middleware.js';

// // Mock Express
// const mockRes = () => {
//     const res = {};
//     res.status = (code) => {
//         res.statusCode = code;
//         return res;
//     };
//     res.json = (data) => {
//         res.body = data;
//         return res;
//     };
//     return res;
// };

// const mockNext = () => console.log("   -> Next() called (Success)");

// const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// const testSimplifiedAuth = () => {
//     console.log("--- Testing Simplified Middleware ---");

//     // 1. Create Token with just ID and Role
//     console.log("\n1. Testing Token { id: 101, role: 3 }...");
//     const token = jwt.sign({ id: 101, role: 3 }, JWT_SECRET);

//     const req = { headers: { "authorization": "Bearer " + token } };
//     const res = mockRes();

//     verifyToken(req, res, () => {
//         // middleware should attach user to req
//         console.log("   Middleware passed.");
//         if (req.user && req.user.role === 3) {
//             console.log("   SUCCESS: req.user.role is 3");
//             mockNext();
//         } else {
//             console.log("   FAILURE: req.user malformed:", req.user);
//         }
//     });

//     if (res.statusCode) console.log(`   Failed with status: ${res.statusCode}`, res.body);
// };

// testSimplifiedAuth();
