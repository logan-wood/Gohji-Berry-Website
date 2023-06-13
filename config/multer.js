const { randomUUID } = require('crypto');
const multer = require('multer');
const path = require('path');

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, path.join(__dirname, '..', '/uploads'));
//     },
//     filename: function (req, file, cb) {
//         cb(
//             null,
//             file.fieldname + '-' + randomUUID() + path.extname(file.originalname)
//         );
//     }
// });

const storage = multer.memoryStorage()

const upload = multer({ storage: storage });

module.exports = {
    uploadMultiple: function (req, res, next) {
        upload.fields([{ name: 'uploadFiles' }])(req, res, next);
    },

    uploadSingle: async function (req, res, next) {
        upload.single('uploadFile')(req, res, next);
    },

    uploadText: function(req, res, next) {
        upload.none()(req, res, next)
    }
};