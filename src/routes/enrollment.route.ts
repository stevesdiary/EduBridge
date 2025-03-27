import { Router, Request as ExpressRequest, Response } from 'express';



import { enrollmentController } from "../controllers/enrollment.controller";
import { checkRole } from '../middlewares/authorisation';
import authentication from '../middlewares/authentication';

const enrollmentRouter = Router();

enrollmentRouter.post("/register", 
  authentication, 
  checkRole(['Teacher', 'Admin', 'Student']),
  async (req: ExpressRequest, res: Response) => {
  await enrollmentController.createEnrollment(req, res);
});

enrollmentRouter.get('/all', 
  // authentication, 
  // checkRole(['Teacher', 'Admin', 'Student']),
  async (req: ExpressRequest, res: Response) => {
  await enrollmentController.getAllEnrollments(req, res)
});

enrollmentRouter.get('/one/:id', 
  authentication, 
  checkRole(['Teacher', 'Admin', 'Student']),
  async (req: ExpressRequest, res: Response) => {
  await enrollmentController.getOneEnrollment(req, res);
});

enrollmentRouter.put('/enrollment/:id', 
  authentication,
  checkRole(['admin']),
  async (req: ExpressRequest, res: Response) => {
  await enrollmentController.updateEnrollment(req, res);
})

enrollmentRouter.delete('/remove/:id', 
  authentication,
  checkRole(['Admin']),
  async (req: ExpressRequest, res: Response) => {
  await enrollmentController.deleteEnrollment(req, res);
})

export default enrollmentRouter;
