// const AWS = require('aws-sdk');
// import { S3Error, S3Response, UploadParams, S3ListResponse, ListParams } from '../types/s3';

// const bucketName = process.env.BUCKET_NAME;
// const accessKeyId = process.env.ACCESS_KEY_ID;
// const secretAccessKey = process.env.SECRET_ACCESS_KEY;
// const region = process.env.REGION;
// const endpoint = process.env.ENDPOINT;
import AWS from 'aws-sdk';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

interface UploadResult {
  url: string;
  key: string;
}

export class UploadService {
  private s3: AWS.S3;
  private bucketName: string;

  constructor() {
    // Configure AWS credentials
    AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION
    });

    this.s3 = new AWS.S3();
    this.bucketName = process.env.S3_BUCKET_NAME || '';
  }

  async uploadFile(file: Express.Multer.File, folder: string = 'uploads'): Promise<UploadResult> {
    // Validate file
    if (!file) {
      throw new Error('No file provided');
    }

    // Generate unique filename
    const fileExtension = path.extname(file.originalname);
    const uniqueFileName = `${folder}/${uuidv4()}${fileExtension}`;

    // Read file stream
    const fileStream = fs.createReadStream(file.path);

    // Upload parameters
    const uploadParams: AWS.S3.PutObjectRequest = {
      Bucket: this.bucketName,
      Key: uniqueFileName,
      Body: fileStream,
      ContentType: file.mimetype,
      ACL: 'public-read' // Adjust based on your security requirements
    };

    try {
      const result = await this.s3.upload(uploadParams).promise();

      // Optional: Remove local file after upload
      fs.unlinkSync(file.path);

      return {
        url: result.Location,
        key: result.Key
      };
    } catch (error) {
      console.error('S3 Upload Error:', error);
      throw new Error('File upload failed');
    }
  }

  async deleteFile(fileKey: string): Promise<void> {
    const deleteParams: AWS.S3.DeleteObjectRequest = {
      Bucket: this.bucketName,
      Key: fileKey
    };

    try {
      await this.s3.deleteObject(deleteParams).promise();
    } catch (error) {
      console.error('S3 Delete Error:', error);
      throw new Error('File deletion failed');
    }
  }
}

export const uploadService = new UploadService();
