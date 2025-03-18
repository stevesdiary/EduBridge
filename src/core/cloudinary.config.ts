import { v2 as cloudinary } from 'cloudinary';

// Cloudinary Configuration Interface
interface CloudinaryConfig {
  cloud_name: string;
  api_key: string;
  api_secret: string;
  folder?: string;
}

// Cloudinary Configuration Class
class CloudinaryConfiguration {
  private static instance: CloudinaryConfiguration;
  private config: CloudinaryConfig;

  private constructor() {
    this.config = {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '',
      api_key: process.env.CLOUDINARY_API_KEY || '',
      api_secret: process.env.CLOUDINARY_API_SECRET || '',
      folder: process.env.CLOUDINARY_FOLDER || 'lessons'
    };

    this.validateConfig();
    this.configureCloudinary();
  }

  // Singleton pattern
  public static getInstance(): CloudinaryConfiguration {
    if (!CloudinaryConfiguration.instance) {
      CloudinaryConfiguration.instance = new CloudinaryConfiguration();
    }
    return CloudinaryConfiguration.instance;
  }

  // Validate configuration
  private validateConfig(): void {
    const requiredFields: (keyof CloudinaryConfig)[] = [
      'cloud_name', 
      'api_key', 
      'api_secret'
    ];

    requiredFields.forEach(field => {
      if (!this.config[field]) {
        throw new Error(`Missing Cloudinary configuration: ${field}`);
      }
    });
  }

  // Configure Cloudinary
  private configureCloudinary(): void {
    cloudinary.config({
      cloud_name: this.config.cloud_name,
      api_key: this.config.api_key,
      api_secret: this.config.api_secret
    });
  }

  // Getter for Cloudinary configuration
  public getConfig(): CloudinaryConfig {
    return this.config;
  }
}

export default CloudinaryConfiguration;
