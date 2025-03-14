import { ApiResponse } from '../types/type';
import { Lesson } from '../models/lesson.model';
import { CreateLessonDto, LessonCreationAttributes, LessonResponse } from '../types/lesson.types';

class LessonService {
  async createLesson(lessonData: CreateLessonDto): Promise<ApiResponse<LessonResponse>> {
    try {
      // Ensure an ID is generated if not provided
      const lessonToCreate: LessonCreationAttributes = {
        ...lessonData,
        id: lessonData.id,
        date_added: lessonData.date_added || new Date()
      };

      const lesson = await Lesson.create(lessonToCreate);
      
      return {
        statusCode: 201,
        status: 'success',
        message: 'Lesson created successfully',
        data: lesson.toJSON() as LessonResponse
      };
    } catch (error) {
      console.error('Error creating lesson:', error);
      throw error;
    }
  }

  async getAllLessons(page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const { count, rows } = await Lesson.findAndCountAll({
      limit,
      offset,
      include: ['course']
    });
    
    return {
      data: rows,
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    };
  }

  async getOneLesson(id: string) {
    try {
      const lesson = await Lesson.findByPk(id, {
        include: ['course']
      });
      
      if (!lesson) {
        throw new Error('Lesson not found');
      }
      
      return lesson;
    } catch (error) {
      throw error;
    }
  }
}

export const lessonService = new LessonService();