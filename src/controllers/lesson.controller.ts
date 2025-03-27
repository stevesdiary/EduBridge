import { Response, Request as ExpressRequest } from 'express';

import { uploadService } from '../services/upload.service';
import { lessonCreationSchema, idSchema } from '../utils/validator';
import lessonService from '../services/lesson.service';
import { LessonCreationAttributes } from '../types/lesson.types';
// import { idSchema,  } from '../utils/validator';

const lessonController = {
  createLesson: async (req: ExpressRequest, res: Response) => {
    try {
      // Validate file
      // if (!req.file) {
      //   return res.status(400).json({
      //     status: 'error',
      //     message: 'File not selected for upload',
      //     data: null
      //   });
      // }

      // Upload file to S3
      // const uploadResult = await uploadService.uploadFile(req.file, 'lessons');

      // Validate lesson data
      const validatedData = await lessonCreationSchema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true
      });
      
      const lessonData: LessonCreationAttributes = {
        title: validatedData.title,
        content: validatedData.content || '',
        moduleId: validatedData.moduleId || '',
        instructor: validatedData.instructor,
        resourceUrl: validatedData.resourceUrl,
        category: validatedData.category as string
      };
      
      const result = await lessonService.createLesson(lessonData);
      
      return res.status(result.statusCode).json({
        status: result.status,
        message: result.message,
        data: result.data
      });
    } catch (error) {
      console.error('Lesson Creation Error:', error);
      return res.status(500).json({
        status: 'error',
        message: 'Internal server error',
        data: null
      });
    }
  },

  getAllLessons: async (req: ExpressRequest, res: Response) => {
    try {
      const lessons = await lessonService.getLessons();
      return res.status(lessons.statusCode).json({
        status: lessons.status,
        message: lessons.message,
        data: lessons.data
      })
    } catch (error) {
      console.error('Error', error);
      return res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      });
    }
  },

  getOneLesson: async (req: ExpressRequest, res: Response) => {
    try {
      const id = await idSchema.validate(req.params.id, {abortEarly: false});
      const lesson = await lessonService.getOneLessonRecord(id);
      
      if (!lesson.data) {
        return res.status(404).json({
          status: 'fail',
          message: 'Lesson not found',
          data: null
        });
      }
      
      return res.status(lesson.statusCode).json({
        status: lesson.status,
        message: lesson.message,
        data: lesson.data
      });
    } catch (error) {
      console.error('Error: ', error);
      return res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      });
    }
  },

  updateLesson: async (req: ExpressRequest, res: Response) => {
    try {
      const id = await idSchema.validate(req.params.id, {abortEarly: false});
      const updateData = req.body;
      
      const updatedLesson = await lessonService.updateLesson(id, updateData);
      
      return res.status(updatedLesson.statusCode).json({
        status: updatedLesson.status,
        message: updatedLesson.message,
        data: updatedLesson.data
      });
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      });
    }
  },

  deleteLesson: async (req: ExpressRequest, res: Response) => {
    try {
      const id = await idSchema.validate(req.params.id, {abortEarly: false});
      const deletedLesson = await lessonService.deleteLesson(id);
      
      return res.status(deletedLesson.statusCode).json({
        status: deletedLesson.status,
        message: deletedLesson.message,
        data: deletedLesson.data
      });
    } catch (error) {
      console.error('Error: ', error);
      return res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      });
    }
  }
}

export default lessonController;
