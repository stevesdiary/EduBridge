import { deleteUser, getAllUsers, getOneUser, updateUser, updateUserRole } from '../services/user.service';
import { emailSchema, idSchema, userUpdateSchema } from '../utils/validator';
import { UserResponseData } from '../types/type';
import { Response, Request as ExpressRequest } from 'express';



const UserController = {
  getAllUsers: async (req: ExpressRequest, res: Response): Promise<Response> => {
    try {
      const users: UserResponseData = await getAllUsers();
      return res.status(users.statusCode).send({
        status: users.status,
        message: users.message,
        data: users.data
      });
    } catch (error) {
      const errorResponse: UserResponseData = {
        statusCode: 500,
        status: "error",
        message: "internal server error",
        data: null
      };

      return res.status(errorResponse.statusCode).json({
        status: errorResponse.status,
        message: errorResponse.message,
        data: errorResponse.data
      });
    }
    
  },

  getOneUser: async (req: ExpressRequest, res: Response): Promise<Response> => {
    try {
      const user = await getOneUser(req.params.id);
      return res.status(user.statusCode).send({ 
        status: (user.status), 
        message: (user.message), 
        data: (user.data)
      })
    } catch (error) {
      return res.status(500).send({
        error: error
      })
    }
  },

  updateUser: async (req: ExpressRequest, res: Response): Promise<Response> => {
    try {
      const id = await idSchema.validate(req.params.id);
      const validatedData = await userUpdateSchema.validate(req.body);
      const userValidatedData = {
        role: validatedData.role?.toLocaleLowerCase(), ...validatedData
      }
      console.log(userValidatedData);
      const update = await updateUser( id, userValidatedData);
      return res.status(update.statusCode).send({ 
        status: (update.status), 
        message: (update.message), 
        data: (update.data)
      })
    } catch (error) {
      return res.status(500).send({
        error: error
      });
    }
  },

  updateUserRole: async (req: ExpressRequest, res: Response): Promise<Response> => {
    try {
      const email = await emailSchema.validate(req.body.email);
      const validatedData = await userUpdateSchema.validate(req.body, req.params);
      const update = await updateUserRole(email, validatedData);
      return res.status(update.statusCode).send({ status: (update.status), message: (update.message), data: (update.data)})
    } catch (error) {
      return res.status(500).send({
        error: error
      });
    }
  },

  deleteUser: async (req: ExpressRequest, res: Response): Promise<Response> => {
    try {
      const payload = await idSchema.validate(req.params.id);

      const deleteUserById = await deleteUser(payload);
      return res.status(deleteUserById.statusCode).send({
        status: deleteUserById.status,
        message: deleteUserById.message,
        data: deleteUserById.data
      })
    } catch (error) {
      return res.status(500).send({
        error: error
      });
    }
  }
}

export default UserController;
