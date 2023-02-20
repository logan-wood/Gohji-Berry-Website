const express = require('express')
const router = express.Router()
const db = require('../database')

router.get('/', function (req, res) {
    res.send('gohji berry API')
})

router.get('/getAllComics', function (req, res) {
    db.query("SELECT * FROM comics", function (err, result) {
        if (err) throw err;

        res.json(result)
    })
})

module.exports = router;