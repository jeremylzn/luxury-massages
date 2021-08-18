const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth.js');
const admin = require('../middleware/admin')
const Review = require('../../00_db/models/review');
const momentTz = require('moment-timezone');
const moment = require("moment");

// Add review
router.post('/review', async(req, res) => {
    const review = new Review(req.body)
    try {
        await review.save()
        res.status(201).send(review)
    } catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
})

// Get all review
router.get('/admin/review', async(req, res) => {
    try {
        const review = await Review.find()
        res.send(review)
    } catch (err) {
        res.status(500).send()
    }
})

// Get review actif
router.get('/review', async(req, res) => {
    try {
        const review = await Review.find({actif:true})
        res.send(review)
    } catch (err) {
        res.status(500).send()
    }
})

// ADMIN - Change actif false/true
router.put('/admin/review/actif/:id', admin, async(req, res) => {
    try {
        const review = await Review.findByIdAndUpdate({_id: req.params.id}, { $set: {actif: req.body.actif } })
        res.send(review)
    } catch (err) {
        console.log(err)
        res.status(500).send()
    }
})


module.exports = router