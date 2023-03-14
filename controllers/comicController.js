const db = require('../config/database')
const fs = require('fs')
const path = require('path')
const blobStorage = require('../config/blobStorage')

module.exports = {
    getAllComics: (req, res) => {
        db.query("SELECT * FROM comics", function (err, result) {
            if (err) throw err;

            res.json(result)
        })
        
    },

    uploadComic: async (req, res) => {
        //declare variables
        const name = req.body.name, description = req.body.description;
        var files = [];

        //populate fileURLs array
        req.files.uploadFiles.forEach(file => {
            files.push({file: file.path, filename: file.filename})
        });

        //upload files to blob storage
        files.forEach(file => {
            // get filepath
            fileRelativePath = path.join(__dirname, '..', '/uploads/comics/', file.filename)
            
            // get file buffer
            const fileBuffer = fs.readFileSync(fileRelativePath)

            // upload file to storage
            console.log('filename')
            blobStorage.uploadFile(file.filename, fileBuffer).then(() => {

                // once files have been uploaded to cloud, delete files in uploads folder
                req.files.uploadFiles.forEach(file => {
                    fs.unlink(path.join(__dirname, '..', 'uploads/comics/', file.filename), function() {
                        console.log(file.filename + ' deleted in ../uploads/comics')
                    })
                })

                // make new database entry
            })
        })
        

        setTimeout(() => {
            // delete files in uploads folder
            req.files.uploadFiles.forEach(file => {
                fs.unlink(path.join(__dirname, '..', 'uploads/comics/', file.filename), function() {
                    console.log(file.filename + ' deleted in ../uploads/comics')
                })
            })
        }, 10000)


        res.sendStatus(200)
    }
}
