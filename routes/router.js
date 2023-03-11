const express = require('express')
const router = express.Router()
const db = require('../database')
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '../uploads/')
    },
    filename: function (req, file, cb) {
        cb(
          null,
          file.fieldname + '-' + Date.now() + path.extname(file.originalname)
        );
    },
})

const upload = multer({ storage: storage })
const uploadMultiple = upload.fields([{ name: 'files' }])

//controllers
const archiveController = require('../controllers/archiveController')
const comicController = require('../controllers/comicController')
const updateController = require('../controllers/updateController')
const wipController = require('../controllers/wipController')

//misc routes
router.get('/', function (req, res) {
    res.send('Welcome to the gohjiberry api. valid routes can be found in the /routes/router.js file.')
})

router.get('/pingDB', function (req, res) {
    db.query('/* ping */ SELECT 1', function(err, result) {
        if (err) {
            res.send(false)
            throw err
        }

        res.send(true)
    })
})

//comics
router.get('/getAllComics', comicController.getAllComics)
router.post('/uploadComic', uploadMultiple, comicController.uploadComic)

//archives
router.get('/getAllArchives', archiveController.getAllArchives)

//wips
router.get('/getAllWip', wipController.getAllWip)

//updates
router.get('/getAllUpdates', updateController.getAllUpdates)



module.exports = router;