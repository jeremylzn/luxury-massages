const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth.js');
const admin = require('../middleware/admin')
const worker = require('../middleware/worker')
const uploadImage = require('../middleware/upload')
var multer  = require('multer')
const Advertising = require('../../00_db/models/advertising');
const momentTz = require('moment-timezone');
const moment = require("moment");
var fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../ads"))
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname.toLowerCase())
    }
})
const upload = multer({
    storage: storage
})

// Get ids of ads files 
router.get('/ids/ads', async(req, res) => {
    try {
        const ids = await Advertising.find({actif:true},  {_id:true})
        const idsList = ids.map(data => { return data._id })
        res.send(idsList)
    } catch (err) {
        res.status(500).send()
    }
})

// Get ads list
router.get('/ads', async(req, res) => {
    try {
        const ids = await Advertising.find({})
        res.send(ids)
    } catch (err) {
        res.status(500).send()
    }
})

// Get ads
router.get('/ads/:id', async(req, res) => {
    console.log(req.params.id)
    const ads = await Advertising.findById({_id: req.params.id},  {_id:false, nameFile:true})
    console.log(ads)
    const imageName = ads.nameFile.toString()
    const imagePath = path.join(__dirname, "../ads", imageName);
    fs.exists(imagePath, exists => {
        if (exists) res.sendFile(imagePath);
        else res.status(400).send('Error: Image does not exists');
    });
})

// update ads Image
router.post('/update/ads/:id', upload.single('newAdsPicture'), async(req, res, next) => {
    const filename = req.file.filename;
    const last_image = await Advertising.findById({_id: req.params.id}, {_id:false, nameFile:true})
    console.log(last_image)
    console.log(last_image.nameFile)
    if (!last_image.nameFile.includes('default-ads')){
        var lastFilePath = path.join(__dirname, "../ads", (last_image.nameFile).toString())
        console.log(lastFilePath)
        fs.unlinkSync(lastFilePath);
    }
    ads = await Advertising.findByIdAndUpdate({_id: req.params.id},  { $set: {nameFile:filename} })
    res.send(ads)
})

// Add ads Image
router.post('/add/ads/:nameSociety/:nameFile', upload.single('newAdsPicture'), async(req, res, next) => {
    const ads = new Advertising({nameSociety: req.params.nameSociety, nameFile: req.params.nameFile})
    await ads.save()
    res.send(ads)
})

// update ads Image
router.put('/actif/ads/:id', async(req, res, next) => {
    ads = await Advertising.findByIdAndUpdate({_id: req.params.id},  { $set: {actif: req.body.actif} })
})

// Delete a ads by id
router.delete('/ads/:id', async(req, res) => {

    const last_image = await Advertising.findByIdAndRemove(req.params.id)
    if (!last_image.nameFile.includes('default-ads')){
        var lastFilePath = path.join(__dirname, "../ads", (last_image.nameFile).toString())
        console.log(lastFilePath)
        fs.unlinkSync(lastFilePath);
    }
    res.status(200).send(last_image)
})

module.exports = router