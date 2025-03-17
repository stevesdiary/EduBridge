import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs/promises';
import path from 'path';
import { CloudinaryUploadOptions, FileUploadResult } from '../types/cloudinary.type';

class CloudinaryUploadService {
  private defaultOptions: CloudinaryUploadOptions = {
    use_filename: true,
    unique_filename: false,
    overwrite: false,
    folder: 'uploads'
  };

  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true
    });
  }

  /**
   * Upload file to Cloudinary
   * @param filePath Local file path
   * @param options Cloudinary upload options
   * @returns Promise with upload result
   */
  async uploadFile(
    filePath: string, 
    // options: CloudinaryUploadOptions = {}
  ): Promise<FileUploadResult> {
    try {
      const result = await cloudinary.uploader.upload(filePath, { 
        resource_type: 'raw',
        folder: 'edubridge',
        access_mode: 'public'
      });

      await this.deleteLocalFile(filePath);

      return {
        url: result.secure_url,
        publicId: result.public_id,
        originalFilename: path.basename(filePath)
      };
    } catch (error) {
      console.error('Cloudinary Upload Error:', error);
      throw new Error('File upload to Cloudinary failed');
    }
  }

  /**
   * Delete local file after upload
   * @param filePath Path to local file
   */
  private async deleteLocalFile(filePath: string): Promise<void> {
    try {
      await fs.unlink(filePath);
      console.log(`Local file ${filePath} deleted successfully`);
    } catch (error) {
      console.error('Error deleting local file:', error);
    }
  }

  /**
   * Delete file from Cloudinary
   * @param publicId Cloudinary public ID
   */
  async deleteCloudinaryFile(publicId: string): Promise<void> {
    try {
      await cloudinary.uploader.destroy(publicId);
      console.log(`Cloudinary file ${publicId} deleted successfully`);
    } catch (error) {
      console.error('Cloudinary Delete Error:', error);
      throw new Error('File deletion from Cloudinary failed');
    }
  }
}

export default new CloudinaryUploadService();
