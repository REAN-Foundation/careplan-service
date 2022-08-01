import { ApiError } from './api.error';
import { Logger } from './logger';

////////////////////////////////////////////////////////////////////////

export class ErrorHandler {

    static throwInputValidationError = (errorMessages) => {
        var message = 'Validation error has occurred!\n';
        if (errorMessages) {
            message = message + ' ' + Array.isArray(errorMessages) ? errorMessages.join(' ') : errorMessages.toString();
            message = message.split('"').join('');
        }
        throw new ApiError(message, 422);
    }

    static throwDuplicateUserError = (message) => {
        throw new ApiError(message, 422);
    }

    static throwNotFoundError = (message) => {
        throw new ApiError(message, 404);
    }

    static throwUnauthorizedUserError = (message) => {
        throw new ApiError(message, 401);
    }

    static throwForebiddenAccessError = (message) => {
        throw new ApiError(message, 403);
    }

    static throwDbAccessError = (message, error) => {
        throw new ApiError(message, 503, error);
    }

    static throwConflictError = (message) => {
        throw new ApiError(message, 409);
    }

    static throwFailedPreconditionError = (message) => {
        throw new ApiError(message, 412);
    }

    static throwInternalServerError = (message, error = null) => {
        throw new ApiError(message, 500, error);
    }

    static handleValidationError = (error) => {
        if (error.isJoi === true) {
            Logger.instance().log(error.message);
            const errorMessages = error.details.map(x => x.message);
            ErrorHandler.throwInputValidationError(errorMessages);
        }
        else {
            ErrorHandler.throwInputValidationError(error.message);
        }
    }

}
