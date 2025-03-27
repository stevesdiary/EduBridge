import { Op } from 'sequelize';

import { Module } from '../models/module.model';
import { User } from '../models/user.model';
import { Course } from '../models/course.model';
// import { CourseCreateDTO, CourseStatus, CourseResponse, ApiResponse, SearchData } from '../types/type';
import { Profile } from '../models/profile.model';
import { Sequelize, Model, DataTypes } from 'sequelize';
import { ApiResponse, CourseCreationData, SearchData,  Search, CourseResponse, GetGroupedCourses } from '../types/type';
import { RedisOptions } from '../types/type';
import { saveToRedis, getFromRedis } from '../core/redis';

const CACHE_KEY = 'courses';
const CACHE_TTL = 3900;

const courseService = {
  createCourse: async (courseData: CourseCreationData): Promise<ApiResponse<CourseResponse>> => {
    try {
      const existigCourse = await Course.findOne({
        where: {
          title: courseData.title,
          category: courseData.category,
          description: courseData.description,
          instructor: courseData.instructor
        }
      });
      if (existigCourse) {
        return {
          statusCode: 409,
          status: 'fail',
          message: 'Course already exists',
          data: null
        }
      }
      const course = await Course.create(courseData);
      
      // Transform the course data to ensure all required fields are present
      const courseResponse: CourseResponse = {
        id: course.id,
        title: course.title || '',
        description: course.description || '',  // Provide default value if undefined
        category: course.category || '',
        subject: course.subject || '',
        instructor: course.instructor || '',
        createdAt: course.createdAt,
        updatedAt: course.updatedAt
      };

      return {
        statusCode: 201,
        status: 'success',
        message: 'Course created successfully',
        data: courseResponse
      };
    } catch (error) {
      throw error;
    }
  },

  getCourses: async (Search: Search) => {
    try {

      const cachedCourses = await getFromRedis('courses');
      if (cachedCourses) {  
        const courses = JSON.parse(cachedCourses);
        return {
          statusCode: 200,
          status: 'success',
          message: 'Courses fetched from cache',
          data: courses
        };
      }
      const whereCondition: any = {};

      if (Search.search) {
        whereCondition[Op.or] = [
          { title: { [Op.iLike]: `%${Search.search}%` } },
          { description: { [Op.iLike]: `%${Search.search}%` } },
        ];
      }
      
      const courses = await Course.findAndCountAll({
        where: whereCondition,
        limit: Search.limit,
        offset: (Search.page - 1) * Search.limit,
        order: [['createdAt', 'DESC']]
      });

      if (!courses.rows.length) {
        return {
          statusCode: 404,
          status: 'fail',
          message: 'No course found',
          data: null,
        };        
      }
      await saveToRedis('courses', JSON.stringify(courses), CACHE_TTL);
      return {
        statusCode: 200,
        status: 'success',
        message: 'Courses fetched from database',
        data: {
          courses: courses.rows,
          totalCourses: courses.count,
          currentPage: Search.page,
          totalPages: Math.ceil(courses.count / Search.limit)
        },
      };      
    } catch (error) { 
      console.error('Error in get course service:', error);
      throw error;
    }
  },

  getCoursesByCategory: async (SearchData: SearchData) => {
    try {
      const categories = await Course.findAll({
        where : { category : { [Op.like]: `%${SearchData.category}%` } },
      });
      if (!Course || Course.length === 0) {
        return {
          statusCode: 404,
          status: 'fail',
          message: 'No course found',
          data: null,
        };        
      }
      return {
        statusCode: 200,
        status: 'success',
        message: 'Courses retrieved ',
        data: categories
      };
    } catch (error) {
      console.error('Error fetching unique categories:', error);
      throw error;
    }
  },

  getPrimaryCourses: async (SearchData: GetGroupedCourses) => {
    try {
      const primary = await Course.findAll({
        where : { category : { [Op.eq]: 'primary' } },
      });
      if (!primary || primary.length === 0) {
        return {
          statusCode: 404,
          status: 'fail',
          message: 'No course found',
          data: null,
        };        
      }
      return {
        statusCode: 200,
        status: 'success',
        message: 'Primary courses retrieved ',
        data: primary
      };
    } catch (error) {
      console.error('Error fetching primary courses:', error);
      throw error;
    }
  },

  getSecondaryCourses: async (SearchData: GetGroupedCourses) => {
    try {
      const secondary = await Course.findAll({
        where : { category : { [Op.eq]: 'secondary' } },
      });
      if (!secondary || secondary.length === 0) {
        return {
          statusCode: 404,
          status: 'fail',
          message: 'No course found',
          data: null,
        };        
      }
      return {
        statusCode: 200,
        status: 'success',
        message: 'Secondary courses retrieved ',
        data: secondary
      };
    } catch (error) {
      console.error('Error fetching secondary courses:', error);
      throw error;
    }
  },

  getSoftSkills: async (SearchData: GetGroupedCourses) => {
    try {
      const softSkills = await Course.findAll({
        where : { category : { [Op.eq]: 'soft_skill' } },
      });
      if (!softSkills || softSkills.length === 0) {
        return {
          statusCode: 404,
          status: 'fail',
          message: 'No course found',
          data: null,
        };        
      }
      return {
        statusCode: 200,
        status: 'success',
        message: 'Soft skills retrieved ',
        data: softSkills
      };
    } catch (error) {
      console.error('Error fetching usoft skills:', error);
      throw error;
    }
  },

  getExamPrep: async (SearchData: GetGroupedCourses) => {
    try {
      const examPrep = await Course.findAll({
        where : { category : { [Op.eq]: 'exam_preparation' } },
      });
      if (!examPrep || examPrep.length === 0) {
        return {
          statusCode: 404,
          status: 'fail',
          message: 'No course found',
          data: null,
        };        
      }
      return {
        statusCode: 200,
        status: 'success',
        message: 'Exam prep questions retrieved ',
        data: examPrep
      };
    } catch (error) {
      console.error('Error fetching exam prep questios:', error);
      throw error;
    }
  },

  getCoursesBySubject: async () => {
    try {
      // const subjects = await Course.findAll({
      //   attributes: [
      //     [Sequelize.fn('DISTINCT', Sequelize.col('subject')), 'subject']
      //   ],
      //   where: {
      //     subject: {
      //       [Op.not]: null  // Use Sequelize.Op.not to exclude null values
      //     }
      //   },
      //   raw: true
      // }).then(results => 
      //   results.map(result => result.subject)
      // );
      const subjects = await Course.findAll({
        attributes: ['subject'],
        group: ['subject'],
        raw: true
      });
        
      return subjects;
    } catch (error) {
      console.error('Error fetching unique subjects:', error);
      throw error;
    }
  },

  getOneCourseRecord: async (id: string) => {
    try {
      // const cachedCourse = await getFromRedis('oneCourse');
      // if (cachedCourse) {
        // const lessons = JSON.parse(cachedCourse);
      //   return {
      //     statusCode: 200,
      //     status: 'success',
      //     message: 'Course fetched from cache',
      //     data: course
      //   };
      // }
      const getOne = await Course.findByPk(id);
      if (!getOne) {
        return {
          statusCode: 404,
          status: 'fail',
          message: 'Record not found',
          data: null
        }
      }
      // await saveToRedis('oneCourse', JSON.stringify(getOne), CACHE_TTL);
      return {
        statusCode: 200,
        status: 'success',
        message: 'Record found',
        data: getOne
      }
    } catch (error) {
      console.log('Error fetching course record', error);
      throw error;
    }
  },

  updateCourse: async (id: string, status: string) => {
    try {
      const update = await Course.update(
        { status: status},
        {where: {id}},
      )
      if (update) {
        return {
          statusCode: 200,
          status: 'success',
          message: 'Course updated',
          data: null
        }
      }
    } catch (error) {
      console.log('Error cancelling appoitmet', error);
      throw error;
    }
  },

  cancelCourse: async (id: string) => {
    try {
      const cancel = await Course.update(
        { status: 'cancelled'},
        {where: {id}},
      )
      if (cancel) {
        return {
          statusCode: 200,
          status: 'success',
          message: 'Course cancelled',
          data: null
        }
      }
    } catch (error) {
      console.log('Error cancelling appoitmet', error);
      throw error;
    }
  },

  deleteCourseRecord: async (id: string) => {
    try {
      const deleteRecord = await Course.destroy(
        {where: {id}},
      )
      if (deleteRecord > 0) {
        return {
          statusCode: 200,
          status: 'success',
          message: 'Course record deleted',
          data: null
        }
      }

      return {
        statusCode: 404,
        status: 'fail',
        message: 'Course record not found or already deleted',
        data: null        
      }
    } catch (error) {
      console.log('Error deleting appoitmet record', error);
      throw error;
    }
  }
}

export default courseService;
