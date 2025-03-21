import { Router, Request as ExpressRequest, Response } from 'express';
import forgotPassword from '../controllers/forgot.password';
import { ResetPasswordData } from '../types/type';

const forgotPasswordRouter = Router();

forgotPasswordRouter.put("/reset", 
  async (req: ResetPasswordData, res: Response) => {
  await forgotPassword.resetPassword(req, res);
});

export default forgotPasswordRouter;