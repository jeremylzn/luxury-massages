const mongoose = require('mongoose')
const moment = require('moment')

const itemServiceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    minutes: {
        type: Number,
        required: true,
        min: 0
    },
    actif: {
        type: Boolean,
        default: true
    },
    img: {
        type: String,
        default: ''
    }
});

const Service = mongoose.model("services", itemServiceSchema);

module.exports = Service;
