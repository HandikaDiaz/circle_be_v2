import { Response } from "express";
import { CustomRequest } from "../libs/request";
import * as authService from "../services/auth.service";

export async function checkAuth(req: CustomRequest, res: Response) {
    try {
        const user = req.user;
        res.json(user);
    } catch (error) {
        console.log(error)
        const err = error as Error
        res.status(500).json({
            message: err.message
        })
    }
}

export async function register(req: CustomRequest, res: Response) {
    try {
        const registerDto = req.body
        const user = await authService.register(registerDto)
        res.json({
            user
        })
    } catch (error) {
        console.log(error)
        const err = error as Error
        res.status(500).json({
            message: err.message
        })
    }
}

export async function login(req: CustomRequest, res: Response) {
    try {
        const loginDto = req.body
        const user = await authService.login(loginDto)
        res.json({
            user
        })
    } catch (error) {
        console.log(error)
        const err = error as Error
        res.status(500).json({
            message: err.message
        })
    }
}

export async function forgotPassword(req: CustomRequest, res: Response) {
    try {
        const email = req.body.email
        await authService.forgotPassword(email)
        res.json({ message: 'Reset password link has been sent to your email' })
    } catch (error) {
        console.log(error)
        const err = error as Error
        res.status(500).json({
            message: err.message
        })
    }
}

export async function resetPassword(req: CustomRequest, res: Response) {
    try {
        const token = req.params.token
        const password = req.body.password
        await authService.resetPassword(token, password)
        res.json({ message: 'Password reset successful' })
    } catch (error) {
        console.log(error)
        const err = error as Error
        res.status(500).json({
            message: err.message
        })
    }
}