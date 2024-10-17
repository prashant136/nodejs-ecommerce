// message, status code, error codes
export class HttpExecption extends Error {
    message: string;
    errorCode: any;
    statusCode: number;
    errors: any;

    constructor(message: string, errorCode: ErrorCodes, statusCode: number, error: any) {
        super(message);
        this.message = message
        this.errorCode = errorCode
        this.statusCode = statusCode
        this.errors = error
    }
}

export enum ErrorCodes {
    USER_NOT_FOUND = 1000,
    USER_ALREADY_EXITS = 1002,
    INCORRECT_PASSWORD = 1003,
    UNPROCESSABLE_ENTITY = 2001,
    INTERNAL_EXCEPTION = 3001,
    UNAUTHORIZED = 4001
}