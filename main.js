// Import Packages
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');

const app = express();
// Setting the port
const PORT = process.env.PORT || 4200;

// DB Conenction
mongoose.connect(process.env.DB_URI);
const db = mongoose.connection;
db.on("error", (e) => console.log(e));
db.once("open", () => console.log("Successfully connected to database!"));

// Middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(session({
    secret: 'movie secret key',
    saveUninitialized: true,
    resave: false,
}));

app.use((req, res, next) => {
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
});


// Mapping for root endpoint
app.get("/", (req, res) => {
    res.send("Helloooo Moviesss");
});

// Run the Server
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
