const express = require("express");
const router = express.Router();
const Movie = require("../models/movies");
const multer = require("multer");


// Image Upload
let storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "./uploads");
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    },
});

let upload = multer({
    storage: storage,
}).single("image");

// Routes
router.get("/", (req, res) => {
    res.render("index", {
        title: 'Home Page',
    })
});

router.get("/add-movie", (req, res) => {
    res.render("add_movies", {
        title: 'Add Movie',
    })
});

router.get("/movies", (req, res) => {
    res.send("All Movies");
});

router.post("/add", upload, (req, res) => {
    const movie = new Movie({
        title: req.body.title,
        year: req.body.year,
        description: req.body.desc,
        link: req.body.link,
        image: req.file.filename,
    });
    movie.save()
            .then(() => {
                req.session.message = {
                    type: 'success',
                    message: 'Successfully Added a Movie!',
                };
                res.redirect("/");
            })
            .catch(err => {
                res.json({message: err.message, type: 'danger'});
            });
});

module.exports = router;