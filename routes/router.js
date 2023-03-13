const express = require('express')
const router = express.Router()
const db = require('../database')

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
router.post('/uploadComic', comicController.uploadComic)

//archives
router.get('/getAllArchives', archiveController.getAllArchives)

//wips
router.get('/getAllWip', wipController.getAllWip)

//updates
router.get('/getAllUpdates', updateController.getAllUpdates)



module.exports = router;