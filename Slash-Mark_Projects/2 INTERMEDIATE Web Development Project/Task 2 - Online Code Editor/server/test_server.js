const fetch = require('node-fetch');

async function test() {
    try {
        const response = await fetch("http://localhost:3010/submissions", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                submission: {
                    language: "python",
                    code: "print('Hello from Test Script')"
                }
            })
        });
        const data = await response.json();
        console.log("Response:", data);
    } catch (e) {
        console.error("Error:", e);
    }
}

test();
