const mongoose = require("mongoose");
const moment = require("moment");
const momentTz = require('moment-timezone');


const advertisingSchema = new mongoose.Schema({
    nameSociety: {
        type: String,
        required: true,
    },
    nameFile: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        default: 'https://luxury-massages.com',
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

advertisingSchema.pre("save", async function(next) {
    const advertising = this;

    next();
});

const Advertising = mongoose.model("advertising", advertisingSchema, "advertising" );

module.exports = Advertising;
