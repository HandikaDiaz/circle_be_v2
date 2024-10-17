import { Router } from "express";
import * as threadContoller from "../../../controllers/thread.controller";
import { authentication } from "../../../middlewares/authentication";
import upload from "../../../middlewares/upload.middleware";

const threadRouter = Router();

threadRouter.get('/:id', threadContoller.findThreadById);
threadRouter.post('/create', authentication, upload.array('images', 4), threadContoller.createThread);


export default threadRouter;