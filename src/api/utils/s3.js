import AWS from 'aws-sdk'
import env from 'src/api/utils/env'

const S3_BUCKET = env.S3_BUCKET
export let urlPrefix = `https://${S3_BUCKET}.s3.amazonaws.com`

let config = {}
if (env.NODE_ENV !== 'production') {
  config = {
    accessKeyId: 'DUMMY_ACCESS_KEY',
    secretAccessKey: 'DUMMY_SECRET_KEY',
    s3ForcePathStyle: true,
    sslEnabled: false,
    signatureVersion: 'v4',
    endpoint: new AWS.Endpoint('http://localhost:9000')
  }
  urlPrefix = `http://localhost:9000/${S3_BUCKET}`
}

const s3 = new AWS.S3(config)

export const getSignedUrl = (fileName, fileType) =>
  new Promise((resolve, reject) => {
    const s3Params = {
      Bucket: S3_BUCKET,
      Key: fileName,
      Expires: 600,
      ContentType: fileType
      // ACL: 'public-read'
    }

    s3.getSignedUrl('putObject', s3Params, (err, data) => {
      if (err) return reject(err)
      return resolve({
        signedRequest: data,
        url: `${urlPrefix}/${fileName}`
      })
    })
  })
