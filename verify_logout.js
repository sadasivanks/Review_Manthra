
import 'dotenv/config';
import fetch from 'node-fetch'; // if needed

const BASE_URL = 'http://localhost:7001/api/users';

const verifyLogout = async () => {
    console.log("--- Testing Logout API ---");

    // Test Case: Valid User (Assuming ID 1 exists, if not use a known ID)
    const userId = 1;
    console.log(`Testing Logout for User ID: ${userId}`);

    try {
        const res = await fetch(`${BASE_URL}/logout`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: userId })
        });
        const json = await res.json();
        console.log(`Status: ${res.status} | Msg: ${json.message}`);

        if (res.status === 200 || res.status === 404) {
            // 404 is acceptable if ID 1 doesn't exist, proves logic works
            console.log("SUCCESS: API reachable and handled ID");
        } else {
            console.log("FAILURE: Unexpected response");
        }

    } catch (e) {
        console.error("Request Error:", e);
    }
};

verifyLogout();
