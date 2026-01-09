
// import 'dotenv/config';
// import jwt from 'jsonwebtoken';
// import { verifyToken, isEmployee } from './Middleware/auth.middleware.js';

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

// const testMiddleware = () => {
//     console.log("--- Testing Middleware Logic ---");

//     // 1. Create Valid Employee Token
//     const empToken = jwt.sign({ id: 123, roleId: 3, roleName: 'Employee' }, JWT_SECRET); // Uses roleId
//     const req1 = { headers: { "authorization": "Bearer " + empToken } };
//     const res1 = mockRes();

//     console.log("\n1. Testing Employee Token (Should Pass):");
//     verifyToken(req1, res1, () => {
//         // If verify passes, req1.user is set
//         isEmployee(req1, res1, mockNext);
//     });

//     if (res1.statusCode) console.log(`   Failed with status: ${res1.statusCode}`, res1.body);


//     // 2. Create Admin Token (Role 1)
//     const adminToken = jwt.sign({ id: 999, roleId: 1, roleName: 'Admin' }, JWT_SECRET);
//     const req2 = { headers: { "authorization": "Bearer " + adminToken } };
//     const res2 = mockRes();

//     console.log("\n2. Testing Admin Token (Should Fail Employee Check):");
//     verifyToken(req2, res2, () => {
//         isEmployee(req2, res2, mockNext);
//     });

//     if (res2.statusCode === 403) console.log("   SUCCESS: Blocked non-employee (403)");
//     else console.log(`   FAILURE: Expected 403, got ${res2.statusCode}`, res2.body);

// };

// testMiddleware();
