import { NextFunction, Request, Response } from "express";
import { prismaClient } from "..";
import { compareSync, hashSync } from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { BadRequestException } from "../exceptions/bad-requests";
import { ErrorCodes } from "../exceptions/root";
import { UnprocessableEntity } from "../exceptions/validations";
import { SignupSchema } from "../schema/users";
import { NotFoundException } from "../exceptions/not-found";

export const login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    let user = await prismaClient.user.findFirst({ where: { email } });
    if (!user) {
        throw new NotFoundException('user doesnot exist', ErrorCodes.USER_NOT_FOUND);
    }
    if (!compareSync(password, user.password)) {
        throw new BadRequestException("Icorrect password", ErrorCodes.INCORRECT_PASSWORD);
    }
    const token = jwt.sign({
        userId: user.id
    }, JWT_SECRET!)

    res.json({ user, token })
}

export const signup = async (req: Request, res: Response, next: NextFunction) => {
    SignupSchema.parse(req.body);
    const { email, password, name } = req.body;

    let user = await prismaClient.user.findFirst({ where: { email } });
    if (user) {
        new BadRequestException('User already exists!', ErrorCodes.USER_ALREADY_EXITS);
    }
    user = await prismaClient.user.create({
        data: {
            name, email, password: hashSync(password, 10)
        }
    })
    res.json(user)
}

// me -> return the logged-in user
// export const me = async (req: Request, res: Response) => {
//     res.json(req.user)
// }