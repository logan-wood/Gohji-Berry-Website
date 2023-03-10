const db = require('../database')

module.exports = {
    getAllWip: (req, res) => {
        db.query("SELECT * FROM wip", function (err, result) {
            if (err) throw err;
    
            res.json(result)
        })
    }
}