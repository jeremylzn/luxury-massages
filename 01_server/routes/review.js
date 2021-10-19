const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth.js');
const admin = require('../middleware/admin')
const Review = require('../../00_db/models/review');
const momentTz = require('moment-timezone');
const moment = require("moment");
const uploadImage = require('../middleware/upload')
var fs = require('fs');
const path = require('path');
var multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../reviews"))
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname.toLowerCase())
    }
})
const upload = multer({
    storage: storage
})

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

// Add reviews Image
router.post('/review/:id/:name', upload.single('newReviewPicture'), async(req, res, next) => {
    console.log('Add reviews Image')
    const review = await Review.findByIdAndUpdate({_id: req.params.id},  { $set: {img: req.params.name} })
    res.send(review)
})

// Get reviews image
router.get('/review/image/:id', async(req, res) => {
    const review = await Review.findById({_id: req.params.id},  {_id:false, img:true})
    const imageName = review.img.toString()
    const imagePath = path.join(__dirname, "../reviews", imageName);
    fs.exists(imagePath, exists => {
        if (exists) res.sendFile(imagePath);
        else res.status(400).send('Error: Image does not exists');
    });
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