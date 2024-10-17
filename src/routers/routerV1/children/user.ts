
import { Router } from "express";
import { authentication } from "../../../middlewares/authentication";
import * as userContoller from "../../../controllers/user.controller";

const userRouter = Router();

userRouter.get('/find/:username', authentication, userContoller.findUserByUsername);
userRouter.get('/search', authentication, userContoller.searchUser);

export default userRouter;