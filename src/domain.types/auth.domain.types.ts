export interface AuthenticationResult {
    Result       : boolean;
    Message      : string;
    HttpErrorCode: number;
    ClientCode?  : string;
    UserId?      : string;
}
