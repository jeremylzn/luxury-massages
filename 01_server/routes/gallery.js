const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth.js');
const admin = require('../middleware/admin')
const worker = require('../middleware/worker')
const uploadImage = require('../middleware/upload')
var multer  = require('multer')
const Gallery = require('../../00_db/models/gallery');
const momentTz = require('moment-timezone');
const moment = require("moment");
var fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../gallery"))
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname.toLowerCase())
    }
})
const upload = multer({
    storage: storage
})

// Add galery
router.post('/admin/gallery', async(req, res) => {
    const gallery = new Gallery(req.body)
    try {
        await gallery.save()
        res.status(201).send(gallery)
    } catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
})

// Add gallery Image
router.post('/admin/gallery/:id/:name', upload.single('newGalleryPicture'), async(req, res, next) => {
    const gallery = await Gallery.findByIdAndUpdate({_id: req.params.id},  { $set: {img: req.params.name} })
    res.send(gallery)
})

// Get all gallery
router.get('/admin/gallery', async(req, res) => {
    try {
        const gallery = await Gallery.find()
        res.send(gallery)
    } catch (err) {
        res.status(500).send()
    }
})

// Get all gallery actif
router.get('/admin/gallery/actif', async(req, res) => {
    try {
        const gallery = await Gallery.find({actif:true})
        res.send(gallery)
    } catch (err) {
        res.status(500).send()
    }
})

// Get gallery image
router.get('/gallery/:id', async(req, res) => {
    const gallery = await Gallery.findById({_id: req.params.id},  {_id:false, img:true})
    const imageName = gallery.img.toString()
    const imagePath = path.join(__dirname, "../gallery", imageName);
    fs.exists(imagePath, exists => {
        if (exists) res.sendFile(imagePath);
        else res.status(400).send('Error: Image does not exists');
    });
})

// Update actif gallery
router.put('/admin/gallery/actif/:id', async(req, res) => {
    try {
        const gallery = await Gallery.findByIdAndUpdate({_id: req.params.id},  { $set: {actif: req.body.actif} })
        res.send(gallery)
    } catch (err) {
        res.status(500).send()
    }
})

module.exports = router