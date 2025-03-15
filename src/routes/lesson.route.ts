import { Router, Request as ExpressRequest, Response } from 'express';
import authentication from '../middlewares/authentication';
import { checkRole } from '../middlewares/authorisation';
import lessonController from '../controllers/lesson.controller';

const lessonRouter = Router();

lessonRouter.post('/create', 
  // authentication, 
  // checkRole(['professional', 'admin']), 
  async (req: ExpressRequest, res: Response) => {
    await lessonController.createLesson(req, res);
});

lessonRouter.get('/all', 
  // authentication, 
  // checkRole(['user', 'admin']), 
  async (req: ExpressRequest, res: Response) => {
    await lessonController.getAllLessons(req, res);
});

lessonRouter.get('/:id', 
  // authentication, 
  // checkRole(['user', 'admin']), 
  async (req: ExpressRequest, res: Response) => {
    await lessonController.getOneLesson(req, res);
});

// Export the router
export default lessonRouter;