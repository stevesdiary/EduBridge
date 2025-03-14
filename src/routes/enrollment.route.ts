import { Router, Request as ExpressRequest, Response } from 'express';



import { enrollmentController } from "../controllers/enrollment.controller";
import { checkRole } from '../middlewares/authorisation';

const enrollmentRouter = Router();

enrollmentRouter.get('/health', (req: ExpressRequest, res: Response) => {
  res.status(200).json({ message: "Healthy!"})
})

enrollmentRouter.post("/register", async (req: ExpressRequest, res: Response) => {
  await enrollmentController.createEnrollment(req, res);
});

enrollmentRouter.get('/all', async (req: ExpressRequest, res: Response) => {
  await enrollmentController.getAllEnrollments(req, res)
});

enrollmentRouter.get('/one/:id', async (req: ExpressRequest, res: Response) => {
  await enrollmentController.getOneEnrollment(req, res);
});

enrollmentRouter.put('/enrollment/:id', async (req: ExpressRequest, res: Response) => {
  await enrollmentController.updateEnrollment(req, res);
})

enrollmentRouter.delete('/remove/:id', async (req: ExpressRequest, res: Response) => {
  await enrollmentController.deleteEnrollment(req, res);
})

export default enrollmentRouter;