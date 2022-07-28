import express from 'express';
import { ResponseHandler } from '../../common/response.handler';
import { ErrorHandler } from '../../common/error.handler';
import { TypesControllerDelegate } from './types.controller.delegate';
import { BaseController } from '../base.controller';

///////////////////////////////////////////////////////////////////////////////////////

export class TypesController extends BaseController {

    //#region member variables and constructors

    _delegate: TypesControllerDelegate = null;

    constructor() {
        super();
        this._delegate = new TypesControllerDelegate();
    }

    //#endregion

    //#region Action methods

    getRoleTypes = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            await this.authorize('Types.GetRoleTypes', request, response, false);

            const types = await this._delegate.getRoleTypes();
            if (types === null || types.length === 0) {
                ErrorHandler.throwInternalServerError(`Unable to retrieve user role types!`);
            }

            var roles = types.map(x => {
                return {
                    id          : x.id,
                    RoleName    : x.RoleName,
                    Description : x.Description
                };
            });
            
            ResponseHandler.success(request, response, 'User role types retrieved successfully!', 200, {
                RoleTypes : roles,
            });

        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    // getPriorityTypes = async (request: express.Request, response: express.Response): Promise<void> => {
    //     try {
    //         await this.setContext('HealthPriority.GetPrioritiesTypes', request, response);

    //         const priorityTypes = await this._delegate.getPriorityTypes();
    //         if (priorityTypes.length === 0) {
    //             throw new ApiError('Cannot fetch priorities types!', 400);
    //         }

    //         ResponseHandler.success(request, response, 'Fetched priority types successfully!', 201, {
    //             PriorityTypes : priorityTypes,
    //         });

    //     } catch (error) {
    //         ResponseHandler.handleError(request, response, error);
    //     }
    // };

    //#endregion

}
