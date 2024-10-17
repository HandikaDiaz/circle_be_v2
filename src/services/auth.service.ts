import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as userRepository from '../repositories/auth.repository';
import * as DTO from '../dto/auth.dto';
import * as profileRepository from '../repositories/profile.repository';
import { sendEmail } from './mail.service';

export const register = async (registerDto: DTO.RegisterDTO) => {
    const existUser = await userRepository.findUserByUsernameOrEmail(registerDto.email);
    if (existUser) {
        throw new Error('User already exists');
    }
    const salt = 10;
    const hashedPassword = await bcrypt.hash(registerDto.password, salt);
    const username = registerDto.email.split('@')[0];
    const createUser = await userRepository.createUser({
        ...registerDto,
        username: username,
        password: hashedPassword
    });
    const { password, ...userToSign } = createUser;
    const token = jwt.sign(
        userToSign, 
        process.env.JWT_SECRET as string,
        { expiresIn: '1d' }
    )

    return {
        message: 'Register successfully',
        token
    };
}

export const login = async (loginDto: DTO.LoginDTO) => {
    const existUser = await userRepository.findUserByUsernameOrEmail(loginDto.username);
    if (!existUser) {
        throw new Error('User not found');
    };

    const isValidPassword = await bcrypt.compare(loginDto.password, existUser.password);
    if (!isValidPassword) {
        throw new Error('Wrong password');
    };

    const token = jwt.sign(
        {
            id: existUser.id,
            email: existUser.email,
            username: existUser.username
        },
        process.env.JWT_SECRET as string,
        { expiresIn: '1d' }
    );

    return {
        message: 'Login successfully',
        token
    };
}

export const forgotPassword = async (email: string) => {
    const user = await userRepository.findUserByUsernameOrEmail(email);
    if (!user) {
        throw new Error('User not found');
    }
    
    const token = jwt.sign({
        email: user.email
    }, process.env.JWT_SECRET as string, { expiresIn: '1d' });

    await sendEmail(email, token);
    return 'Success'
}

export const resetPassword = async (token: string, password: string) => {
    const decode = jwt.verify(token, process.env.JWT_SECRET as string);
    if (!decode) {
        throw new Error('Invalid token');
    }

    const user = await userRepository.findUserByUsernameOrEmail((decode as any).email);
    if (!user) {
        throw new Error('User not found');
    }
    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);
    await profileRepository.updateProfile({
        password: hashedPassword
    }, user.id);
    return 'Success'
}