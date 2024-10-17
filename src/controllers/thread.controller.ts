import { Response } from "express";
import { CreateThreadDTO } from "../dto/thread.dto";
import uploader from "../libs/cloudinary";
import { CustomRequest } from "../libs/request";
import * as threadService from "../services/thread.service";

export async function createThread(req: CustomRequest, res: Response) {
    try {
        const body: CreateThreadDTO = req.body
        body.authorId = res.locals.user.id
        if(req.files) {
            body.images = await uploader(req.files as Express.Multer.File[])
        }
        const thread = await threadService.createThread(body)
        res.json(thread)
    } catch (error) {
        console.log(error)
        const err = error as Error
        res.status(500).json({
            message: err.message
        })
    }
}

export async function findThreadById(req: CustomRequest, res: Response) {
    try {
        const id = req.params.id
        const thread = await threadService.findThreadById(+id)
        res.json(thread)
    } catch (error) {
        console.log(error)
        const err = error as Error
        res.status(500).json({
            message: err.message
        })
    }
}