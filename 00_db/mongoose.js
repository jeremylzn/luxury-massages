const mongoose = require('mongoose')


mongoose.connect('mongodb://161.97.157.17:27017/lux-massage', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true, 
    useFindAndModify: false
})