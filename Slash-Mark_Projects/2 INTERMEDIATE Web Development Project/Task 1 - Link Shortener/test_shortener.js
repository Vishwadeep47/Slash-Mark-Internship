const fetch = require('node-fetch');

async function test() {
    try {
        const response = await fetch("http://localhost:5000/api/url/shorten", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                longUrl: "https://www.google.com"
            })
        });
        const data = await response.json();
        console.log("Response:", data);
    } catch (e) {
        console.error("Error:", e);
    }
}

test();
