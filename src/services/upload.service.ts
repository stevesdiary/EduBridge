import fs from 'fs';
import AWS from 'aws-sdk';

// Configure AWS S3 client
const s3 = new AWS.S3({
  endpoint: process.env.CLOUDFLARE_ENDPOINT,
  accessKeyId: process.env.CLOUDFLARE_ACCESS_ID,
  secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY,
  region: 'auto',
  // signatureVersion: 'v4',
});

export const uploadToR2 = async (filePath: string, fileName: string): Promise<string | undefined> => {
  const fileStats = fs.statSync(filePath);

  if (fileStats.size < 5485760) {
    const file = fs.readFileSync(filePath);
    const params = {
      Bucket: process.env.CLOUDFLARE_BUCKET_NAME || 'edubridge',
      Key: fileName,
      Body: file,
      ACL: 'public-read',
    };

    try {
      const data = await s3.upload(params).promise();
      console.log(data);
      return data.Location;
      // return `https://${process.env.CLOUDFLARE_BUCKET_NAME}.${process.env.CLOUDFLARE_ENDPOINT}/${fileName}`;
    } catch (err) {
      console.error(err);
      throw new Error('Error uploading file to Cloudflare');
    }
  }
  else {
    const uploadParams = {
      Bucket: process.env.CLOUDFLARE_BUCKET_NAME || 'edubridge',
      Key: fileName,
      Body: fs.createReadStream(filePath),
      ACL: 'public-read',
    };

    try {
      const data = await s3.upload(uploadParams).promise();
      console.log(data);
      return data.Location;
    } catch (err) {
      console.error(err);
      if (err === 'NetworkingError') {
        console.log('Retrying...');
        return await uploadToR2(filePath, fileName);
      } else {
        throw err;
      }
    }
  }
};
