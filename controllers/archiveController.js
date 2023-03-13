const db = require('../database')

module.exports = {
    getAllArchives: (req, res) => {
        db.query("SELECT * FROM archives", function (err, result) {
            if (err) throw err;
    
            res.json(result)
        })
    }
}