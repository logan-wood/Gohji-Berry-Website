const express = require('express')
const router = express.Router()
const db = require('../config/database')
const multer = require('../config/multer')

//controllers
const worksController = require('../controllers/worksController')
const comicController = require('../controllers/comicController')
const updateController = require('../controllers/updateController')

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

// router.post('/uploadComic', function(req, res) {
//     multer.uploadMultiple(req, res, (err) => {
//         if (!err) {
//             comicController.uploadComic(req, res)
//         } else {
//             console.log(err)
//         }
//     }) 
// })

router.post('/uploadComic', multer.uploadMultiple, comicController.uploadComic)

router.delete('/deleteComic/:comic_id', comicController.deleteComic)

//works
router.get('/getAllWorks', worksController.getAllWorks)

router.post('/uploadWork', multer.uploadSingle, worksController.uploadWork)

router.delete('/deleteWork/:workId', worksController.deleteWork)

//updates
router.get('/getAllUpdates', updateController.getAllUpdates)

router.post('/uploadUpdate', multer.uploadText, updateController.uploadUpdate)

router.delete('/deleteUpdate/:updateId', updateController.deleteUpdate)



module.exports = router;