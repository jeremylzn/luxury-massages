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
    for (let event of req.body.events) {
        var mydate = new Date(event.dateStr);
        event.date = mydate.toISOString()
    }
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
        console.log(distributor)
        res.send(distributor)
    } catch (err) {
        console.log(err)
        res.status(500).send()
    }
})
// ADMIN - Get all users
// router.get('/admin/users', authAsAdmin, async(req, res) => {
//     try {
//         const users = await User.find({})
//         res.send(users)
//     } catch (err) {
//         res.status(500).send()
//     }
// })

// ADMIN - Get specific user by id
// router.get('/admin/user/:id', authAsAdmin, async(req, res) => {
//     try {
//         const user = await User.findById(req.params.id)
//         if (user)
//             res.status(200).send(user)
//         else
//             res.status(404).send({ 'error': 'User not found!' })
//     } catch (err) {
//         res.status(500).send(err)
//     }
// })

// ADMIN - Delete a user by id
// router.delete('/admin/users/:id', authAsAdmin, async(req, res) => {
//     try {
//         const user = await User.findByIdAndRemove(req.params.id)

//         if (user)
//             res.status(200).send(user)
//         else
//             res.status(404).send({ 'error': 'User not found!' })
//     } catch (err) {
//         res.status(500).send(err)
//     }
// })

// Get currently logged in user
router.get('/users/home', auth, async(req, res) => {
    res.send(req.user)
})

// Add a new notification to the user
// router.post('/notification', auth, async(req, res) => {
//     try {
//         req.user.notifications.unshift(req.body) // unshift inserts the notification to the beginning of the array
//         await req.user.save()

//         res.status(200).send(req.body)
//     } catch (err) {
//         res.status(500).send()
//     }
// })

// ADMIN - Add a new notification to another user
// router.post('/notification/:id', authAsAdmin, async(req, res) => {
//     try {
//         const user = await User.findById(req.params.id)

//         user.notifications.unshift(req.body) // unshift inserts the notification to the beginning of the array
//         await user.save()
//         res.status(200).send(req.body)
//     } catch (err) {
//         res.status(500).send()
//     }
// })

// Get all user's notifications
// router.get('/notification', auth, async(req, res) => {
//     try {
//         res.status(200).send(req.user.notifications)
//     } catch (err) {
//         res.status(500).send()
//     }
// })

// Mark all user's notifications as seen
// router.post('/notifications/read', auth, async(req, res) => {
//     try {
//         req.user.notifications.forEach((notification) => { notification.seen = true })

//         await User.findByIdAndUpdate(req.user.id, { notifications: req.user.notifications })

//         await req.user.save()

//         res.status(200).send(req.user.notifications)
//     } catch (err) {
//         res.status(500).send()
//     }
// })

// ADMIN - Update user
// router.put('/admin/user/update/:id', authAsAdmin, async(req, res) => {
//     var id = req.params.id;
//     var item = req.body;
//     const result = await User.updateOne({ _id: id }, item)
//     res.send(result);
// });

module.exports = router