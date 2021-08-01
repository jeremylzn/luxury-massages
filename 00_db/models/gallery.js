const mongoose = require("mongoose");
const moment = require("moment");
const momentTz = require('moment-timezone');

const gallerySchema = new mongoose.Schema({
    img: {
        type: String,
        default:'',
    },
    title: {
        type: String,
        default:''
    },
    text: {
        type: String,
        default:''
    },
    actif: {
        type: Boolean,
        default: false
    },
    createAt: {
        type: String,
        default: new Date()
    }
});

gallerySchema.pre("save", async function(next) {
    const gallery = this;

    next();
});

const Gallery = mongoose.model("gallery", gallerySchema, "gallery" );

module.exports = Gallery;