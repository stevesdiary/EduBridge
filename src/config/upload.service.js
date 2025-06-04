const fs = require('fs');

const AWS = require('aws-sdk');
const s3 = new AWS.S3({
  endpoint: process.env.CLOUDFLARE_ENDPOINT,
  accessKeyId: process.env.CLOUDFLARE_ACCESS_ID,
  secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY,
  region: 'auto',
  signatureVersion: 'v4'
})

module.exports = { 
  uploadToR2: async (filePath, fileName) => {
    const fileStats = fs.statSync(filePath);
    
    if (fileStats.size > 5485760) {
      const file = fs.readFileSync(filePath);
      const params = {
        Bucket: process.env.CLOUDFLARE_BUCKET_NAME || 'edubridge',
        Key: fileName,
        Body: file,
        ACL: 'public-read'
      };
      s3.putObject(params, (err, data) => {
        if (err) {
          console.log(err);
          // throw new Error('Error uploading file to Cloudflare');
        } else{
          console.log(data);
          return `https://${process.env.CLOUDFLARE_BUCKET_NAME}.${process.env.CLOUDFLARE_ENDPOINT}/${fileName}`;
        }
      });
    }
    else {
      s3.upload({
        Bucket: process.env.CLOUDFLARE_BUCKET_NAME || 'edubridge',
        Key: fileName,
        Body: fs.createReadStream(filePath),
        ACL: 'public-read'
          }).promise().then((data) => {
        console.log(data);
        return data.Location;
      }
      ).catch(async (err) => {
        console.log(err);
        if (err.code === 'NetworkingError') {
          console.log('Retrying...');
          await uploadToR2(filePath, fileName);
        }
      });
      // return `https://${process.env.CLOUDFLARE_BUCKET_NAME}.${process.env.CLOUDFLARE_ENDPOINT}/${fileName}`;
    }
  }
}