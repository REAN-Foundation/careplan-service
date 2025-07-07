import express from 'express';
// import { Authorizer } from '../auth/authorizer';
import { ApiError } from '../common/api.error';
// import { Loader } from '../startup/loader';
import { PermissionHandler } from '../auth/custom/permission.handler';
import { uuid } from '../domain.types/miscellaneous/system.types';
import { NeedleService } from '../common/needle.service';

///////////////////////////////////////////////////////////////////////////////////////

export class BaseController {

    public authorize = async (
        request: express.Request,
        resourceOwnerUserId?: uuid,
        resourceTenantId?: uuid): Promise<void> => {

        if (request.currentClient?.IsPrivileged) {
            return;
        }

        let ownerUserId = resourceOwnerUserId ?? null;
        let tenantId = resourceTenantId ?? null;

        if (ownerUserId) {
            const apiURL = `/users/validate/${ownerUserId}`;
            const result = await NeedleService.needleRequestForREAN("get", apiURL);
            const user = result.Data;
            // const userService = Loader.Container.resolve(UserService);
            // const user = await userService.getById(ownerUserId);
            if (user) {
                ownerUserId = user.id;
                tenantId = tenantId ?? user.TenantId;
            }
        }

        if (tenantId == null) {
            // If tenant is not provided, get the default tenant
            // const tenantService = Loader.Container.resolve(TenantService);
            const apiURL = `/tenants/search?code=default`;
            const result = await NeedleService.needleRequestForREAN("get", apiURL);
            const tenant = result.Data;
            // const tenant = await tenantService.getTenantWithCode('default');
            if (tenant) {
                tenantId = tenant.id;
            }
        }

        request.resourceOwnerUserId = ownerUserId;
        request.resourceTenantId = tenantId;

        const permitted = await PermissionHandler.checkFineGrained(request);
        if (!permitted) {
            throw new ApiError(403, 'Permission denied.');
        }
    };
   
    // _authorizer: Authorizer = null;

    // constructor() {
    //     this._authorizer = Loader.Authorizer;
    // }

    // authorize = async (
    //     context: string,
    //     request: express.Request,
    //     response: express.Response,
    //     authorize = true) => {

    //     if (context === undefined || context === null) {
    //         throw new ApiError('Invalid request context', 500);
    //     }
    //     const tokens = context.split('.');
    //     if (tokens.length < 2) {
    //         throw new ApiError('Invalid request context', 500);
    //     }
    //     const resourceType = tokens[0];
    //     request.context = context;
    //     // request.resourceType = resourceType;
    //     if (request.params.id !== undefined && request.params.id !== null) {
    //         request.resourceId = request.params.id;
    //     }
    //     if (authorize) {
    //         await Loader.Authorizer.authorize(request, response);
    //     }
    // };

}
