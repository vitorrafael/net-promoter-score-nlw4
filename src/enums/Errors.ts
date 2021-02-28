import { STATUS_CODES } from "http";
import AppError from "../errors/AppError";

const statusCode = {
    BAD_REQUEST: 400,
    NOT_FOUND: 404
}

const Errors = {
    INVALID_VALUE: new AppError("Invalid values", statusCode.BAD_REQUEST),
    SURVEY_USER_DOES_NOT_EXIST: new AppError("The survey was not sent to this user", statusCode.NOT_FOUND),
    USER_DOES_NOT_EXIST: new AppError("The user does not exist", statusCode.BAD_REQUEST),
    SURVEY_DOES_NOT_EXIST: new AppError("The survey does not exist", statusCode.BAD_REQUEST),
    USER_ALREADY_EXIST: new AppError("User already exists", statusCode.BAD_REQUEST),
}

Object.freeze(Errors);

export default Errors;