// import CloudinaryConfiguration from '../core/cloudinary.config';
import { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
import cloudinary from '../core/cloudinary.config';
const uploadPdf = async (pdfFilePath: string): Promise<UploadApiResponse | UploadApiErrorResponse> => {
  return await cloudinary.uploader.upload(pdfFilePath, {
    resource_type: 'raw',
    folder: 'uploads',
    format: 'pdf',
    flags: 'attachment',
    attachment: true,
  });
};

const getPdfUrl = (assetId: string): string => {
  return cloudinary.url(assetId, {
    resource_type: 'raw',
    format: 'pdf',
    secure: false
  });
};

export { uploadPdf, getPdfUrl };

//https://res.cloudinary.com/your-cloud-name/raw/upload/[asset_id].[extension]
// const pdfUrl = cloudinary.url('e957158a2362510d5f29bf175025c710.pdf', {
//   resource_type: 'raw',
//   format: 'pdf',
//   secure: false,
// });