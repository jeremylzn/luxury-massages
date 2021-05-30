const mongoose = require("mongoose");
const moment = require("moment");
const momentTz = require('moment-timezone');

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

const paymentSchema = new mongoose.Schema({
    customerDetails: {
        type: customerSubSchema,
        required: true,
    },
    processId: {
        type: String,
    },
    porcessToken: {
        type: String,
    },
    allPaymentsNum: {
        type: String,
    },
    asmachta: {
        type: String,
    },
    cardBrand: {
        type: String,
    },
    cardBrandCode: {
        type: String,
    },
    cardExp: {
        type: String,
    },
    cardSuffix: {
        type: String,
    },
    cardType: {
        type: String,
    },
    cardTypeCode: {
        type: String,
    },
    description: {
        type: String,
    },
    firstPaymentSum: {
        type: String,
    },
    paymentDate:{
        type: String,
    },
    paymentType:{
        type: String,
    },
    paymentsNum:{
        type: String,
    },
    periodicalPaymentSum:{
        type: String,
    },
    status:{
        type: String,
    },
    sum:{
        type: String,
    },
    transactionId:{
        type: String,
    },
    transactionToken:{
        type: String,
    },
    transactionTypeId:{
        type: String,
    },
    createdAt: {
        type: String,
        default: new Date()
    }
});

paymentSchema.pre("save", async function(next) {
    const payment = this;

    next();
});

const Payment = mongoose.model("payments", paymentSchema, "payments" );

module.exports = Payment;