import { Request, Response } from 'express';
import { moduleService } from '../services/module.service';
import { CreateModuleDto, UpdateModuleDto } from '../dtos/module.dto';
import { ApiResponse } from '../types/type';

export class ModuleController {
  async createModule(req: Request, res: Response): Promise<void> {
    try {
      const moduleData: CreateModuleDto = req.body;
      const result = await moduleService.createModule(moduleData);
      
      res.status(201).json({
        status: 'success',
        message: 'Module created successfully',
        data: result
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      res.status(400).json({ 
        status: 'error',
        message: errorMessage 
      });
    }
  }

  async getAllModules(req: Request, res: Response): Promise<void> {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const course_id = req.query.course_id as string;
      
      const result = await moduleService.getAllModules(page, limit, course_id);
      
      res.status(200).json(result);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      res.status(500).json({ 
        status: 'error',
        message: errorMessage 
      });
    }
  }

  async getModuleById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const module = await moduleService.getModuleById(id);
      
      if (!module) {
        res.status(404).json({ 
          status: 'error',
          message: 'Module not found' 
        });
        return;
      }
      
      res.status(200).json({
        status: 'success',
        data: module
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      res.status(500).json({ 
        status: 'error',
        message: errorMessage 
      });
    }
  }

  async updateModule(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updateData: UpdateModuleDto = req.body;
      
      const updatedModule = await moduleService.updateModule(id, updateData);
      
      if (!updatedModule) {
        res.status(404).json({ 
          status: 'error',
          message: 'Module not found' 
        });
        return;
      }
      
      res.status(200).json({
        status: 'success',
        message: 'Module updated successfully',
        data: updatedModule
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      res.status(400).json({ 
        status: 'error',
        message: errorMessage 
      });
    }
  }

  async deleteModule(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await moduleService.deleteModule(id);
      
      res.status(200).json({
        status: 'success',
        message: 'Module deleted successfully'
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      res.status(500).json({ 
        status: 'error',
        message: errorMessage 
      });
    }
  }
}

export const moduleController = new ModuleController();