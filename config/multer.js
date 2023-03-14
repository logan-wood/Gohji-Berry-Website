const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, '..', '/uploads/comics'))
    },
    filename: function (req, file, cb) {
        cb(
        null,
        file.fieldname + '-' + Date.now() + path.extname(file.originalname)
        );
    },
})

const upload = multer({ storage: storage })

module.exports = { uploadMultiple: 
    upload.fields([{ name: 'uploadFiles' }], 
        function(err) {
            console.log('file uploaded')
            if (err) {
                console.log(err) 
            }
        }
    )
}

