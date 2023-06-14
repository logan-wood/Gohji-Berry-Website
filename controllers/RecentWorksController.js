const blobStorage = require('../config/blobStorage');
const db = require('../config/database');
const { randomUUID } = require('crypto');


module.exports = {
    getAllRecentWorks: (req, res) => {
        db.query("SELECT * FROM recent_works", function (err, result) {
            if (err) throw err;
    
            res.json(result)
        })
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
    }
}