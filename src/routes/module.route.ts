import { Router, Request as ExpressRequest, Response } from "express";

import { checkRole } from "../middlewares/authorisation";
import authentication from "../middlewares/authentication";
import moduleController from '../controllers/module.controller';
const moduleRouter = Router()

moduleRouter.post('/register',
  // authentication,
  // checkRole(['admin']), 
  async (req: ExpressRequest, res: Response) => {
  await moduleController.createModule(req, res);
});

moduleRouter.get('/all', 
  // authentication,
  // checkRole(['admin']),
  async (req: ExpressRequest, res: Response) => {
  await moduleController.getAllModules(req, res);
})
moduleRouter.get('/one/:id',
  // authentication,
  // checkRole(['admin']), 
  async (req: ExpressRequest, res: Response) => {
  await moduleController.getModuleById(req, res);
})
moduleRouter.put('/update/:id', 
  authentication,
  checkRole(['admin']),
  async (req: ExpressRequest, res: Response) => {
  await moduleController.updateModule(req, res);
})
moduleRouter.delete('/delete/:id', 
  authentication,
  checkRole(['admin']),
  async (req: ExpressRequest, res: Response) => {
  await moduleController.deleteModule(req, res);
})



export default moduleRouter;