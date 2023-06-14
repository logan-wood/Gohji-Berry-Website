const AzureStorageBlob = require('@azure/storage-blob')
const B2 = require('backblaze-b2')
const b2 = new B2({
    applicationKeyId: process.env.BACKBLAZE_KEY_ID,
    applicationKey: process.env.BACKBLAZE_APPLICATION_KEY
})

module.exports = {
    uploadFile: async (filename, buffer) => {
        await b2.authorize()

        var uploadURL, uploadAuthToken
        // console.log('getting upload url...')
        await b2.getUploadUrl({
            bucketId: process.env.BACKBLAZE_BUCKET_ID
        }).then((res) => {
            uploadURL = res.data.uploadUrl
            uploadAuthToken = res.data.authorizationToken
        });

        // console.log('attempting to upload file...')
        const uploadFileResponse = await b2.uploadFile({
            uploadUrl: uploadURL,
            uploadAuthToken: uploadAuthToken,
            fileName: filename,
            data: buffer
        })
        .catch((error) => {
            console.error('Upload to cloud storage failed: ' + error);
            return null;
        });
        
        const responseData = uploadFileResponse.data;
        
        return responseData
    },

    // returns true if file has been deleted, false if not been deleted
    deleteFile: async (fileId) => {
        // check fileId is not null
        if (fileId === '') {
            return false
        }
        try {
            await b2.authorize();

            if (fileId) {
                await b2.deleteFileVersion({
                    fileId: fileId
                })
                .catch((error) => {
                    console.error(error.message)
                    return false;
                })
                return true;
            } else {
                return false;
            }
        } catch(error) {
            console.error(error.message)
        }
    }
}