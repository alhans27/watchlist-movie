const express = require("express");
const router = express.Router();
const Movie = require("../models/movies");
const multer = require("multer");
const fs = require("fs");


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

// Route to Homepage
router.get("/", (req, res) => {
    Movie.find().exec()
        .then((movies)=>{
            res.render("index", {
                title: 'Home Page',
                movies: movies,
            });
        })
        .catch((err)=>{
            res.json({
                message: err.message,
            });
        });
});


// Route to Add Movie Page
router.get("/add-movie", (req, res) => {
    res.render("add_movies", {
        title: 'Add Movie',
    })
});

// Route to Add New Movie
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

// Route to Edit Movie Page
router.get("/edit/:id", (req, res) => {
    let id = req.params.id;
    Movie.findById(id)
        .then((movie)=>{
            res.render("edit_movies", {
                title: 'Update Movie',
                movie: movie,
            });
        })
        .catch((err)=>{
            res.json({
                message: err.message,
                type: 'danger',
            });
        });
});

// Route to Update a Movie
router.post("/update/:id", upload, (req, res) => {
    let id = req.params.id;
    let new_image = '';
    let link = '';

    if (req.file) {
        new_image = req.file.filename;
        try {
            fs.unlinkSync("./uploads/" + req.body.old_image);
        } catch (error) {
            console.log(err);
            
        }
    } else {
        new_image = req.body.old_image;
    }

    if (req.body.link != "")
    {
        link = req.body.link;
    } else {
        link = "-";
    }

    Movie.findByIdAndUpdate(id, {
        title: req.body.title,
        year: req.body.year,
        description: req.body.desc,
        link: link,
        image: new_image,
    }).then(() => {
            req.session.message = {
                type: 'success',
                message: 'Successfully Update a Movie!',
            };
            res.redirect("/");
        })
        .catch(err => {
            res.json({message: err.message, type: 'danger'});
        });
});

// Route to Delete a Movie
router.get("/delete/:id", (req, res) => {
    let id = req.params.id;
    Movie.findByIdAndDelete(id)
        .then((result) => {
            if (result.image != ""){
                try {
                    fs.unlinkSync("./uploads/" + result.image);
                } catch (error) {
                    console.log(error);
                }
            }
            req.session.message = {
                type: 'info',
                message: 'Successfully Delete a Movie!',
            };
            res.redirect("/");
        })
        .catch(err => {
            res.json({message: err.message, type: 'danger'});
        });
});

module.exports = router;