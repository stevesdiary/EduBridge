import yup from 'yup';
import { Response, Request as ExpressRequest } from 'express';
import { courseCreationSchema, idSchema, searchSchema, courseStatusSchema } from '../utils/validator';
import { CourseCreationData } from '../types/type';
import courseService from '../services/course.service';
import { CourseStatus } from '../models/course.model';


const courseController = {
  createCourse: async (req: ExpressRequest, res: Response) => {
    try {
      // const validatedData = await courseCreationSchema.validate(req.body, {
      //   abortEarly: false,
      //   stripUnknown: true
      // });
      const validatedData = req.body;
      const courseData: CourseCreationData = {
        title: validatedData.title,
        description: validatedData.description,
        category: validatedData.category,
        instructor: validatedData.instructor || ''
      };
  
      const result = await courseService.createCourse(validatedData);
      return res.status(result.statusCode).json({
        status: result.status,
        message: result.message,
        data: result.data
      });
    } catch (error) {
      // if (error instanceof yup.ValidationError) {
      //   return res.status(400).json({
      //     status: 'error',
      //     message: 'Validation failed',
      //     errors: error.inner.map(err => ({
      //       field: err.path || 'unknown',
      //       message: err.message
      //     }))
      //   });
      // }
  
      console.error('Course Creation Error:', error);
      return res.status(500).json({
        status: 'error',
        message: 'Internal server error',
        data: null
      });
    }
  },

  getAllCourses: async (req: ExpressRequest, res: Response) => {
    try {
      // const searchData = await searchSchema.validate(req.body, { abortEarly: false });
      const searchData = {
        category: req.query.category as string || '',
        subject: req.query.subject as string || '',
        page: parseInt(req.query.page as string) || 1,
        limit: parseInt(req.query.limit as string) || 10
      }; 
      const courses = await courseService.getCourses(searchData);
      return res.status(courses.statusCode).json({
        status: courses.status,
        message: courses.message,
        data: courses.data
      })
    } catch (error) {
      // if (error instanceof yup.ValidationError) {
      //   return res.status(400).json({
      //     status: 'error',
      //     message: 'Validation failed',
      //     errors: error.errors
      //   });
      // }
      console.error('Error', error);
      return res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      });
    }
  },

  getByCategories: async (req: ExpressRequest, res: Response) => {
    try {
      const category = req.query.category as string;
      const searchData = {
        category: req.query.category as string || '',
        page: parseInt(req.query.page as string) || 1,
        limit: parseInt(req.query.limit as string) || 10
      }
      
      if(!category) {
        return ("category is required")
      }
      const courses = await courseService.getCoursesByCategory(searchData);
      if (Array.isArray(courses)) {
        return res.status(200).json({
          status: 'success',
          message: 'Courses retrieved successfully',
          data: courses
        });
      }
      return res.status(courses.statusCode).json({
        status: courses.status,
        message: courses.message,
        data: courses.data
      });
  } catch (error) {
      console.error('Error', error);
      return res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      });
    }
  },

  getBySubject: async (req: ExpressRequest, res: Response) => {
    try {
      const subject = req.query.subject as string;
      if(!subject) {
        return ("subjectis required")
      }
      const courses = await courseService.getCoursesBySubject(subject);
  } catch (error) {
      console.error('Error', error);
      return res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      });
    }
  },



  getOneCourse: async (req: ExpressRequest, res: Response) => {
    try {
      const id = await idSchema.validate(req.params.id, {abortEarly: false});
      const getOneRecord = await courseService.getOneCourseRecord(id);
      if (!getOneRecord) {
        return res.status(404).json({
          status: 'fail',
          message: 'Course not found',
          data: null
        });
      }
      return {
        statusCode: getOneRecord.statusCode,
        status: getOneRecord.status,
        message: getOneRecord.message,
        data: getOneRecord.data
      }
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        return res.status(400).json({
          status: 'error',
          message: 'Validation failed',
          errors: error.errors
        });
      }
      
      console.error('Error: ', error);
      return res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      });
    }
  },

  updateCourse: async (req: ExpressRequest, res: Response): Promise<Response> => {
    try {
      const id = await idSchema.validate(req.params.id, {abortEarly: false});
      const status = await courseStatusSchema.validate(req.body, {abortEarly: false });
      const updateCourse = await courseService.updateCourse(id, status as unknown as CourseStatus);
      if (!updateCourse) {
        return res.status(500).json({
          status: 'error',
          message: 'Failed to update course',
          data: null
        });
      }

      return res.status(updateCourse.statusCode).json({
        status: updateCourse.status,
        message: updateCourse.message,
        data: updateCourse.data
      });

    } catch (error) {
      // if (error instanceof yup.ValidationError) {
      //   return res.status(400).json({
      //     status: 'error',
      //     message: 'Validation failed',
      //     errors: error.errors
      //   });
      // }
      
      console.error('Error:', error);
      return res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      });
    }
  },

  deleteCourseRecord: async (req: ExpressRequest, res: Response) => {
    try {
      const id = await idSchema.validate(req.params.id, {abortEarly: false});
      const deleteCourse = await courseService.deleteCourseRecord(id);
      return {
        statusCode: deleteCourse.statusCode,
        status: deleteCourse.status,
        message: deleteCourse.message,
        data: deleteCourse.data
      }
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        return res.status(400).json({
          status: 'error',
          message: 'Validation failed',
          errors: error.errors
        });
      }
      
      console.error('Error: ', error);
      return res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      });
    }
  },

  cancelCourse: async (req: ExpressRequest, res: Response) => {
    try {
      const id = await idSchema.validate(req.params.id, {abortEarly: false});
      const cancelAppoinntmet = await courseService.cancelCourse(id);
      return {
        statusCode: cancelAppoinntmet?.statusCode,
        status: cancelAppoinntmet?.status,
        message: cancelAppoinntmet?.message,
        data: cancelAppoinntmet?.data
      }
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        return res.status(400).json({
          status: 'error',
          message: 'Validation failed',
          errors: error.errors
        });
      }
      
      console.error('Error: ', error);
      return res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      });     
    }
  }
}

export default courseController;
