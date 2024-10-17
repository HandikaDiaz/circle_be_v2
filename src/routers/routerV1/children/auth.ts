import { Router } from "express";
import * as authContoller from "../../../controllers/auth.contoller";

const authRouter = Router();

authRouter.get('/check', authContoller.checkAuth);
authRouter.post('/register', authContoller.register);
authRouter.post('/login', authContoller.login);

authRouter.post('/forgot-password', authContoller.forgotPassword);
authRouter.get('/reset-password/:token', authContoller.resetPassword);
authRouter.post('/reset-password/:token', authContoller.resetPassword);


export default authRouter;