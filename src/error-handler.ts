import { Request, Response, NextFunction } from "express";
import { ErrorCodes, HttpExecption } from "./exceptions/root";
import { InternalException } from "./exceptions/internal-exception";

export const errorHandler = (method: Function) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await method(req, res, next);
        } catch (error) {
            let exception: HttpExecption;
            if (error instanceof HttpExecption) {
                exception = error;
            } else {
                exception = new InternalException('Something went wrong!', error, ErrorCodes.INTERNAL_EXCEPTION);
            }
            next(exception);
        }
    }
}