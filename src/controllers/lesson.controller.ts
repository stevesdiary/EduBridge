import { Request as ExpressRequest, Response } from 'express';
import { lessonService } from '../services/lesson.service';

const lessonController = {
  createLesson: async (req: ExpressRequest, res: Response) => {
    try {
      const result = await lessonService.createLesson(req.body);
      return res.status(201).json({
        status: 'success',
        message: 'Lesson created successfully',
        data: result
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
  }
};

export default lessonController;