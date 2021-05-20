const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth.js')
const admin = require('../middleware/admin')
const Service = require('../../00_db/models/service')
// const mailer = require('../middleware/send-email')


// Get all services actif
router.get('/services/actif', async(req, res) => {
    try {
        const services = await Service.find({ actif: true })
        res.send(services)
    } catch (err) {
        res.status(500).send()
    }
})

// ADMIN - Get all services
router.get('/admin/services', admin, async(req, res) => {
    try {
        const services = await Service.find()
        res.send(services)
    } catch (err) {
        res.status(500).send()
    }
})

// ADMIN - Change actif false/true
router.put('/admin/services/actif/:id', admin, async(req, res) => {
    try {
        const services = await Service.findByIdAndUpdate({_id: req.params.id}, { $set: {actif: req.body.actif } })
        res.send(services)
    } catch (err) {
        console.log(err)
        res.status(500).send()
    }
})

// ADMIN - update service
router.put('/admin/services/:id', admin, async(req, res) => {
    try {
        const services = await Service.findByIdAndUpdate({_id: req.params.id}, { $set: req.body })
        res.send(services)
    } catch (err) {
        res.status(500).send()
    }
})

// ADMIN - Create service
router.post('/admin/services', admin, async(req, res) => {
    console.log(req.body)
    const service = new Service(req.body)
    try {
        console.log(service)
        await service.save()
        res.status(201).send(service)
    } catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
})

module.exports = router