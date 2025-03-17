import { Request as ExpressRequest, Response } from 'express';
import { lessonService } from '../services/lesson.service';
import uploadService from '../services/upload.service';
import { CreateLessonDto } from '../types/lesson.types';

const lessonController = {
  createLesson: async (req: ExpressRequest, res: Response) => {
    try {

      if (!req.file?.path) {
        return res.status(400).json({
          status: 'error',
          message: 'No file uploaded'
        });
      }
      const resource_url = await uploadService.uploadFile(req.file.path)
      // console.log('RESOURCE_URL', req.file.path, resource_url);
      const lessonData: CreateLessonDto = {
        moduleId: req.body.moduleId,
        title: req.body.title,
        content: req.body.content,
        duration: req.body.duration,
        resourceUrl: resource_url.url
      } 
      console.log('GGG', lessonData)
      const result = await lessonService.createLesson(lessonData);
      return res.status(result.statusCode).json({
        status: result.status,
        message: result.message,
        data: result.data
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      return res.status(400).json({
        status: 'error',
        message: errorMessage
      });
    }
  },

  getAllLessons: async (req: ExpressRequest, res: Response) => {
    try {
      const result = await lessonService.getAllLessons();
      return res.status(200).json({
        status: 'success',
        message: 'Lessons retrieved successfully',
        data: result
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      return res.status(500).json({
        status: 'error',
        message: errorMessage
      });
    }
  },

  getOneLesson: async (req: ExpressRequest, res: Response) => {
    try {
      const { id } = req.params;
      const result = await lessonService.getOneLesson(id);
      return res.status(200).json({
        status: 'success',
        message: 'Lesson retrieved successfully',
        data: result
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      return res.status(404).json({
        status: 'error',
        message: errorMessage
      });
    }
  },
  
  // updateLessonResource: async (req: ExpressRequest, res: Response) => {
  //   try {
  //     const { lessonId } = req.params;

  //     // Check if file exists
  //     if (!req.file) {
  //       return res.status(400).json({ error: 'No file uploaded' });
  //     }

  //     // Upload new file to Cloudinary
  //     const uploadResult = await cloudinaryUploadService.uploadFile(req.file.path, {
  //       folder: 'lessons'
  //     });

  //     // Get existing lesson to delete old resource if exists
  //     const existingLesson = await lessonService.getOneLesson(lessonId);
      
  //     // Delete old Cloudinary resource if exists
  //     if (existingLesson.resourcePublicId) {
  //       await cloudinaryUploadService.deleteCloudinaryFile(existingLesson.resourcePublicId);
  //     }

  //     // Update lesson with new resource
  //     const updatedLesson = await lessonService.updateLesson(lessonId, {
  //       resourceUrl: uploadResult.url,
  //       resourcePublicId: uploadResult.publicId
  //     });

  //     res.status(200).json({
  //       message: 'Lesson resource updated successfully',
  //       lesson: updatedLesson,
  //       fileUrl: uploadResult.url
  //     });
  //   } catch (error) {
  //     console.error('Lesson Update Error:', error);
  //     res.status(500).json({ error: 'Failed to update lesson resource' });
  //   }
  // }
};

export default lessonController;

// import { Request, Response } from 'express';
// import cloudinaryUploadService from '../services/cloudinaryUploadService';
// import LessonService from '../services/lessonService'; // Your existing lesson service

// class LessonController {
//   /**
//    * Create lesson with file upload
//    */
//   async createLesson(req: Request, res: Response) {
//     try {
//       // Check if file exists
//       if (!req.file) {
//         return res.status(400).json({ error: 'No file uploaded' });
//       }

//       // Upload file to Cloudinary
//       const uploadResult = await cloudinaryUploadService.uploadFile(req.file.path, {
//         folder: 'lessons'
//       });

//       // Prepare lesson payload
//       const lessonPayload = {
//         ...req.body,
//         resourceUrl: uploadResult.url,
//         resourcePublicId: uploadResult.publicId
//       };

//       // Create lesson using lesson service
//       const lesson = await LessonService.createLesson(lessonPayload);

//       res.status(201).json({
//         message: 'Lesson created successfully',
//         lesson,
//         fileUrl: uploadResult.url
//       });
//     } catch (error) {
//       console.error('Lesson Creation Error:', error);
//       res.status(500).json({ error: 'Failed to create lesson' });
//     }
//   }

//   /**
//    * Update lesson resource
//    */
//   async updateLessonResource(req: Request, res: Response) {
//     try {
//       const { lessonId } = req.params;

//       // Check if file exists
//       if (!req.file) {
//         return res.status(400).json({ error: 'No file uploaded' });
//       }

//       // Upload new file to Cloudinary
//       const uploadResult = await cloudinaryUploadService.uploadFile(req.file.path, {
//         folder: 'lessons'
//       });

//       // Get existing lesson to delete old resource if exists
//       const existingLesson = await LessonService.getLessonById(lessonId);
      
//       // Delete old Cloudinary resource if exists
//       if (existingLesson.resourcePublicId) {
//         await cloudinaryUploadService.deleteCloudinaryFile(existingLesson.resourcePublicId);
//       }

//       // Update lesson with new resource
//       const updatedLesson = await LessonService.updateLesson(lessonId, {
//         resourceUrl: uploadResult.url,
//         resourcePublicId: uploadResult.publicId
//       });

//       res.status(200).json({
//         message: 'Lesson resource updated successfully',
//         lesson: updatedLesson,
//         fileUrl: uploadResult.url
//       });
//     } catch (error) {
//       console.error('Lesson Update Error:', error);
//       res.status(500).json({ error: 'Failed to update lesson resource' });
//     }
//   }
// }

// export default new LessonController();
