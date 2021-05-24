const mongoose = require("mongoose");
const moment = require("moment");
const momentTz = require('moment-timezone');

const usersSubSchema = new mongoose.Schema({
    userID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    telephone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
}, { _id: false });

const distributorSchema = new mongoose.Schema({
    usersList: {
        type: [usersSubSchema],
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    paid: {
        type: Number,
        default: 0
    },
    createAt: {
        type: String,
        default: new Date()
    }
});

distributorSchema.pre("save", async function(next) {
    const distributor = this;
    next();
});

const Distributor = mongoose.model("distributor", distributorSchema);

module.exports = Distributor;
