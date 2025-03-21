import { customAlphabet } from "nanoid";
import bcrypt from "bcrypt";
import {Op} from 'sequelize'

import { getFromRedis, saveToRedis } from "../core/redis";
import { CreationAttributes } from "sequelize";
import { User } from "../models/user.model";
import sendEmail from "./email.service";
import { emailSchema } from "../utils/validator";
import { UserData } from '../types/type';


const salt = process.env.BCRYPT_SALT || 10;

export const resetPassword = async (userData: CreationAttributes<User>) => {
  try {
    const emailExists = await User.findOne({
      where: {
        email: userData.email,
      },
    });
    if (!emailExists) {
      return {
        statusCode: 400,
        status: 'fail',
        message: `${userData.email} is not registered or not found`,
        data: null
      };
    }
    
      const hashed = await bcrypt.hash(userData.password, salt);
      let passwordResetData = {
        email: userData.email,
        password: hashed
      }
    
    // const { password: _, ...userpasswordData } = passwordResetData;
    const user = await User.update(
      { password: hashed },
      { where: { email: userData.email }}
    );

    if (user && user[0] === 1) {
      const emailPayload = {
        to: userData.email as string,
        subject: "Password Reset",
        text: `Your password has been reset successfully. If you did not perform this action, kindly reach out to the support team`,
      };
      await sendEmail(emailPayload);
    }

    return {
      statusCode: 200,
      status: "success",
      message: "Youe password has been reset successfully, log in with your new password",
      data: 'Password reset completed',
    };
  } catch (error) {
    console.log('ERROR', error);
    throw error;
  }
};

export default resetPassword;