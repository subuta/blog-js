import AWS from 'aws-sdk'
import {
  NODE_ENV,
  S3_ENDPOINT,
  S3_BUCKET,
  S3_URL_PREFIX,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
} from 'src/api/utils/env'

const ENDPOINT = S3_ENDPOINT || 'http://localhost:9000'

// Get urlPrefix for assets.
const urlPrefix = (function () {
  if (process.env.NODE_ENV === 'production') {
    // If production and endpoint is GCS.
    if (S3_URL_PREFIX === 'https://storage.googleapis.com') {
      return `https://storage.cloud.google.com/${S3_BUCKET}`
    }

    // If production and otherwise(default to AWS)
    return `https://${S3_BUCKET}.s3.amazonaws.com`
  }

  // Use local minio as host otherwise
  return `${ENDPOINT}/${S3_BUCKET}`
})()

let config = {
  accessKeyId: AWS_ACCESS_KEY_ID || 'DUMMY_ACCESS_KEY',
  secretAccessKey: AWS_SECRET_ACCESS_KEY || 'DUMMY_SECRET_KEY',
  s3ForcePathStyle: true,
  sslEnabled: false,
  signatureVersion: 'v4',
  endpoint: new AWS.Endpoint(ENDPOINT)
}

const s3 = new AWS.S3(config)

export const getSignedUrl = (fileName, fileType) =>
  new Promise((resolve, reject) => {
    const s3Params = {
      Bucket: S3_BUCKET,
      Key: fileName,
      Expires: 600,
      ContentType: fileType
    }

    s3.getSignedUrl('putObject', s3Params, (err, data) => {
      if (err) return reject(err)
      return resolve({
        signedRequest: data,
        url: `${urlPrefix}/${fileName}`
      })
    })
  })
