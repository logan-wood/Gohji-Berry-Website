const db = require('../config/database')

module.exports = {
    getAllUpdates: (req, res) => {
        db.query("SELECT * FROM updates", function (err, result) {
            if (err) throw err;
    
            res.json(result)
        })
    },

    uploadUpdate: (req, res) => {
        const name = req.body.name, description = req.body.description;

        db.query('INSERT INTO updates (update_name, update_description) VALUES (?, ?)', [name, description], (err, result) => {
            if (err) {
                res.status(400).send('There was an error uploading the update')
                throw err;
            }

            res.status(200).send('Comic Successfully Uploaded')
        })
    },

    deleteUpdate: (req, res) => {
        const updateId = req.params.updateId;

        console.log()

        db.query('DELETE FROM updates WHERE update_id = ?', updateId, async (err, result) => {
            if (err) {
                console.log('error deleting from db')
                res.status(400).send('There was an error deleting the update from the database')
                return
            };
            // deleted record from db and cloud storage
            res.status(204).send('Update has been deleted')
        })
    }
}