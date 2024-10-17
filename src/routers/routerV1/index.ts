import { Router } from "express";
import authRouter from "./children/auth";
import threadRouter from "./children/thread";
import profileRouter from "./children/profile";
import userRouter from "./children/user";
import likeRouter from "./children/like";
import followRouter from "./children/follow";

const routerV1 = Router();

routerV1.use('/auth', authRouter);
routerV1.use('/thread', threadRouter);
routerV1.use('/profile', profileRouter);
routerV1.use('/user', userRouter);
routerV1.use('/like', likeRouter);
routerV1.use('/follow', followRouter);

export default routerV1;