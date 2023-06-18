const blobStorage = require('../config/blobStorage');
const db = require('../config/database');
const { randomUUID } = require('crypto');


module.exports = {
    getAllWorks: (req, res) => {
        db.query("SELECT * FROM recent_works", function (err, result) {
            if (err) throw err;
    
            res.json(result)
        })
    },

    getWorksByTag: (req, res) => {
        const tag = req.params.tag;
        var sql;

        if (tag === 'all') {
            sql = "SELECT * FROM recent_works"
        } else {
            sql = `SELECT * FROM recent_works WHERE JSON_CONTAINS(work_tags, JSON_QUOTE("?"))`
        }

        db.query(sql, [tag], function(err, result) {
            if (err) {
                console.error("An error occured retrieving works from database: " + err);
                res.status(400).send("An error occured retrieving works from the database");
                return;
            }

            res.json(result);
        });
    },

    uploadWork: async (req, res) => {
        const {name, description, tags } = req.body;
        const fileBuffer = req.file.buffer;
        var fileId, filePath = '';
        
        //upload file to cloud storage
        if (name && description && fileBuffer) {
            const fileName = 'works/' + randomUUID()

            const fileUploadRes = await blobStorage.uploadFile(fileName, fileBuffer)
            .catch((error) => {
                console.error("Error uploading file to cloud storage: " + error);
                res.status(400).send('Failed to upload the new entry.');
                return;
            });

            fileId = fileUploadRes.fileId
            filePath = "https://f005.backblazeb2.com/file/gohji-berry/" + fileUploadRes.fileName
        }

        db.query('INSERT INTO recent_works (work_name, work_description, work_tags, file_path, file_id) VALUES (?, ?, ?, ?, ?)', [name, description, tags, filePath, fileId], function(err, result) {
            if (err) {
                console.error("Error uploading work to database: " + err);
                res.status(400).send('Failed to upload the new entry.');
                return;
            }
        })
        
        // everything was successfull
        res.status(200).send('Successfully uploaded Work')
    },

    deleteWork: async (req, res) => {
        const work_id = req.params.workId;
        var fileDeleted = false;

        // get fileId from database
        db.query('SELECT file_id FROM recent_works WHERE work_id = ?', work_id, async (err, result) => {
            if (err) {
                res.status(400).send('There was an error deleting the work from the database')
                return
            };

            if (result) {
                const fileId = result[0].file_id;
            
                // delete file from cloud storage
                const fileDeleted = await blobStorage.deleteFile(fileId)

                // delete from db
                if (fileDeleted) {
                    db.query('DELETE FROM recent_works WHERE work_id = ?', work_id, async (err, result) => {
                        if (err) {
                            console.log('error deleting from db')
                            res.status(400).send('There was an error deleting the work from the database')
                            return
                        };
                        // deleted record from db and cloud storage
                        res.status(204).send('File has been deleted')
                    })
                }
                else {
                    console.log('fileDeleted: ' + fileDeleted)
                    console.log('error deleting from cloud storage')
                    res.status(400).send('There was an error deleting the work from the database')
                }    
            }
        })
    }
}