// Example Usage of the Update API
// Copy this to a file or use in your frontend

const updateUser = async (userId, dataToUpdate) => {
    const url = 'http://localhost:7001/api/users/updateUserDetails';

    const payload = {
        id: userId,
        ...dataToUpdate
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const result = await response.json();
        console.log('Update Response:', result);
    } catch (error) {
        console.error('Network Error:', error);
    }
};

// --- Test Run (Uncomment to use if you have a valid ID) ---
// const myId = "YOUR_USER_ID_HERE";
// updateUser(myId, {
//   first_name: "Super",
//   last_name: "Man",
//   email: "clark@dailyplanet.com"
// });
