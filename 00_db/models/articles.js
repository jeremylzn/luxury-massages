const mongoose = require("mongoose");
const moment = require("moment");
const momentTz = require('moment-timezone');

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        default: ''
    },
    createAt: {
        type: String,
        default: new Date()
    }
});

articleSchema.pre("save", async function(next) {
    const article = this;
    next();
});

const Article = mongoose.model("articles", articleSchema);

module.exports = Article;
