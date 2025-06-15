require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const path = require('path');


const app = express();


// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
// Serve static HTML frontend
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/url'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
