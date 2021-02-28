import AppError from "./AppError";

export default class ErrorHandler {
    static validate(condition: boolean, error: AppError) : void {
        if (!condition) {
            throw error;
        }
    }
}