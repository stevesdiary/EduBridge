import yup from 'yup';
import { Response, Request as ExpressRequest } from 'express';
import { courseCreationSchema, idSchema, searchSchema, courseStatusSchema } from '../utils/validator';
import { CourseCreationData, ApiResponse, CourseResponse } from '../types/type';
import courseService from '../services/course.service';
import { CourseStatus, Category } from '../models/course.model';
import { title } from 'process';


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
        search: req.query.search as string || '',
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
        const transformedCourses = courses.map(course => ({
          ...course,
          description: course.description || ''
        }));
        return res.status(200).json({
          status: 'success',
          message: 'Courses retrieved successfully',
          data: transformedCourses
        });
      }
      if (courses && typeof courses === 'object' && 'statusCode' in courses) {
        return res.status(courses.statusCode).json({
          status: courses.status,
          message: courses.message,
          data: courses.data
        });
      }
      return res.status(500).json({
        status: 'error',
        message: 'Invalid response format',
        data: null
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
      const coursesData = await courseService.getCoursesBySubject();
      const courses: CourseResponse[] = coursesData.map(course => ({
        id: course.id,
        title: course.title,
        description: course.description ?? null,
        subject: course.subject || '',
        instructor: course.instructor ?? null,
        category: course.category,
        createdAt: course.createdAt,
        updatedAt: course.updatedAt
      }));
      
      const response: ApiResponse<CourseResponse[]> = {
        statusCode: 200,
        status: 'success',
        message: 'Courses retrieved based on subject grouping',
        data: courses
      };

      return res.status(response.statusCode).json(response);
    } catch (error) {
      console.error('Error fetching courses:', error);
      return res.status(500).json({
        statusCode: 500,
        status: 'error',
        message: error instanceof Error ? error.message : 'Failed to fetch courses',
        data: null
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
