// server.js
const express = require('express');
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Example GET route
app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

// Example POST route
app.post('/data', (req, res) => {
  const data = req.body;
  res.json({ message: 'Data received!', yourData: data });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
