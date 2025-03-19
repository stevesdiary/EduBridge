import { Router, Request as ExpressRequest, Response } from 'express';
import authentication from '../middlewares/authentication';
import { checkRole } from '../middlewares/authorisation';
import lessonController from '../controllers/lesson.controller';
import { upload } from '../middlewares/file.upload';
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
// import { uploadPdf, getPdfUrl } from '../services/upload.service';

const lessonRouter = Router();

lessonRouter.post('/create', 
  // authentication, 
  // checkRole(['professional', 'admin']),
  upload.single('file'), 
  async (req: ExpressRequest, res: Response) => {
    await lessonController.createLesson(req, res);
});

// lessonRouter.post('/upload-pdf', async (req: Request, res: Response) => {
//   try {
//     const pdfFilePath = './path/to/your/pdf/file.pdf';
//     const uploadResult = await uploadPdf(pdfFilePath);
//     const publicId = uploadResult.public_id;
//     const pdfUrl = getPdfUrl(publicId);
//     res.send({ pdfUrl });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ message: 'Error uploading PDF' });
//   }
// });


// lessonRouter.post('/upload-pdf', upload.single('file'), async (req: ExpressRequest, res: Response) => {
//   try {
//     if (!req.file){ 
//       res.status(400).send({ message: 'File not selected for upload' });
//       return;
//     }
//     const pdfFilePath = req.file.path;
//     const uploadResult = await uploadPdf(pdfFilePath);
//     const publicId = uploadResult.url;
//     console.log('RESULT', uploadResult)
    
//     res.send({ publicId });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ message: 'Error uploading PDF' });
//   }
// });
// lessonRouter.get('/all', 
//   // authentication, 
//   // checkRole(['user', 'admin']), 
//   async (req: ExpressRequest, res: Response) => {
//     await lessonController.getAllLessons(req, res);
// });

// lessonRouter.get('/:id', 
//   // authentication, 
//   // checkRole(['user', 'admin']), 
//   async (req: ExpressRequest, res: Response) => {
//     await lessonController.getOneLesson(req, res);
// });

// lessonRouter.put(
//   '/lessons/:lessonId/resource', 
//   upload.single('resource'), 
//   async (req: ExpressRequest, res: Response) => {
//   lessonController.updateLessonResource(req, res);
// });

export default lessonRouter;





// // import cloudinary from './cloudinary.config';


// const uploadPdf = async (pdfFilePath: string): Promise<UploadApiResponse | UploadApiErrorResponse> => {
//   return await cloudinary.uploader.upload(pdfFilePath, {
//     resource_type: 'raw',
//     format: 'pdf',
//   });
// };

// const getPdfUrl = (publicId: string): string => {
//   return cloudinary.url(publicId, {
//     resource_type: 'raw',
//     format: 'pdf',
//   });
// };

// export { uploadPdf, getPdfUrl };


// app.ts
// This file should be in the root of your project and should contain your main application logic:


// import express, { Request, Response } from 'express';
// import { uploadPdf, getPdfUrl } from './cloudinary.utils';

// const app = express();


// app.listen(3000, () => {
//   console.log('Server listening on port 3000');
// });


// Note that I've added type annotations and imports to make the code more TypeScript-friendly.

// Also, make sure to install the required dependencies, including @types/cloudinary and @types/express, to get the type definitions for Cloudinary and Express:


// bash
// npm install --save-dev @types/cloudinary @types/express