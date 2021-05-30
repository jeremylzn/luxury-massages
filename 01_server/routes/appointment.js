const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth.js')
const admin = require('../middleware/admin')
const worker = require('../middleware/worker')
const Appointment = require('../../00_db/models/appointment')
var request = require('request');
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

// Payment for booking
router.post('/payment/booking', async(req, res) => {
    console.log(req.body)
    var options = {
        'method': 'POST',
        'url': 'https://sandbox.meshulam.co.il/api/light/server/1.0/createPaymentProcess',
        'headers': {
        },
        formData: req.body
      };
      request(options, function (error, response) {
        if (error) throw new Error(error);
        res.send(JSON.parse(response.body));
      });
      
})

module.exports = router