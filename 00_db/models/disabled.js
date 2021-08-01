const mongoose = require("mongoose");
const moment = require("moment");
const momentTz = require('moment-timezone');


const disabledSchema = new mongoose.Schema({
    start: {
        type: String,
        required: true,
    },
    end: {
        type: String,
        required: true,
    },
    dateStr: {
        type: String,
        required: true,
    },
    id: {
        type: String
    },
    allDay: {
        type: Boolean,
        default: true,
    },
    createAt: {
        type: String,
        default: new Date()
    }
});

disabledSchema.pre("save", async function(next) {
    const disabled = this;

    next();
});

const Disabled = mongoose.model("disabled", disabledSchema, "disabled" );

module.exports = Disabled;
