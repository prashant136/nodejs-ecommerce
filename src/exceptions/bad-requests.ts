import { ErrorCodes, HttpExecption } from "./root";

export class BadRequestException extends HttpExecption {
    constructor(message: string, errorCode: ErrorCodes) {
        super(message, errorCode, 400, null);
    }
}