const { randomUUID } = require('crypto');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', '/uploads/comics'));
    },
    filename: function (req, file, cb) {
        cb(
            null,
            file.fieldname + '-' + randomUUID() + path.extname(file.originalname)
        );
    }
});

const upload = multer({ storage: storage });

module.exports = {
    uploadMultiple: function (req, res, next) {
        upload.fields([{ name: 'uploadFiles' }])(req, res, next());
    }
};