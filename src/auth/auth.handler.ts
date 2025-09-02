import { Request, Response, NextFunction } from 'express';
import { Injector } from '../startup/injector';
// import { uuid } from '../domain.types/miscellaneous/system.types';
import { AuthOptions, RequestType, ResourceOwnership, ActionScope } from './auth.types';
import { ResponseHandler } from '../common/response.handler';
import { Loader } from '../startup/loader';
import { ErrorHandler } from '../common/error.handler';
import { UserAuthorizer } from './wrappers/user.authorizer';
import { UserAuthenticator } from './wrappers/user.authenticator';

////////////////////////////////////////////////////////////////////////////////////////////////
export type AuthMiddleware =
    (request: Request, response: Response, next: NextFunction)
    => Promise<void>;
////////////////////////////////////////////////////////////////////////////////////////////////

export class AuthHandler {

    public static handle = (options: AuthOptions): AuthMiddleware[] => {

        var middlewares: AuthMiddleware[] = [];

        //Set context
        var contextSetter = async (request: Request, response: Response, next: NextFunction) => {
            request.context = options.Context;
            const tokens = options.Context.split('.');
            if (tokens.length < 2) {
                ResponseHandler.failure(request, response, 'Invalid request context', 400);
                return;
            }
            const resourceIdIdentifier = options.ResourceIdName ? options.ResourceIdName.toString() : null;
            request.requestType = options.RequestType;
            request.resourceId = this.getResourceId(request, resourceIdIdentifier);
            request.ownership = options.Ownership;
            request.actionScope = options.ActionScope;
            request.clientAppAuth = options.ClientAppAuth ?? false;
            request.customAuthorization = options.CustomAuthorization ? options.CustomAuthorization : false;
            request.alternateAuth = options.AlternateAuth ? options.AlternateAuth : false;
            request.signupOrSignin = options.SignupOrSignin ? options.SignupOrSignin : false;
            request.optionalUserAuth = options.OptionalUserAuth ? options.OptionalUserAuth : false;
            next();
        };
        middlewares.push(contextSetter);

        //Line-up the auth middleware chain
        // const clientAppAuth = options.ClientAppAuth ?? false;
        const systemOwnedResource = options.Ownership === ResourceOwnership.System;
        const publicAccess = options.ActionScope === ActionScope.Public;

        // Client app authentication could be turned off for certain endpoints. e.g. public file downloads, etc.
        // if (clientAppAuth === true) {
        //     middlewares.push(ClientAppAuthMiddleware.authenticateClient);
        // }
        // else {
        // If client app authentication is turned off and the alternate authentication is in place.
        // For example, get or renew API key, etc.
        const alternateAuth = options.AlternateAuth ?? false;
        if (alternateAuth) {
            return middlewares;
    
        }

        // If the request is about the user registration. For example, Sign-up, Sign-in, OTP, ... etc.
        const signupOrSignin = options.SignupOrSignin ?? false;
        if (signupOrSignin) {
            return middlewares;
        }

        // Perform user authentication
        var userAuthenticator = Injector.Container.resolve(UserAuthenticator);
        middlewares.push(userAuthenticator.authenticate);

        // Open routes that do not require user authorization
        // For example, public resources, system resources, system types, etc.
        
        if (publicAccess && systemOwnedResource) {
            return middlewares;
        }

        var authorizer = Injector.Container.resolve(UserAuthorizer);
        middlewares.push(authorizer.authorize);

        return middlewares;
    };

    public static verifyAccess = async(request: Request): Promise<boolean> => {

        var userAuthenticator = Injector.Container.resolve(UserAuthenticator);
        const userVerified = await userAuthenticator.verify(request);
        if (userVerified === false){
            ErrorHandler.throwUnauthorizedUserError('Unauthorized user');
        }

        var userAuthorizer = Loader.Container.resolve(UserAuthorizer);
        const authorized = await userAuthorizer.verify(request);
        if (authorized === false){
            ErrorHandler.throwForebiddenAccessError('Forebidden access');
        }
        return true;
    };

    private static getResourceId = (request: Request, resourceIdName?: string): string | number | null | undefined => {
        var resourceId = null;
        if (resourceIdName &&
            request.params[resourceIdName] != null &&
            request.params[resourceIdName] !== 'undefined') {
            resourceId = request.params[resourceIdName];
            return resourceId;
        }
        else if (request.params.id != null && request.params.id !== 'undefined') {
            if (request.requestType === RequestType.GetOne ||
                request.requestType === RequestType.UpdateOne ||
                request.requestType === RequestType.DeleteOne) {
                resourceId = request.params.id;
                return resourceId;
            }
        }
        return resourceId;
    };

}

export const auth = AuthHandler.handle;
