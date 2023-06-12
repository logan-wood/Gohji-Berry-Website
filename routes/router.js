const express = require('express')
const router = express.Router()
const db = require('../config/database')
const multer = require('../config/multer')
const multer2 = require('multer')
const upload = multer2()

//controllers
const recentWorksController = require('../controllers/RecentWorksController')
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

router.post('/uploadComic', function(req, res) {
    multer.uploadMultiple(req, res, (err) => {
        if (!err) {
            console.log('files uploaded')
            comicController.uploadComic(req, res)
        } else {
            console.log(err)
        }
    }) 
})

router.delete('/deleteComic/:comic_id', comicController.deleteComic)

//works
router.get('/getAllRecentWorks', recentWorksController.getAllRecentWorks)

//wips
router.get('/getAllWip', wipController.getAllWip)

//updates
router.get('/getAllUpdates', updateController.getAllUpdates)

router.post('/uploadUpdate', upload.none(), updateController.uploadUpdate)

router.delete('/deleteUpdate/:updateId', updateController.deleteUpdate)



module.exports = router;