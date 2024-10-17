import { Request, Response } from "express";
import { CustomRequest } from "../libs/request";
import * as userService from "../services/user.service";

export async function findUserByUsername(req: CustomRequest, res: Response) {
    try {
        const username = req.params.username;
        const user = await userService.findUserByUsername(username);
        res.json(user);
    } catch (error) {
        console.log(error)
        const err = error as Error
        res.status(500).json({
            message: err.message
        })
    }
}

export async function searchUser(req: Request, res: Response) {
    try {
        const search = req.query.q as string
        const users = await userService.searchUser(search);
        res.json(users);
    } catch (error) {
        console.log(error)
        const err = error as Error
        res.status(500).json({
            message: err.message
        })
    }
}