const express = require('express')
const router = express.Router()
const db = require('../database')

router.get('/', function (req, res) {
    res.send('gohji berry API')
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

router.get('/getAllComics', function (req, res) {
    db.query("SELECT * FROM comics", function (err, result) {
        if (err) throw err;

        res.json(result)
    })
})

router.get('/getAllArchives', function (req, res) {
    db.query("SELECT * FROM archives", function (err, result) {
        if (err) throw err;

        res.json(result)
    })
})

router.get('/getAllWip', function (req, res) {
    db.query("SELECT * FROM wip", function (err, result) {
        if (err) throw err;

        res.json(result)
    })
})

router.get('/getAllUpdates', function (req, res) {
    db.query("SELECT * FROM updates", function (err, result) {
        if (err) throw err;

        res.json(result)
    })
})

router.get('/uploadComic', function (req, res) {
    
})

module.exports = router;