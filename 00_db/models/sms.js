
const mongoose = require("mongoose");
const moment = require("moment");
const momentTz = require('moment-timezone');

// User Sub-Schema that will populate orderSchema 'customerDetails' field.
const customerSubSchema = new mongoose.Schema({
    customerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    fullname: {
        type: String,
        required: true,
    },
    telephone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    distributor: {
        type: String
    }
}, { _id: false });

const smsSchema = new mongoose.Schema({
    userDetails: {
        type: [customerSubSchema],
        required: true,
    },
    message: {
        type: String,
        default: ''
    },
    createdAt: {
        type: String,
        default: new Date()
    }
});

smsSchema.pre("save", async function(next) {
    const sms = this;
    next();
});

const Sms = mongoose.model("sms", smsSchema);

module.exports = Sms;