const db = require('../config/database')
const fs = require('fs')
const path = require('path')
const blobStorage = require('../config/blobStorage')

module.exports = {
    getAllComics: async (req, res) => {
        db.query("SELECT * FROM comics", function (err, result) {
            if (err) {
                res.status(400).send('There was an error getting comics from the database')
            };

            res.status(200).json(result)
        })
    },

    uploadComic: async (req, res) => {
        //declare variables
        const name = req.body.name, description = req.body.description;
        var files = [];
        var b2FileNameArray = [];
        var fileIdArray = [];

        // keep track of whether file upload worked
        var filesUploaded = true;

        //populate fileURLs array
        for (const file of req.files.uploadFiles) {
            files.push({file: file.path, filename: file.filename})
        }

        // upload files to blob storage
        for (const file of files) {
            // get filepath
            fileRelativePath = path.join(__dirname, '..', '/uploads/comics/', file.filename)
                        
            // get file buffer
            const fileBuffer = fs.readFileSync(fileRelativePath)

            // upload file to storage
            const fileUploadRes = await blobStorage.uploadFile('comics/' + file.filename, fileBuffer)
            .catch((error) => {
                filesUploaded = false;
                console.error("Error uploading file: " + error);
            })

            fileIdArray.push(fileUploadRes.fileId)

            // once files have been uploaded to cloud, delete files in uploads folder
            req.files.uploadFiles.forEach(file => {
                fs.unlink(path.join(__dirname, '..', 'uploads/comics/', file.filename), function() {
                    // console.log(file.filename + ' deleted in ../uploads/comics')
                })
            })

            //next, add the cloud file storage filename to an array for the database entry
            b2FileNameArray.push("https://f005.backblazeb2.com/file/gohji-berry/" + fileUploadRes.fileName)
        }

        if (b2FileNameArray && name && description && filesUploaded)
        {
            //make new database entry
            db.query('INSERT INTO comics (comic_name, comic_description, file_paths, file_id) VALUES (?, ?, ?, ?)', [name, description, JSON.stringify(b2FileNameArray), JSON.stringify(fileIdArray)], (err, result) => {
                if (err) {
                    res.status(400).send('There was an error uploading the comic')
                    throw err;
                }

                res.status(200).send('Comic Successfully Uploaded')
            })
        }
        
    },

    deleteComic: async (req, res) => {
        const comic_id = req.params.comic_id;
        var fileDeleted = false;

        // get fileId from database
        db.query('SELECT file_id FROM comics WHERE comic_id = ?', comic_id, async (err, result) => {
            if (err) {
                res.status(400).send('There was an error deleting the comic from the database')
                return
            };

            if (result) {
                const fileId = result[0].file_id;
            
                // delete file from cloud storage
                const fileDeleted = await blobStorage.deleteFile(fileId)

                // delete from db
                if (fileDeleted) {
                    db.query('DELETE FROM comics WHERE comic_id = ?', comic_id, async (err, result) => {
                        if (err) {
                            console.log('error deleting from db')
                            res.status(400).send('There was an error deleting the comic from the database')
                            return
                        };
                        // deleted record from db and cloud storage
                        res.status(204).send('File has been deleted')
                    })
                }
                else {
                    console.log('fileDeleted: ' + fileDeleted)
                    console.log('error deleting from cloud storage')
                    res.status(400).send('There was an error deleting the comic from the database')
                }    
            }
        })
    }
}
