
export class ApiError extends Error{

    Trace = null;

    Code = 500;
    
    constructor(message, errorCode, error = null) {
        super();
        this.message = message ?? 'An unexpected error has occurred. ';
        this.message = this.message + (error != null ? '> ' + error.message : '');
        this.Trace = error != null ? error.stack : '';
        this.Code = errorCode ?? 500;
    }

}
