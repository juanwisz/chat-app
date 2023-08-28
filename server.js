const express = require('express');
const fetch = require('node-fetch');  // Import node-fetch
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '.'))); // Serve static files from current directory

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); // Serve your index.html file
});

app.post('/bot', async (req, res) => {
    console.log("Received POST request with message: ", req.body.userMessage);

    try {
        const response = await fetch('http://localhost:5000/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userMessage: req.body.userMessage })
        });
        const data = await response.json();
        res.send({ botReply: data.botReply });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send({ botReply: "An error occurred" });
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));
