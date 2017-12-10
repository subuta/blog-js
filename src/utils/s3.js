import AWS from 'aws-sdk'

let config = {}
if (process.env.NODE_ENV === 'development') {
  config = {
    accessKeyId: 'DUMMY_ACCESS_KEY',
    secretAccessKey: 'DUMMY_SECRET_KEY',
    s3ForcePathStyle: true,
    sslEnabled: false,
    endpoint: new AWS.Endpoint('http://localhost:9000')
  }
}

const S3_BUCKET = 'sub-labo.com'

const s3 = new AWS.S3(config)

export const getSignedUrl = (fileName, fileType) => new Promise((resolve, reject) => {
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 600,
    ContentType: fileType,
    ACL: 'public-read'
  }

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if (err) return reject(err)
    return resolve({
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    })
  })
})
