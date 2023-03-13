const db = require('../database')

module.exports = {
    getAllUpdates: (req, res) => {
        db.query("SELECT * FROM updates", function (err, result) {
            if (err) throw err;
    
            res.json(result)
        })
    }
}