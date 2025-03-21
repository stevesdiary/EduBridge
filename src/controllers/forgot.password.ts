import { sendEmail } from '../services/email.service';
import { Request, Response } from 'express';
import { resetPassword } from '../services/password.reset.service';
import { passwordResetSchema } from '../utils/validator';
import { ValidationErrorResponse } from '../types/type';
import * as yup from 'yup';


const forgotPassword = {
  resetPassword: async (req: Request, res: Response) => {
    try {
      const validatedData = await passwordResetSchema.validate(req.body, { 
        abortEarly: false 
      });
      
      const { confirm_password, ...userData } = validatedData;
      const user = await resetPassword(userData);
      
      return res.status(user.statusCode).send({
        status: user.status,
        message: user.message,
        data: user.data
      });
    } catch (error: unknown) {
      if (error instanceof yup.ValidationError) {
        console.log('ERROR DUE TO VALIDATION', error)
        const validationError = error as yup.ValidationError;
        const errors: ValidationErrorResponse[] = validationError.inner.map(err => ({
          field: err.path || 'unknown',
          message: err.message
        }));
        
        return res.status(400).json({
          status: 'error',
          message: 'Validation failed',
          errors
        });
      }
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      return res.status(500).json({
        status: 'error',
        message: 'Internal server error',
        error: errorMessage
      });
    }
  } 
}

export default forgotPassword;