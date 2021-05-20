const mongoose = require("mongoose");
const moment = require("moment");
const momentTz = require('moment-timezone');

// Item Sub-Schema that will populate orderSchema 'services' field.
const serviceSubSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    minutes: {
        type: Number,
        required: true,
    },
}, { _id: false });

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

// Worker Sub-Schema that will populate orderSchema 'workerDetails' field.
const workerSubSchema = new mongoose.Schema({
    workerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        default : new mongoose.Types.ObjectId()
    },
    fullname: {
        type: String,
        default: '',
    },
    telephone: {
        type: String,
        default: '',
    },
    email: {
        type: String,
        default: '',
    }
},{ _id: false });

const appointmentSchema = new mongoose.Schema({
    appointmentID: {
        type: Number,
    },
    customerDetails: {
        type: customerSubSchema,
        required: true,
    },
    workerDetails: {
        type: workerSubSchema,
        default : {}
    },
    serviceDetails: {
        type: [serviceSubSchema],
        required: true,
    },
    notes: {
        type: String,
        default: ''
    },
    completed: {
        type: Boolean,
        default: false,
    },
    approved: {
        type: Boolean,
        default: false,
    },
    price: {
        type: Number,
        default: 0,
    },
    date: {
        type: String,
    },
    dateStr: {
        type: String,
    },
    timeStr: {
        type: String,
    },
    createAt: {
        type: String,
        default: new Date()
    }
});

appointmentSchema.pre("save", async function(next) {
    const appointment = this;

    appointment.serviceDetails.forEach((serviceDetails) => {
        appointment.price += serviceDetails.price;
        appointment.date = moment.tz(appointment.date, "Asia/Jerusalem")
    });
    next();
});

appointmentSchema.pre("update", async function(next) {
    const appointment = this;
    
    next();
});

const Appointment = mongoose.model("appointments", appointmentSchema);

module.exports = Appointment;