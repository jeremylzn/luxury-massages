const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth.js')
const admin = require('../middleware/admin')
const worker = require('../middleware/worker')
const Appointment = require('../../00_db/models/appointment')
const Payment = require('../../00_db/models/payment')
var request = require('request');
const formData = require('form-data');
const fetch = require("node-fetch");
const logger = require('../middleware/logger').logger;
// const mailer = require('../middleware/send-email')

// Add appointment
router.post('/booking', async(req, res) => {
    const appointment = new Appointment(req.body)
    try {
        await appointment.save()
        res.status(201).send(appointment)
    } catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
})

// Get appointments by customerID
router.get('/tkn/booking/:id', auth, async(req, res) => {
    try {
        const appointments = await Appointment.find({'customerDetails.customerID' : req.params.id})
        res.send(appointments)
    } catch (err) {
        console.log(err)
        res.status(500).send()
    }
})

// WORKER - Get appointments by workerID
router.get('/worker/booking/:id', worker, async(req, res) => {
    try {
        const appointments = await Appointment.find({'workerDetails.workerID' : req.params.id})
        res.send(appointments)
    } catch (err) {
        console.log(err)
        res.status(500).send()
    }
})

// WORKER - Get appointments by workerID not completed
router.get('/worker/booking/notcompleted/:id', worker, async(req, res) => {
    try {
        const appointments = await Appointment.find({'workerDetails.workerID' : req.params.id, completed: false})
        res.send(appointments)
    } catch (err) {
        console.log(err)
        res.status(500).send()
    }
})

// WORKER - Get appointments by workerID completed
router.get('/worker/booking/completed/:id', worker, async(req, res) => {
    try {
        const appointments = await Appointment.find({'workerDetails.workerID' : req.params.id, completed: true})
        res.send(appointments)
    } catch (err) {
        console.log(err)
        res.status(500).send()
    }
})

// ADMIN - get all not completed appointements
router.get('/admin/active/booking', admin, async(req, res) => {
    try {
        const appointments = await Appointment.find({completed: false})
        res.send(appointments)
    } catch (err) {
        res.status(500).send()
    }
})

// ADMIN - set Worker to appointment
router.put('/admin/booking/:id', admin, async(req, res) => {
    try {
        console.log(req.body)
        const appointments = await Appointment.findByIdAndUpdate({_id: req.params.id}, { $set: { 'workerDetails.workerID': req.body.workerID, 'workerDetails.fullname': req.body.fullname, 'workerDetails.telephone': req.body.telephone, 'workerDetails.email': req.body.email, approved: true } })
        // await appointments.update()
        res.send(appointments)
    } catch (err) {
        res.status(500).send()
    }
})

// set appointment as completed
router.put('/booking/completed', async(req, res) => {
    try {
        const appointments = await Appointment.findByIdAndUpdate({_id: req.body.id}, { $set: { completed: true } })
        res.send(appointments)
    } catch (err) {
        res.status(500).send()
    }
})

// get data payement
router.post('/update', async (req, res) => {
    try {
        const values = req.body.data
        logger.info(values)
        console.log(values)
        values['customerDetails'] = {customerID: values.customFields.cField1, email:values.payerEmail, fullname:values.fullName, telephone:values.payerPhone, address:values.customFields.cField2, distributor:values.customFields.cField3}
        logger.info('AFTER ADD IN CUSTOM DETAILS')
        let form_data = new formData(values)
        form_data.append("pageCode", values.customFields.cField4);
        form_data.append("transactionId", values.transactionId);
        form_data.append("transactionToken", values.transactionToken);
        form_data.append("transactionTypeId", values.transactionTypeId);
        form_data.append("paymentType", values. paymentType);
        form_data.append("sum", values.sum);
        form_data.append("firstPaymentSum", values.firstPaymentSum);
        form_data.append("periodicalPaymentSum", values.periodicalPaymentSum);
        form_data.append("paymentsNum", values.paymentsNum);
        form_data.append("allPaymentsNum", values.allPaymentsNum);
        form_data.append("paymentDate", values.paymentDate);
        form_data.append("asmachta", values.asmachta);
        form_data.append("description", values.description);
        form_data.append("fullName", values.fullName);
        form_data.append("payerPhone", values.payerPhone);
        form_data.append("payerEmail", values.payerEmail);
        form_data.append("cardSuffix", values.cardSuffix);
        form_data.append("cardType", values.cardType);
        form_data.append("cardTypeCode", values.cardTypeCode);
        form_data.append("cardBrand", values.cardBrand);
        form_data.append("cardBrandCode", values.cardBrandCode);
        form_data.append("cardExp", values.cardExp);
        form_data.append("processId", values.processId);
        form_data.append("processToken", values.processToken);
        console.log(form_data);
        logger.info('after append')
        const url = "https://sandbox.meshulam.co.il/api/light/server/1.0/approveTransaction";
        const response = await fetch(url, {
            method: 'POST',
            body: form_data
        });
        const data = await response.json();
        logger.info('AFTER FETCH APPROVE')
        try {
                const payment = new Payment(values)
                await payment.save()
        } catch (err) {
                console.log(err)
                res.status(400).send(err)
        }
        logger.info('AFTER SAVE PAYMENT')
        logger.info(data)
        console.log(data)
        res.json(data);

    }
    catch (err){
        console.log('--------------------')
        console.log('IN CATCH OF TRY AND CATCH')
        console.log(err)
        logger.info(err)
        console.log('-----------------------')
    }
});

// Payment for booking by credit card
router.post('/payment/booking/card', async(req, res) => {
    try {

        const values = req.body
        let form_data = new formData();
        form_data.append("sum", values.sum);
        form_data.append("pageField[fullName]", values.fullname);
        form_data.append("pageField[email]", values.email);
        form_data.append("pageField[phone]", values.phone);
        form_data.append("paymentNum", '1');
        form_data.append("saveCardToken", '1');
        form_data.append("chargeType", '1');
        form_data.append("description", values.description);
        form_data.append("pageCode", "d50c2702adc2");
        form_data.append("userId", "5809763c55d933f9");
        form_data.append("cField1", values._id)
        form_data.append("cField2", values.address)
        form_data.append("cField3", values.distributor)
        form_data.append("cField4", "d50c2702adc2")
        form_data.append("successUrl", 'https://luxury-massages.com/payment/redirect=success');
        form_data.append("cancelUrl", 'https://luxury-massages.com/dashboard/therapy');
        const url = "https://sandbox.meshulam.co.il/api/light/server/1.0/createPaymentProcess";
        const response = await fetch(url, { method: 'POST', body: form_data });
        const data = await response.json();
        res.json(data.data.url);
    }catch (err) {
        console.log(err);
    }
})

// Payment for booking by bit
router.post('/payment/booking/bit', async(req, res) => {
    try {

        const values = req.body
        let form_data = new formData();
        form_data.append("sum", values.sum);
        form_data.append("pageField[fullName]", values.fullname);
        form_data.append("pageField[email]", values.email);
        form_data.append("pageField[phone]", values.phone);
        form_data.append("paymentNum", '1');
        form_data.append("saveCardToken", '1');
        form_data.append("chargeType", '1');
        form_data.append("description", values.description);
        form_data.append("pageCode", "1e0c4f265492");
        form_data.append("userId", "5809763c55d933f9");
        form_data.append("cField1", values._id)
        form_data.append("cField2", values.address)
        form_data.append("cField3", values.distributor)
        form_data.append("cField4", "1e0c4f265492")
        form_data.append("successUrl", 'https://luxury-massages.com/payment/redirect=success');
        form_data.append("cancelUrl", 'https://luxury-massages.com/dashboard/therapy');
        const url = "https://sandbox.meshulam.co.il/api/light/server/1.0/createPaymentProcess";
        const response = await fetch(url, { method: 'POST', body: form_data });
        const data = await response.json();
        res.json(data.data.url);
    }catch (err) {
        console.log(err);
    }
})

module.exports = router