const express = require('express');
const router = express.Router();


router.get('/movies', (req, res) => {
    res.send("All Movies");
});

module.exports = router;