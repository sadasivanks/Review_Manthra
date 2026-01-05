
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { verifyToken, isEmployee, isSuperAdmin } from './Middleware/auth.middleware.js';

const mockRes = () => {
    const res = {};
    res.status = (code) => {
        res.statusCode = code;
        return res;
    };
    res.json = (data) => {
        res.body = data;
        return res;
    };
    return res;
};
const mockNext = () => console.log("   -> Next() called");

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

const testRBAC = () => {
    console.log("--- Testing Restored RBAC Middleware ---");

    // 1. Employee Token (roleId: 3)
    const empToken = jwt.sign({ id: 101, roleId: 3 }, JWT_SECRET);
    const reqEmp = { headers: { "authorization": "Bearer " + empToken } };
    const resEmp = mockRes();

    console.log("\nA. Employee accessing Employee Route:");
    verifyToken(reqEmp, resEmp, () => {
        isEmployee(reqEmp, resEmp, () => console.log("   SUCCESS: Employee passed check"));
    });
    if (resEmp.statusCode === 403) console.log("   FAILURE: Employee blocked");


    // 2. Admin Token (roleId: 1)
    const adminToken = jwt.sign({ id: 999, roleId: 1 }, JWT_SECRET);
    const reqAdmin = { headers: { "authorization": "Bearer " + adminToken } };
    const resAdmin = mockRes();

    console.log("\nB. SuperAdmin accessing Employee Route (Should Fail):");
    verifyToken(reqAdmin, resAdmin, () => {
        isEmployee(reqAdmin, resAdmin, () => console.log("   FAILURE: SuperAdmin passed check (Wrong)"));
    });
    if (resAdmin.statusCode === 403) console.log("   SUCCESS: SuperAdmin blocked (Correct)");


    // 3. SuperAdmin accessing SuperAdmin logic
    console.log("\nC. SuperAdmin accessing SuperAdmin Middleware:");
    const resAdmin2 = mockRes();
    verifyToken(reqAdmin, resAdmin2, () => {
        isSuperAdmin(reqAdmin, resAdmin2, () => console.log("   SUCCESS: SuperAdmin passed check"));
    });

};

testRBAC();
