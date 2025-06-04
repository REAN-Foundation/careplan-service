import express from 'express';
import jwt from 'jsonwebtoken';
import { Logger } from '../../common/logger';
import { IAuthorizer } from '../authorizer.interface';
import { Injector } from '../../startup/injector';
import { PermissionHandler } from './permission.handler';
import { Loader } from '../../startup/loader';
import { RolePrivilegeService } from '../../database/repository.services/role.privilege.service';
import { ActionScope } from '../auth.types';
import { ConfigurationManager } from '../../config/configuration.manager';
import { CurrentUser } from '../../domain.types/miscellaneous/current.user';
import { IUserAuthorizer } from '../interfaces/user.authorizer.interface';

//////////////////////////////////////////////////////////////

export class CustomAuthorizer implements IUserAuthorizer {

    // _userService: UserService = null;

    _rolePrivilegeService: any = null;

    constructor() {
        // this._userService = Loader.Container.resolve(UserService);
        this._rolePrivilegeService = Loader.Container.resolve(RolePrivilegeService);
    }

    public authorize = async (request: express.Request): Promise<boolean> => {
        try {

            const context = request.context;
            if (context == null || context === 'undefined') {
                return false;
            }

            // Temp solution - Needs to be refined
            if (request.currentClient?.IsPrivileged) {
                return true;
            }

            const publicAccess = request.actionScope === ActionScope.Public;
            const optionalUserAuth = request.optionalUserAuth;

            const currentUser = request.currentUser ?? null;
            if (!currentUser) {
                //If the user is not authenticated, then check if the resource access is public
                if (publicAccess || optionalUserAuth) {
                    // To check whether a particular resource is available for public access, e.g. a profile image download
                    return true;
                }
                // If the resource is not public, then the user must be authenticated
                return false;
            }

            const hasPermission = await PermissionHandler.checkRoleBasedPermissions(request);
            return hasPermission;

        } catch (error) {
            Logger.instance().log(error.message);
        }
        return false;
    };

        public generateUserSessionToken = async (user: CurrentUser): Promise<string> => {
            return new Promise((resolve, reject) => {
                try {
                    const expiresIn: number = ConfigurationManager.JwtExpiresIn();
                    var seconds = expiresIn.toString() + 's';
                    const token = jwt.sign(user, process.env.USER_ACCESS_TOKEN_SECRET, { expiresIn: seconds });
                    resolve(token);
                } catch (error) {
                    reject(error);
                }
            });
        };

}
