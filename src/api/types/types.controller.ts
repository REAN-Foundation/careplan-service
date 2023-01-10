import express from 'express';
import { ResponseHandler } from '../../common/response.handler';
import { ErrorHandler } from '../../common/error.handler';
import { BaseController } from '../base.controller';
import { RoleService } from '../../database/repository.services/role.service';
import { CareplanCategoryService } from '../../database/repository.services/careplan/careplan.category.service';
import { AssetTypeList, TimeSlotList } from '../../domain.types/assets/asset.types';

///////////////////////////////////////////////////////////////////////////////////////

export class TypesController extends BaseController {

    //#region member variables and constructors

    _roleService: RoleService = null;

    _careplanCategoryService: CareplanCategoryService = null;

    constructor() {
        super();
        this._roleService = new RoleService();
        this._careplanCategoryService = new CareplanCategoryService();
    }

    //#endregion

    //#region Action methods

    getRoleTypes = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            await this.authorize('Types.GetRoleTypes', request, response, false);

            const types = await this._roleService.getAllRoles();
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

    getCareplanCategories = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            await this.authorize('Types.GetCareplanCategories', request, response, false);
            const categories = await this._careplanCategoryService.getCareplanCategories();
            ResponseHandler.success(request, response, 'Careplan categories retrieved successfully!', 200, {
                CareplanCategories : categories,
            });

        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getAssetTypes = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            await this.authorize('Types.GetAssetTypes', request, response, false);
            const assetTypes = AssetTypeList;
            ResponseHandler.success(request, response, 'Asset types retrieved successfully!', 200, {
                AssetTypes : assetTypes,
            });

        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getSlotTypes = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            await this.authorize('Types.GetSlotTypes', request, response, false);
            const slotTypes = TimeSlotList;
            ResponseHandler.success(request, response, 'Slot types retrieved successfully!', 200, {
                SlotTypes : slotTypes,
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
