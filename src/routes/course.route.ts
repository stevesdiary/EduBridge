import { Router, Request as ExpressRequest, Response } from "express";

import { checkRole } from "../middlewares/authorisation";
import  courseController from "../controllers/course.controller";
import authentication from '../middlewares/authentication';
// import cloudinary from '../config/cloudinary';

const courseRouter = Router();

courseRouter.post('/create', 
  // authentication, 
  // checkRole(['professional', 'admin']), 
  async (req: ExpressRequest, res: Response) => {
  await courseController.createCourse(req, res);
})

// courseRouter.post('/upload', async (req: ExpressRequest, res: Response) => {
//   await cloudinary.upload(req, res);
// })

courseRouter.get('/all', 
  // authentication, 
  // checkRole(['user', 'admin']), 
  async (req: ExpressRequest, res: Response) => {
  await courseController.getAllCourses(req, res);
})

courseRouter.get('/one/:id', authentication, checkRole(['user', 'admin']), async (req: ExpressRequest, res: Response) => {
  await courseController.getOneCourse(req, res);
})

courseRouter.put('/update/:id', authentication, checkRole(['professional', 'admin']), async (req: ExpressRequest, res: Response) => {
  await courseController.updateCourse(req, res);
})

courseRouter.delete('/delete', authentication, checkRole(['admin']), async (req: ExpressRequest, res: Response) => {
  await courseController.deleteCourseRecord(req, res);
})

export default courseRouter;