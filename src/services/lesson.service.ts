import { getFromRedis, saveToRedis } from '../core/redis';
import { Lesson } from '../models/lesson.model';
import { ApiResponse, LessonCreationAttributes, LessonCreationData, LessonResponse } from '../types/lesson.types';
import { RedisOptions, RedisCacheService } from '../types/type';

const CACHE_KEY = 'lessons';
const CACHE_TTL = 3900;

const lessonService = {
  createLesson: async (lessonData: LessonCreationAttributes): Promise<ApiResponse<LessonResponse>> => {
    try {

      const existingLesson = await Lesson.findOne({
        where: {
          title: lessonData.title,
          // content: lessonData.content,
          moduleId: lessonData.moduleId
        }
      });

      if (existingLesson) {
        return {
          statusCode: 409,
          status: 'fail',
          message: 'Lesson already exists',
          data: null
        };
      }
      console.log(lessonData);
      const lesson = await Lesson.create(lessonData);
      
      const lessonResponse: LessonResponse = {
        id: lesson.id,
        title: lesson.title,
        description: lesson.description,
        content: lesson.content,
        moduleId: lesson.moduleId,
        instructor: lesson.instructor,
        category: lesson.category as string
      };

      return {
        statusCode: 201,
        status: 'success',
        message: 'Lesson created successfully',
        data: lessonResponse
      };
    } catch (error) {
      console.error('Lesson creation error:', error);
      throw error;
    }
  },

  getLessons: async () => {
    try {
      const cachedLessons = await getFromRedis(CACHE_KEY);
      if (cachedLessons) {
        const lessons = JSON.parse(cachedLessons);
        return {
          statusCode: 200,
          status: 'success',
          message: 'Lessons fetched from cache',
          data: lessons
        };
      }
      const lessons = await Lesson.findAll();
      
      if (!lessons || lessons.length === 0) {
        return {
          statusCode: 404,
          status: 'fail',
          message: 'No lessons found',
          data: null,
        };        
      }
      saveToRedis(CACHE_KEY, JSON.stringify(lessons), CACHE_TTL);
      return {
        statusCode: 200,
        status: 'success',
        message: 'Lessons fetched from database',
        data: lessons,
      };      
    } catch (error) { 
      console.error('Error in get lessons service:', error);
      throw new Error('Failed to fetch lessons');
    }
  },

  getOneLessonRecord: async (id: string) => {
    try {
      const cachedLesson = await getFromRedis('oneLesson');
      if (cachedLesson) {
        const lesson = JSON.parse(cachedLesson);
        return {
          statusCode: 200,
          status: 'success',
          message: 'Lesson fetched from cache',
          data: lesson
        };
      }
      const lesson = await Lesson.findByPk(id);
      if (!lesson) {
        return {
          statusCode: 404,
          status: 'fail',
          message: 'Lesson not found',
          data: null
        }
      }
      saveToRedis('oneLesson', JSON.stringify(lesson), CACHE_TTL);
      return {
        statusCode: 200,
        status: 'success',
        message: 'Lesson found',
        data: lesson
      }
    } catch (error) {
      console.error('Error fetching lesson:', error);
      throw error;
    }
  },

  updateLesson: async (id: string, updateData: Partial<LessonCreationData>) => {
    try {
      const [updatedRowsCount] = await Lesson.update(
        updateData,
        { where: { id } }
      );

      if (updatedRowsCount > 0) {
        return {
          statusCode: 200,
          status: 'success',
          message: 'Lesson updated',
          data: null
        }
      }

      return {
        statusCode: 404,
        status: 'fail',
        message: 'Lesson not found',
        data: null
      }
    } catch (error) {
      console.error('Error updating lesson', error);
      throw error;
    }
  },

  deleteLesson: async (id: string) => {
    try {
      const deletedRowsCount = await Lesson.destroy({
        where: { id }
      });

      if (deletedRowsCount > 0) {
        return {
          statusCode: 200,
          status: 'success',
          message: 'Lesson deleted',
          data: deletedRowsCount
        }
      }

      return {
        statusCode: 404,
        status: 'fail',
        message: 'Lesson not found or already deleted',
        data: null        
      }
    } catch (error) {
      console.error('Error deleting lesson', error);
      throw error;
    }
  }
}

export default lessonService;
