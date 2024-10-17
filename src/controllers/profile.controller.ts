import { Response } from "express"
import { CustomRequest } from "../libs/request"
import * as profileService from "../services/profile.service"
import { UpdateProfileDTO } from "../dto/profile.dto";
import { log } from "node:console";


export async function updateProfile(req: CustomRequest, res: Response) {
    try {
        const id = req.user.id;
        const body: UpdateProfileDTO = req.body;
        
        if (req.files) {
            const files = req.files as { [key: string]: Express.Multer.File[] };
            Object.keys(files).map((key) => {
                body[key] = files[key]
            })
        }
        const profile = await profileService.updateProfile(body, id)
        res.json({
            message: 'Profile updated',
            profile
        })
    } catch (error) {
        console.log(error)
        const err = error as Error
        res.status(500).json({
            message: err.message
        })
    }
}