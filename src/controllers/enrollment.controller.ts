import { Request, Response } from 'express';
import { enrollmentService } from '../services/enrollment.service';
import { CreateEnrollmentDto, UpdateEnrollmentDto } from '../dtos/enrollment.dto';
import { abort } from 'process';
import { createEnrollmentSchema } from '../utils/validator';

export class EnrollmentController {
  async createEnrollment(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }
      const id  = req.user.id;
      const userEmail = req.user.email;
      const enrollmentCreationData = await createEnrollmentSchema.validate(req.body);
      // if (enrollment.error) {
      //   res.status(400).json({ error: enrollment.error });
      //   return;
      // }
      const enrollmentData: CreateEnrollmentDto = {
        ...enrollmentCreationData,
        userId: id,
        userEmail: userEmail
      };
      const enrollment = await enrollmentService.createEnrollment(enrollmentData);
      
      res.status(201).json({
        enrollment
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      res.status(400).json({ error: errorMessage });
    }
  }

  async updateEnrollment(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }
      const id  = req.user.id;
      const userEmail = req.user.email;
      const enrollmentData: UpdateEnrollmentDto = { userEmail, ...req.body};
      
      const enrollment = await enrollmentService.updateEnrollment((id), enrollmentData);
      
      res.status(200).json({
        message: 'Enrollment updated successfully',
        enrollment
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      res.status(400).json({ error: errorMessage });
    }
  }

  async getAllEnrollments(req: Request, res: Response): Promise<void> {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const status = req.query.status as 'draft' | 'published' | 'archived' | undefined;
      
      const result = await enrollmentService.findAllEnrollments(page, limit, status);
      
      res.status(200).json(result);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      res.status(500).json({ error: errorMessage });
    }
  }

  async getOneEnrollment(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const enrollment = await enrollmentService.findOneEnrollment((id));
      
      if (!enrollment) {
        res.status(404).json({ error: 'Enrollment not found' });
        return;
      }
      
      res.status(200).json(enrollment);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      res.status(500).json({ error: errorMessage });
    }
  }

  async deleteEnrollment(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      
      await enrollmentService.deleteEnrollment((id));
      
      res.status(200).json({
        message: 'Enrollment deleted successfully'
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      res.status(400).json({ error: errorMessage });
    }
  }

  // async searchEnrollments(req: Request, res: Response): Promise<void> {
  //   try {
  //     const { query } = req.query;
  //     const page = Number(req.query.page) || 1;
  //     const limit = Number(req.query.limit) || 10;
      
  //     if (!query) {
  //       res.status(400).json({ error: 'Search query is required' });
  //       return;
  //     }
      
  //     const result = await enrollmentService.searchEnrollments(
  //       query as string, 
  //       page, 
  //       limit
  //     );
      
  //     res.status(200).json(result);
  //   } catch (error) {
  //     const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
  //     res.status(500).json({ error: errorMessage });
  //   }
  // }
}

export const enrollmentController = new EnrollmentController();
