const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth.js');
const admin = require('../middleware/admin')
const worker = require('../middleware/worker')
const uploadImage = require('../middleware/upload')
var multer  = require('multer')
const User = require('../../00_db/models/user');
const Appointment = require('../../00_db/models/appointment');
const Distributor = require('../../00_db/models/distributor');
const Disabled = require('../../00_db/models/disabled');
const momentTz = require('moment-timezone');
const moment = require("moment");
var fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../profile"))
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname.toLowerCase())
    }
})
const upload = multer({
    storage: storage
})

// const mailer = require('../middleware/send-email')

// Sign up new user
router.post('/signup', async(req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        const accessToken = await user.generateAuthToken()
        // mailer.sendSignupEmail(req.body.email, req.body.name)

        res.status(201).send({ user, accessToken })
    } catch (err) {
        res.status(400).send(err)
    }
})

// Log in existing user
router.post('/login', async(req, res) => {

    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const accessToken = await user.generateAuthToken()
        res.send({ user, accessToken })
    } catch (err) {
        console.log(err)
        res.status(400).send({message: err.message})
    }
})

// Log out a user (delete token)
router.post('/tkn/logout', auth, async(req, res) => {
    try {
        req.user.accessToken = ''
        await req.user.save()

        res.status(200).send({ message: `${req.user.name} has logged out` })
    } catch (err) {
        console.log(err)
        res.status(500).send()
    }
})

// ADMIN - GET WORKER AVAILABLE
router.get('/workers/:datetime/:minutes', async(req, res) => {
    try {
        datetime = moment.tz(new Date(req.params.datetime), "Asia/Jerusalem")
        const users = await User.find({role: 2})
        const userNotAvailable = await Appointment.find({date : {$gte: datetime}, date : {$lte: new Date(datetime + parseInt(req.params.minutes)*60*1000) } }, {workerDetails: true, _id:false})
        const allUserNotAvailable = userNotAvailable.map(data => {
            return data.workerDetails.workerID.toString()
        })

        users.forEach((worker, index, object) => {
            if (allUserNotAvailable.includes(worker._id.toString()))
                object.splice(index, 1);
        });
        res.send(users)
    } catch (err) {
        console.log(err)
        res.status(500).send()
    }
})

// ADMIN - Create Worker
router.post('/admin/worker', admin, async(req, res) => {
    const user = new User(req.body)
    try {
        await user.save()

        res.status(201).send(user)
    } catch (err) {
        res.status(400).send(err)
    }
})

// ADMIN - Get all workers
router.get('/admin/workers', admin, async(req, res) => {
    try {
        const users = await User.find({role: 2})
        res.send(users)
    } catch (err) {
        res.status(500).send()
    }
})

// ADMIN - Get all customers
router.get('/admin/customers', async(req, res) => {
    try {
        const users = await User.find({role: 3})
        res.send(users)
    } catch (err) {
        res.status(500).send()
    }
})

// ADMIN - Get specific worker
router.get('/admin/workers/:id', admin, async(req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.send(user)
    } catch (err) {
        res.status(500).send()
    }
})

// WORKER - Get profile picture
router.get('/profile/:id', async(req, res) => {
    const user = await User.findById({_id: req.params.id}, {_id:false, img:true})
    const imageName = user.img.toString()
    const imagePath = path.join(__dirname, "../profile", imageName);
    fs.exists(imagePath, exists => {
        if (exists) res.sendFile(imagePath);
        else res.status(400).send('Error: Image does not exists');
    });
})

// WORKER - get availiblity by worker
router.get('/availability/:id', async(req, res) => {
    user = await User.findById({_id: req.params.id},  {_id:false, availability:true})
    res.send(user.availability)
})

// WORKER - Add availiblity
router.post('/availability/:id', async(req, res) => {
    console.log(req.body.events)
    // for (let event of req.body.events) {
    //     var mydate = new Date(event.dateStr);
    //     event.date = mydate.toISOString()
    // }
    req.body.events.forEach((data) => {
        data.start = moment.tz(data.start, "Asia/Jerusalem").toISOString()
        data.end = moment.tz(data.end, "Asia/Jerusalem").toISOString()
    });
    user = await User.findByIdAndUpdate({_id: req.params.id},  { $set: {availability:req.body.events} })
    res.send(user)
})
// WORKER - Upload profile picture
router.post('/worker/profile/:id', upload.single('newPhotoProfile'), async(req, res, next) => {
    console.log('BEFORE IF')
    const filename = req.file.filename;
    const last_image = await User.findById({_id: req.params.id}, {_id:false, img:true})
    console.log(last_image)
    console.log(last_image.img)
    if (last_image.img != 'default.jpg'){
        var lastFilePath = path.join(__dirname, "../profile", (last_image.img).toString())
        console.log(lastFilePath)
        fs.unlinkSync(lastFilePath);
    }
    user = await User.findByIdAndUpdate({_id: req.params.id},  { $set: {img:filename} })
    res.send(user)
})


// Get worker by customers
router.get('/tkn/workers', auth, async(req, res) => {
    try {
        const users = await User.find({role: 2})
        res.send(users)
    } catch (err) {
        res.status(500).send()
    }
})


// Add distributor
router.post('/distributor/:name', async(req, res) => {
    try {
        console.log(req.params.name)
        const userData = {userID: req.body.id, fullname: req.body.fullname, email:req.body.email, telephone:req.body.telephone, address:req.body.address}
        const distributor = await Distributor.findOneAndUpdate({name: req.params.name}, {$push: {usersList : userData } }, {upsert: true})
        res.send(distributor)
    } catch (err) {
        console.log(err)
        res.status(500).send()
    }
})

// ADMIN - Get all distributors
router.get('/admin/distributor', async(req, res) => {
    try {
        const distributors = await Distributor.find({})
        res.send(distributors)
    } catch (err) {
        console.log(err)
        res.status(500).send()
    }
})

// ADMIN - Add disabled
router.post('/disabled', async(req, res) => {
    var list_date = req.body.dates
    list_date.forEach((data) => {
        data.start = moment.tz(data.start, "Asia/Jerusalem")
        data.end = moment.tz(data.end, "Asia/Jerusalem")
    });
    await Disabled.deleteMany({})
    await Disabled.insertMany(list_date)
    res.send({message: 'OK'})
})

// get disabled
router.get('/disabled', async(req, res) => {
    disabled = await Disabled.find({})
    res.send(disabled)
})

// Send confidential pdf
router.get('/confidential', async(req, res) => {
    try {
        // ./01_server/confidential.pdf
        const src = fs.createReadStream('./01_server/confidential.pdf');

        res.writeHead(200, {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'attachment; filename=confidential.pdf',
          'Content-Transfer-Encoding': 'Binary'
        });
      
        src.pipe(res);
        
    } catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
})


module.exports = router