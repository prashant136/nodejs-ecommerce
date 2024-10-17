import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../exceptions/unauthorized";
import { ErrorCodes } from "../exceptions/root";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { prismaClient } from "..";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    // 1. extarct token form header
    const token = req.headers.authorization;
    // 2. if token is not present, throw an error of unauthorized
    if (!token) {
        next(new UnauthorizedException('Unauthorized', ErrorCodes.UNAUTHORIZED));
    }
    try {
        // 3. the token is present, verify that token and extract the payload
        const payload = jwt.verify(token!, JWT_SECRET) as { userId: number };;
        // 4. to get the user from the payload
        const user = await prismaClient.user.findFirst({ where: { id: payload.userId } });
        if (!user) {
            return next(new UnauthorizedException('Unauthorized', ErrorCodes.UNAUTHORIZED));
        }
        // 5. to attach the user to the current request obejct
        req.user = user
        next();
    } catch (error) {
        // Handle errors such as token verification failure
        next(new UnauthorizedException('Unauthorized', ErrorCodes.UNAUTHORIZED));
    }
}