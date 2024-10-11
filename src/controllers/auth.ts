import { NextFunction, Request, Response } from "express";
import { prismaClient } from "..";
import { compareSync, hashSync } from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { BadRequestException } from "../exceptions/bad-requests";
import { ErrorCodes } from "../exceptions/root";

export const login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    let user = await prismaClient.user.findFirst({ where: { email } });
    if (!user) {
        throw Error('user doesnot exist');
    }
    if (!compareSync(password, user.password)) {
        throw Error("Icorrect password");
    }
    const token = jwt.sign({
        userId: user.id
    }, JWT_SECRET!)

    res.json({ user, token })
}

export const signup = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, name } = req.body;

    let user = await prismaClient.user.findFirst({ where: { email } });
    if (user) {
        next(new BadRequestException('User already exists!', ErrorCodes.USER_ALREADY_EXITS));
    }
    user = await prismaClient.user.create({
        data: {
            name, email, password: hashSync(password, 10)
        }
    })
    res.json(user)
}