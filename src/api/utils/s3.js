import AWS from 'aws-sdk'
import env from 'src/api/utils/env'

const S3_BUCKET = env.S3_BUCKET
export let endpoint = env.S3_ENDPOINT || 'http://localhost:9000'

// Get urlPrefix for assets.
export let urlPrefix = (function () {
  if (env.NODE_ENV === 'production') {
    // If production and endpoint is GCS.
    // SEE: https://qiita.com/ngyuki/items/fd3bb47cd4aeb2f61fec
    if (env.S3_ENDPOINT === 'https://storage.googleapis.com') {
      return `https://storage.cloud.google.com/${S3_BUCKET}`
    }

    // If production and otherwise(default to AWS)
    return `https://${S3_BUCKET}.s3.amazonaws.com`
  }

  // Default to local minio
  return 'http://localhost:9000'
})()

let config = {
  accessKeyId: env.AWS_ACCESS_KEY_ID || 'DUMMY_ACCESS_KEY',
  secretAccessKey: env.AWS_SECRET_ACCESS_KEY || 'DUMMY_SECRET_KEY',
  s3ForcePathStyle: true,
  sslEnabled: false,
  signatureVersion: 'v4',
  endpoint: new AWS.Endpoint(endpoint)
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
