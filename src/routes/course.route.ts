import { Router, Request as ExpressRequest, Response } from "express";

import { checkRole } from "../middlewares/authorisation";
import  courseController from "../controllers/course.controller";
import authentication from '../middlewares/authentication';

const courseRouter = Router();

courseRouter.post('/create', 
  authentication, 
  checkRole(['Teacher', 'Admin']), 
  async (req: ExpressRequest, res: Response) => {
  await courseController.createCourse(req, res);
})

courseRouter.get('/by-category', 
  // authentication, 
  // checkRole(['professional', 'admin', 'moderator', 'student']),
  async (req: ExpressRequest, res: Response) => {
  await courseController.getByCategories(req, res);
})

courseRouter.get('/by-subject', 
  // authentication, 
  // checkRole(['professional', 'admin', 'moderator', 'student']),
  async (req: ExpressRequest, res: Response) => {
  await courseController.getBySubject(req, res);
})

courseRouter.get('/all', 
  // authentication, 
  // checkRole(['professional', 'admin', 'moderator', 'student']), 
  async (req: ExpressRequest, res: Response) => {
  await courseController.getAllCourses(req, res);
})

courseRouter.get('/one/:id', 
  // authentication, 
  // checkRole(['professional', 'admin', 'moderator', 'student']), 
  async (req: ExpressRequest, res: Response) => {
  await courseController.getOneCourse(req, res);
})

courseRouter.get('/primary', 
  // authentication, 
  // checkRole(['professional', 'admin', 'moderator', 'student']), 
  async (req: ExpressRequest, res: Response) => {
    await courseController.primaryCourses(req, res);
  }
)

courseRouter.get('/secondary', 
  // authentication, 
  // checkRole(['professional', 'admin', 'moderator', 'student']), 
  async (req: ExpressRequest, res: Response) => {
    await courseController.secondaryCourses(req, res);
  }
)

courseRouter.get('/soft-skills', 
  // authentication, 
  // checkRole(['professional', 'admin', 'moderator', 'student']), 
  async (req: ExpressRequest, res: Response) => {
    await courseController.softSkills(req, res);
  }
)

courseRouter.get('/exam-prep',
  async (req: ExpressRequest, res: Response) => {
    await courseController.examPrep(req, res);
  }
)

courseRouter.put('/update/:id', 
  authentication, 
  checkRole(['Admin', 'Teacher']), 
  async (req: ExpressRequest, res: Response) => {
  await courseController.updateCourse(req, res);
})

courseRouter.delete('/delete', 
  authentication, 
  checkRole(['Admin']), 
  async (req: ExpressRequest, res: Response) => {
  await courseController.deleteCourseRecord(req, res);
})

export default courseRouter;