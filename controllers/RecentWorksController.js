const db = require('../config/database')

module.exports = {
    getAllRecentWorks: (req, res) => {
        db.query("SELECT * FROM recent_works", function (err, result) {
            if (err) throw err;
    
            res.json(result)
        })
    }
}