import { Router, Request as ExpressRequest, Response } from 'express';
import authentication from '../middlewares/authentication';
import { checkRole } from '../middlewares/authorisation';
import lessonController from '../controllers/lesson.controller';
import { upload } from '../middlewares/file.upload';

const lessonRouter = Router();

lessonRouter.post('/create', 
  // authentication, 
  // checkRole(['professional', 'admin']),
  upload.single('file'), 
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

// lessonRouter.put(
//   '/lessons/:lessonId/resource', 
//   upload.single('resource'), 
//   async (req: ExpressRequest, res: Response) => {
//   lessonController.updateLessonResource(req, res);
// });

export default lessonRouter;