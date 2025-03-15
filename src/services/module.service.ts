import { Module } from '../models/module.model';
import { Course } from '../models/course.model';
import { Lesson } from '../models/lesson.model';
import { CreateModuleDto, UpdateModuleDto } from '../dtos/module.dto';
import { ApiResponse } from '../types/type';
import { ModuleAttributes, ModuleCreationAttributes } from '../types/module.type';

class ModuleService {
  async createModule(moduleData: CreateModuleDto): Promise<ApiResponse<ModuleAttributes>> {
    try {
      const course = await Course.findByPk(moduleData.courseId);
      if (!course) {
        throw new Error('Course not found');
      }

      const module = await Module.create({
        title: moduleData.title,
        description: moduleData.description,
        courseId: moduleData.courseId,
        dateAdded: new Date(),
        resourceUrl: moduleData.resourceUrl || 'https://resourceurl.com'
      });
      
      return {
        statusCode: 201,
        status: 'success',
        message: 'Module created successfully',
        data: module.toJSON()
      };
    } catch (error) {
      throw error;
    }
  }

  async getAllModules(
    page: number = 1,
    limit: number = 10,
    course_id?: string
  ): Promise<ApiResponse<{ modules: Module[]; total: number; pages: number }>> {
    try {
      const offset = (page - 1) * limit;
      const where = course_id ? { course_id } : {};

      const { count, rows } = await Module.findAndCountAll({
        where,
        include: [{
          model: Lesson,
          attributes: ['id', 'title']
        }],
        limit,
        offset,
        order: [['createdAt', 'DESC']]
      });

      return {
        statusCode: 200,
        status: 'success',
        message: 'Modules retrieved successfully',
        data: {
          modules: rows,
          total: count,
          pages: Math.ceil(count / limit)
        }
      };
    } catch (error) {
      throw error;
    }
  }

  async getModuleById(id: string): Promise<ApiResponse<Module | null>> {
    try {
      const module = await Module.findByPk(id, {
        include: [{
          model: Lesson,
          attributes: ['id', 'title', 'content']
        }]
      });

      if (!module) {
        return {
          statusCode: 404,
          status: 'error',
          message: 'Module not found',
          data: null
        };
      }

      return {
        statusCode: 200,
        status: 'success',
        message: 'Module retrieved successfully',
        data: module
      };
    } catch (error) {
      throw error;
    }
  }

  async updateModule(id: string, updateData: UpdateModuleDto): Promise<ApiResponse<Module | null>> {
    try {
      const module = await Module.findByPk(id);
      
      if (!module) {
        return {
          statusCode: 404,
          status: 'error',
          message: 'Module not found',
          data: null
        };
      }

      await module.update(updateData);

      return {
        statusCode: 200,
        status: 'success',
        message: 'Module updated successfully',
        data: module
      };
    } catch (error) {
      throw error;
    }
  }

  async deleteModule(id: string): Promise<ApiResponse<null>> {
    try {
      const module = await Module.findByPk(id);
      
      if (!module) {
        return {
          statusCode: 404,
          status: 'error',
          message: 'Module not found',
          data: null
        };
      }

      await module.destroy();

      return {
        statusCode: 200,
        status: 'success',
        message: 'Module deleted successfully',
        data: null
      };
    } catch (error) {
      throw error;
    }
  }
}

export const moduleService = new ModuleService();