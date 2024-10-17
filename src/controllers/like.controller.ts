import { Response } from "express";
import { CustomRequest } from "../libs/request";
import * as likeService from "../services/like.service";

export async function createLike(req: CustomRequest, res: Response) {
    try {
        const userId = req.user.id;
        const threadId = +req.params.threadId;
        const like = await likeService.createLike(userId, threadId)
        res.json({ message: like })
    } catch (error) {
        console.log(error)
        const err = error as Error
        res.status(500).json({
            message: err.message
        })
    }
}

export async function checkLike(req: CustomRequest, res: Response) {
    try {
        const userId = req.user.id;
        const threadId = +req.params.threadId;
        const like = await likeService.checkLike(userId, threadId)
        res.json({ isLike: !!like })
    } catch (error) {
        console.log(error)
        const err = error as Error
        res.status(500).json({
            message: err.message
        })
    }
}