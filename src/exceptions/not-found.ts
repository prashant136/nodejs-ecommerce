import { ErrorCodes, HttpExecption } from "./root";

export class NotFoundException extends HttpExecption {
    constructor(message: string, errorCode: ErrorCodes) {
        super(message, errorCode, 404, null);
    }
}