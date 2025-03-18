// import { v2 as cloudinary } from 'cloudinary';
// import { ApiResponse } from '../types/type';
// // import type { } from '@aws-sdk/client-s3';

// // Configure Cloudinary
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET
// });

// class CloudinaryUploadService {
//   /**
//    * Upload a file to Cloudinary
//    * @param file - The file to upload (from Express request)
//    * @param folder - Optional folder in Cloudinary to upload to
//    * @returns Promise with upload result or error
//    */
//   async uploadFile(file: Express.Multer.File, folder: string = 'lessons'): Promise<ApiResponse<{ url: string, public_id: string }>> {
//     try {
//       // Check if file exists
//       if (!file) {
//         return {
//           statusCode: 400,
//           status: 'error',
//           message: 'No file provided',
//           data: null
//         };
//       }

//       // Upload to Cloudinary
//       const uploadResult = await new Promise<cloudinary.UploadApiResponse>((resolve, reject) => {
//         const uploadStream = cloudinary.uploader.upload_stream(
//           { 
//             folder: folder,
//             resource_type: 'auto' // Automatically detect resource type
//           }, 
//           (error, result) => {
//             if (error) reject(error);
//             else resolve(result);
//           }
//         );

//         // If file is a buffer, write to stream
//         if (file.buffer) {
//           uploadStream.end(file.buffer);
//         } else {
//           // If file is a path, read and upload
//           const fs = require('fs');
//           fs.createReadStream(file.path).pipe(uploadStream);
//         }
//       });

//       // Return successful upload response
//       return {
//         statusCode: 200,
//         status: 'success',
//         message: 'File uploaded successfully',
//         data: {
//           url: uploadResult.secure_url,
//           public_id: uploadResult.public_id
//         }
//       };

//     } catch (error) {
//       console.error('Cloudinary Upload Error:', error);
//       return {
//         statusCode: 500,
//         status: 'error',
//         message: 'Failed to upload file',
//         data: null
//       };
//     }
//   }

//   /**
//    * Delete a file from Cloudinary
//    * @param publicId - Public ID of the file to delete
//    * @returns Promise with deletion result
//    */
//   async deleteFile(publicId: string): Promise<ApiResponse<null>> {
//     try {
//       const result = await cloudinary.uploader.destroy(publicId);

//       if (result.result === 'ok') {
//         return {
//           statusCode: 200,
//           status: 'success',
//           message: 'File deleted successfully',
//           data: null
//         };
//       }

//       return {
//         statusCode: 400,
//         status: 'error',
//         message: 'Failed to delete file',
//         data: null
//       };
//     } catch (error) {
//       console.error('Cloudinary Delete Error:', error);
//       return {
//         statusCode: 500,
//         status: 'error',
//         message: 'Error deleting file',
//         data: null
//       };
//     }
//   }
// }

// export default new CloudinaryUploadService();
