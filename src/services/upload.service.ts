// import CloudinaryConfiguration from '../core/cloudinary.config';
// import { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
// import cloudinary from '../core/cloudinary.config';
// const uploadPdf = async (pdfFilePath: string): Promise<UploadApiResponse | UploadApiErrorResponse> => {
//   return await cloudinary.uploader.upload(pdfFilePath, {
//     resource_type: 'raw',
//     folder: 'uploads',
//     format: 'pdf',
//     flags: 'attachment',
//     attachment: true,
//   });
// };

// const getPdfUrl = (assetId: string): string => {
//   return cloudinary.url(assetId, {
//     resource_type: 'raw',
//     format: 'pdf',
//     secure: false
//   });
// };

// export { uploadPdf, getPdfUrl };