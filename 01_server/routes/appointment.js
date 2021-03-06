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


const userIdTest = '7434be4be4c601cd'
const pageCodeCardTest = 'ed828b5b2e08'
const pageCodeBitTest = '24a8304a9845'
const userId = '5809763c55d933f9'
const pageCodeCard = 'd50c2702adc2'
const pageCodeBit = '1e0c4f265492'

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
        // let form_data = new formData(values)
        // form_data.append("pageCode", values.customFields.cField4);
        // form_data.append("transactionId", values.transactionId);
        // form_data.append("transactionToken", values.transactionToken);
        // form_data.append("transactionTypeId", values.transactionTypeId);
        // form_data.append("paymentType", values. paymentType);
        // form_data.append("sum", values.sum);
        // form_data.append("firstPaymentSum", values.firstPaymentSum);
        // form_data.append("periodicalPaymentSum", values.periodicalPaymentSum);
        // form_data.append("paymentsNum", values.paymentsNum);
        // form_data.append("allPaymentsNum", values.allPaymentsNum);
        // form_data.append("paymentDate", values.paymentDate);
        // form_data.append("asmachta", values.asmachta);
        // form_data.append("description", values.description);
        // form_data.append("fullName", values.fullName);
        // form_data.append("payerPhone", values.payerPhone);
        // form_data.append("payerEmail", values.payerEmail);
        // form_data.append("cardSuffix", values.cardSuffix);
        // form_data.append("cardType", values.cardType);
        // form_data.append("cardTypeCode", values.cardTypeCode);
        // form_data.append("cardBrand", values.cardBrand);
        // form_data.append("cardBrandCode", values.cardBrandCode);
        // form_data.append("cardExp", values.cardExp);
        // form_data.append("processId", values.processId);
        // form_data.append("processToken", values.processToken);

        var options = {
            'method': 'POST',
            'url': 'https://secure.meshulam.co.il/api/light/server/1.0/approveTransaction',
            formData: {
                "pageCode": values.customFields.cField4,
                "transactionId": values.transactionId,
                "transactionToken": values.transactionToken,
                "transactionTypeId": values.transactionTypeId,
                "paymentType": values.paymentType,
                "sum": values.sum,
                "firstPaymentSum": values.firstPaymentSum,
                "periodicalPaymentSum": values.periodicalPaymentSum,
                "paymentsNum": values.paymentsNum,
                "allPaymentsNum": values.allPaymentsNum,
                "paymentDate": values.paymentDate,
                "asmachta": values.asmachta,
                "description": values.description,
                "fullName": values.fullName,
                "payerPhone": values.payerPhone,
                "payerEmail": values.payerEmail,
                "cardSuffix": values.cardSuffix,
                "cardType": values.cardType,
                "cardTypeCode": values.cardTypeCode,
                "cardBrand": values.cardBrand,
                "cardBrandCode": values.cardBrandCode,
                "cardExp": values.cardExp,
                "processId": values.processId,
                "processToken": values.processToken
            }
          };
          request(options, async function (error, response) {
            if (error) throw new Error(error);
            try {
                const payment = new Payment(values)
                await payment.save()

                logger.info('AFTER SAVE PAYMENT')
                logger.info(JSON.parse(response.body))
                console.log(JSON.parse(response.body))
                res.json(JSON.parse(response.body));
            } catch (err) {
                console.log(err)
                res.status(400).send(err)
            }
          });        

        // console.log(form_data);
        // logger.info('after append')
        // const url = "https://secure.meshulam.co.il/api/light/server/1.0/approveTransaction";
        // const response = await fetch(url, {
        //     method: 'POST',
        //     body: form_data
        // });
        // const data = await response.json();
        // logger.info('AFTER FETCH APPROVE')
        
        // logger.info('AFTER SAVE PAYMENT')
        // logger.info(data)
        // console.log(data)
        // res.json(data);

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

        var options = {
            'method': 'POST',
            'url': 'https://secure.meshulam.co.il/api/light/server/1.0/createPaymentProcess',
            formData: {
              'pageCode': pageCodeCard,
              'userId': userId,
              'sum': values.sum,
              "pageField[fullName]":values.fullname,
              "pageField[email]": values.email,
              "pageField[phone]": values.phone,
              "paymentNum": '1',
              "saveCardToken": '1',
              "chargeType": '1',
              "description": values.description,
              'successUrl': 'https://luxury-massages.com/payment/redirect=success',
              'cancelUrl': 'https://luxury-massages.com/dashboard/therapy',
              "cField1": values._id,
              "cField2": values.address,
              "cField3": values.distributor,
              "cField4": pageCodeCard
            }
          };
          request(options, function (error, response) {
            if (error) throw new Error(error);
            data = JSON.parse(response.body)
            console.log(data)

            res.json(data.data.url);
          });        
    }catch (err) {
        console.log(err);
    }
})

// Payment for booking by bit
router.post('/payment/booking/bit', async(req, res) => {
    try {

        const values = req.body

        var options = {
            'method': 'POST',
            'url': 'https://secure.meshulam.co.il/api/light/server/1.0/createPaymentProcess',
            formData: {
              'pageCode': pageCodeBit,
              'userId': userId,
              'sum': values.sum,
              "pageField[fullName]":values.fullname,
              "pageField[email]": values.email,
              "pageField[phone]": values.phone,
              "paymentNum": '1',
              "saveCardToken": '1',
              "chargeType": '1',
              "description": values.description,
              'successUrl': 'https://luxury-massages.com/payment/redirect=success',
              'cancelUrl': 'https://luxury-massages.com/dashboard/therapy',
              "cField1": values._id,
              "cField2": values.address,
              "cField3": values.distributor,
              "cField4": pageCodeBit
            }
          };
          request(options, function (error, response) {
            if (error) throw new Error(error);
            data = JSON.parse(response.body)
            console.log(data)

            res.json(data.data.url);
          });        
    }catch (err) {
        console.log(err);
    }
})

module.exports = router