
import { Router } from "express";
import * as profileContoller from "../../../controllers/profile.controller";
import { authentication } from "../../../middlewares/authentication";
import upload from "../../../middlewares/upload.middleware";

const profileRouter = Router();

profileRouter.put('/update', authentication, upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'background', maxCount: 1 }]), profileContoller.updateProfile);

export default profileRouter;