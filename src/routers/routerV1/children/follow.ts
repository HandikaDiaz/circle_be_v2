
import { Router } from "express";
import { authentication } from "../../../middlewares/authentication";
import * as followContoller from "../../../controllers/follow.controller";

const followRouter = Router();

followRouter.get('/:followingId', authentication, followContoller.checkFollow);
followRouter.post('/', authentication, followContoller.createFollow);

export default followRouter;