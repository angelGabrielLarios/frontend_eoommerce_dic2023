import { IExceptionNestJs } from "..";



export class ExceptionNestjs extends Error {
    message: string;
    error: string;
    statusCode: number;

    constructor({ message, error, statusCode }: IExceptionNestJs) {
        super(message);
        this.message = message;
        this.error = error;
        this.statusCode = statusCode;
    }
}
