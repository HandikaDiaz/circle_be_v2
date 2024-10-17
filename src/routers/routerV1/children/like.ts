
import { Router } from "express";
import { authentication } from "../../../middlewares/authentication";
import * as likeContoller from "../../../controllers/like.controller";

const likeRouter = Router();

likeRouter.get('/:threadId', authentication, likeContoller.checkLike);
likeRouter.post('/:threadId', authentication, likeContoller.createLike);

export default likeRouter;