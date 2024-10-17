import { ErrorCodes, HttpExecption } from "./root";

export class UnauthorizedException extends HttpExecption {
    constructor(message: string, errorCode: ErrorCodes) {
        super(message, errorCode, 401, null);
    }
}