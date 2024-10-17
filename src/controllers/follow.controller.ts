import { Response } from "express";
import { CustomRequest } from "../libs/request";
import * as followService from "../services/follow.service";

export async function createFollow(req: CustomRequest, res: Response) {
    try {
        const followerId = req.user.id;
        const followingId = req.body.followingId;
        const follow = await followService.createFollow(followerId, followingId);
        res.json({ message: follow });
    } catch (error) {
        console.log(error)
        const err = error as Error
        res.status(500).json({
            message: err.message
        })
    }
}

export async function checkFollow(req: CustomRequest, res: Response) {
    try {
        const followerId = req.user.id;
        const followingId = req.params.followingId;
        const follow = await followService.checkFollow(+followingId, followerId);
        res.json({ message: follow });
    } catch (error) {
        console.log(error)
        const err = error as Error
        res.status(500).json({
            message: err.message
        })
    }
}