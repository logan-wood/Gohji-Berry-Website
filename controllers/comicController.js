const db = require('../database')

module.exports = {
    getAllComics: (req, res) => {
        db.query("SELECT * FROM comics", function (err, result) {
            if (err) throw err;

            res.json(result)
        })
        
    },

    uploadComic: (req, res) => {
        console.log(req.body)
        
        res.end()
    }
}