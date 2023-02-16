import {
    UserRoleService
} from '../../database/repository.services/user/user.role.service';
import {
    ErrorHandler
} from '../../common/error.handler';
import {
    Helper
} from '../../common/helper';
import {
    ApiError
} from '../../common/api.error';
import {
    UserRoleValidator as validator
} from './user.role.validator';
import {
    uuid
} from '../../domain.types/miscellaneous/system.types';
import {
    UserRoleCreateModel,
    UserRoleUpdateModel,
    UserRoleSearchFilters,
    UserRoleSearchResults
} from '../../domain.types/user/user.role.domain.types';

///////////////////////////////////////////////////////////////////////////////////////

export class UserRoleControllerDelegate {

    //#region member variables and constructors

    _service: UserRoleService = null;

    constructor() {
        this._service = new UserRoleService();
    }

    //#endregion

    create = async (requestBody: any) => {
        await validator.validateCreateRequest(requestBody);
        var createModel: UserRoleCreateModel = this.getCreateModel(requestBody);
        const record = await this._service.create(createModel);
        if (record === null) {
            throw new ApiError('Unable to create user role!', 400);
        }
        return this.getEnrichedDto(record);
    };

    getById = async (id: uuid) => {
        const record = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('User role with id ' + id.toString() + ' cannot be found!');
        }
        return this.getEnrichedDto(record);
    };

    search = async (query: any) => {
        await validator.validateSearchRequest(query);
        var filters: UserRoleSearchFilters = this.getSearchFilters(query);
        var searchResults: UserRoleSearchResults = await this._service.search(filters);
        var items = searchResults.Items.map(x => this.getSearchDto(x));
        searchResults.Items = items;
        return searchResults;
    };

    update = async (id: uuid, requestBody: any) => {
        await validator.validateUpdateRequest(requestBody);
        const record = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('User role with id ' + id.toString() + ' cannot be found!');
        }
        const updateModel: UserRoleUpdateModel = this.getUpdateModel(requestBody);
        const updated = await this._service.update(id, updateModel);
        if (updated == null) {
            throw new ApiError('Unable to update user role!', 400);
        }
        return this.getEnrichedDto(updated);
    };

    delete = async (id: uuid) => {
        const record = await this._service.getById(id);
        if (record == null) {
            ErrorHandler.throwNotFoundError('User role with id ' + id.toString() + ' cannot be found!');
        }
        const userRoleDeleted: boolean = await this._service.delete(id);
        return {
            Deleted : userRoleDeleted
        };
    };

    ///////////////////////////////////////////////////////////////////////////////////////////////

    //#region Privates

    getSearchFilters = (query) => {

        var filters = {};

        var userId = query.userId ? query.userId : null;
        if (userId != null) {
            filters['UserId'] = userId;
        }
        var roleId = query.roleId ? query.roleId : null;
        if (roleId != null) {
            filters['RoleId'] = roleId;
        }

        return filters;
    };

    getUpdateModel = (requestBody): UserRoleUpdateModel => {

        const updateModel: UserRoleUpdateModel = {};

        if (Helper.hasProperty(requestBody, 'UserId')) {
            updateModel.UserId = requestBody.UserId;
        }
        if (Helper.hasProperty(requestBody, 'RoleId')) {
            updateModel.RoleId = requestBody.RoleId;
        }

        return updateModel;
    };

    getCreateModel = (requestBody): UserRoleCreateModel => {
        return {
            UserId : requestBody.UserId ? requestBody.UserId : null,
            RoleId : requestBody.RoleId ? requestBody.RoleId : null
        };
    };

    getEnrichedDto = (record) => {
        if (record == null) {
            return null;
        }
        return {
            id     : record.id,
            UserId : record.UserId,
            RoleId : record.RoleId
        };
    };

    getSearchDto = (record) => {
        if (record == null) {
            return null;
        }
        return {
            id     : record.id,
            UserId : record.UserId,
            RoleId : record.RoleId
        };
    };

    //#endregion

}
///////////////////////////////////////////////////////////////////////////////////////////////
