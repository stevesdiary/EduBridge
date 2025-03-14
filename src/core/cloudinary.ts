// import { v2 as cloudinary } from 'cloudinary';
// // const cloudinary = require('cloudinary').v2;
// // import { CloudinaryStorage } from 'multer-storage-cloudinary';
// import multer from 'multer';

// // Configure Cloudinary
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
//   secure: true
// });

// console.log(cloudinary.config());
// const uploadFile = async(imagePath) => {
//   // allow overwriting the asset with new versions
//   const options = {
//     use_filename: true,
//     unique_filename: false,
//     overwrite: true,
//   };

//   try {
//     // Upload the image
//     const result = await cloudinary.uploader.upload(imagePath, options);
//     console.log(result);
//     return result.public_id;
//   } catch (error) {
//     console.error(error);
//   }

// } 
// /////////////////////////////////////
// // Gets details of an uploaded image
// /////////////////////////////////////
// const getAssetInfo = async (public_id) => {

//   // Return colors in the response
//   const options = {
//     colors: true,
//   };

//   try {
//       // Get details about the asset
//       const result = await cloudinary.api.resource(public_id, options);
//       console.log(result);
//       return result.colors;
//       } catch (error) {
//       console.error(error);
//   }
// };