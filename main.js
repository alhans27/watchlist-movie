// Import Packages
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');

const app = express();
// Setting the port
const PORT = process.env.PORT || 4200;

// Mapping for root endpoint
app.get("/", (req, res) => {
    res.send("Helloooo Moviesss");
});

// Run the Server
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
