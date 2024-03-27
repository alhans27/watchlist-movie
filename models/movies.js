const mongoose = require('mongoose');
const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    year: {
        type: Int,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

module.exports = mongoose.model('Movie', movieSchema);