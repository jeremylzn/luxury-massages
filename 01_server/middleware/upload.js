var multer = require('multer');


uploadImage = () => {
    console.log('LA')
    const imageStorage = multer.diskStorage({
        dest: (req, file, cb) => { cb(null, path.join(__dirname, "../profile")); },
        filename: (req, file, cb) => { cb(null, file.originalname); }
    })

    const imageFileFilter = (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            return cb(new Error('You can upload only image files!'), false);
        }
        console.log('LALAL')
        cb(null, true)
    };
    return multer({imageFileFilter, imageStorage})
}

module.exports = uploadImage;