// const cloudinary = require('cloudinary').v2;
// const multer = require('multer');
// const { CloudinaryStorage } = require('multer-storage-cloudinary');
// require('dotenv').config();
// const courseRoute = require("../routes/course.route")

// const app = express();

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // Cloudinary Storage Configuration
// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: 'uploads',
//     allowed_formats: ['jpg', 'png', 'jpeg', 'gif', 'webp', 'pdf'],
//     // transformation: [{ width: 500, crop: 'scale' }], // Optional image transformation
//   }
// });

// // Multer Upload Configuration
// const upload = multer({ 
//   storage: storage,
//   limits: {
//     fileSize: 5 * 1024 * 1024 // 5MB file size limit
//   }
// });

// // Single File Upload Endpoint
// app.post('/upload', upload.single('file'), async (req, res) => {
//   try {
//     // If no file is uploaded
//     if (!req.file) {
//       return res.status(400).json({ 
//         error: 'No file uploaded' 
//       });
//     }

//     // Successful upload response
//     res.status(200).json({
//       message: 'File uploaded successfully',
//       file: {
//         originalName: req.file.originalname,
//         cloudinaryUrl: req.file.path, // Cloudinary URL
//         publicId: req.file.filename, // Cloudinary public ID
//         size: req.file.size
//       }
//     });
//   } catch (error) {
//     console.error('Upload error:', error);
//     res.status(500).json({ 
//       error: 'File upload failed',
//       details: error.message 
//     });
//   }
// });

// // Multiple Files Upload Endpoint
// app.post('/upload-multiple', upload.array('files', 5), async (req, res) => {
//   try {
//     // If no files are uploaded
//     if (!req.files || req.files.length === 0) {
//       return res.status(400).json({ 
//         error: 'No files uploaded' 
//       });
//     }

//     // Map uploaded files to response
//     const uploadedFiles = req.files.map(file => ({
//       originalName: file.originalname,
//       cloudinaryUrl: file.path,
//       publicId: file.filename,
//       size: file.size
//     }));

//     res.status(200).json({
//       message: 'Files uploaded successfully',
//       files: uploadedFiles
//     });
//   } catch (error) {
//     console.error('Multiple upload error:', error);
//     res.status(500).json({ 
//       error: 'Multiple file upload failed',
//       details: error.message 
//     });
//   }
// });

// Step 1: Configuring Cloudinary
// First, you need to configure Cloudinary with your cloud name, API key, and API secret.

// Create a new file called cloudinary.config.js with the following content:


// const cloudinary = require('cloudinary').v2;

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// module.exports = cloudinary;


// Replace your-cloud-name, your-api-key, and your-api-secret with your actual Cloudinary credentials.

// Step 2: Creating a Method to Generate the URL
// Create a new file called cloudinary.utils.js with the following content:


// const cloudinary = require('./cloudinary.config');
// cloudinary.config.js
// This file should be in the root of your project and should contain your Cloudinary credentials:


// const cloudinary = require('cloudinary').v2;

// cloudinary.config({
//   cloud_name: 'your-cloud-name',
//   api_key: 'your-api-key',
//   api_secret: 'your-api-secret',
// });

// module.exports = cloudinary;


// cloudinary.utils.js
// This file should be in the same directory as your main application file and should contain the functions for uploading and getting the file:

