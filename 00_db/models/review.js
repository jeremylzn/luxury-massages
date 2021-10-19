const mongoose = require("mongoose");
const moment = require("moment");
const momentTz = require('moment-timezone');

const reviewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    img: {
        type: String,
        default:'default-reviews'
    },
    actif: {
        type: Boolean,
        required: true,
        default:false
    },
    createAt: {
        type: String,
        default: new Date()
    }
});

reviewSchema.pre("save", async function(next) {
    const review = this;
    next();
});

const Review = mongoose.model("review", reviewSchema);

module.exports = Review;
