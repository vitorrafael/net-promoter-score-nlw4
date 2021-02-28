import AppError from "./AppError";

export default class ErrorHandler {
    static validate(condition: boolean, error: AppError)  {
        if (!condition) {
            throw error;
        }
    }
}