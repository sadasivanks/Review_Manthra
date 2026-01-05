
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import fetch from 'node-fetch'; // Requires node-fetch if not available, or use native fetch in node 18+

// Configuration
const BASE_URL = 'http://localhost:7001/api/users';
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; // Make sure this matches .env

// Mock Tokens
const createTestToken = (roleId) => {
    return jwt.sign({
        id: 123,
        company: "TestCompany",
        role: roleId
    }, JWT_SECRET, { expiresIn: '1h' });
};

const verifyEmployeeAccess = async () => {
    console.log("--- Testing Employee Access Control ---");

    // 1. Test as Employee (Role 3)
    const empToken = createTestToken(3);
    console.log("\n1. Testing with Employee Token (Role 3)...");
    try {
        const res = await fetch(`${BASE_URL}/employee-dashboard`, {
            headers: { 'Authorization': `Bearer ${empToken}` }
        });
        const data = await res.json();
        console.log(`Status: ${res.status} | Data:`, data);
        if (res.status === 200 && data.success) console.log("SUCCESS: Employee access granted.");
        else console.log("FAILURE: Employee access denied.");
    } catch (e) { console.error("Request Error:", e); }

    // 2. Test as SuperAdmin (Role 1) - Should fail if specific to Employee
    const adminToken = createTestToken(1);
    console.log("\n2. Testing with SuperAdmin Token (Role 1)...");
    try {
        const res = await fetch(`${BASE_URL}/employee-dashboard`, {
            headers: { 'Authorization': `Bearer ${adminToken}` }
        });
        const data = await res.json();
        console.log(`Status: ${res.status} | Data:`, data);
        if (res.status === 403) console.log("SUCCESS: Non-Employee access denied.");
        else console.log("FAILURE: Non-Employee access allowed.");
    } catch (e) { console.error("Request Error:", e); }
};

// Check if server is running before running this
console.log("Note: Ensure server is running on port 7001 with JWT_SECRET loaded.");
verifyEmployeeAccess();
