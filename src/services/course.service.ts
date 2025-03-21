import { Op } from 'sequelize';

import { Module } from '../models/module.model';
import { User } from '../models/user.model';
import { Course } from '../models/course.model';
// import { CourseCreateDTO, CourseStatus, CourseResponse, ApiResponse, SearchData } from '../types/type';
import { Profile } from '../models/profile.model';
import { Sequelize, Model, DataTypes } from 'sequelize';
import { ApiResponse, CourseCreationData, SearchData,  Search, CourseResponse } from '../types/type';
import sequelize from '../core/database';



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
        order: [['createdAt', 'DESC']] // Optional: sort by most recent
      });

      if (!courses.rows.length) {
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
      return categories;
    } catch (error) {
      console.error('Error fetching unique categories:', error);
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
      const getOne = await Course.findByPk(id);
      if (!getOne) {
        return {
          statusCode: 404,
          status: 'fail',
          message: 'Record not found',
          data: null
        }
      }
      return {
        statusCode: 200,
        status: 'success',
        message: 'Record found',
        data: getOne
      }
    } catch (error) {
      
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
