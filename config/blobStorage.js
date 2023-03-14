const AzureStorageBlob = require('@azure/storage-blob')
const B2 = require('backblaze-b2')
const b2 = new B2({
    applicationKeyId: process.env.BACKBLAZE_KEY_ID,
    applicationKey: process.env.BACKBLAZE_APPLICATION_KEY
})

module.exports = {
    uploadFile: async (filename, buffer) => {
        await b2.authorize().then(console.log('authorized'))

        var uploadURL, uploadAuthToken
        b2.getUploadUrl({
            bucketId: process.env.BACKBLAZE_BUCKET_ID,
        }).then((res) => {
            uploadURL = res.data.uploadUrl
            uploadAuthToken = res.data.authorizationToken
            // console.log(res.data)
            console.log('promise resolved, uploadURL set')
            console.log('attempting to upload file...')

            b2.uploadFile({
                uploadUrl: uploadURL,
                uploadAuthToken: uploadAuthToken,
                fileName: filename,
                data: buffer
            }).then((res) => {
                console.log('file uploaded. displaying server response: ')
                console.log(res.data)
            }).catch((error) => {
                console.log(error)
            })
        })

       
        
    }
}