import {
    UserSelectedPriorityService
} from '../../../database/repository.services/user.responses/user.selected.priority.service';
import {
    ErrorHandler
} from '../../../common/error.handler';
import {
    Helper
} from '../../../common/helper';
import {
    ApiError
} from '../../../common/api.error';
import {
    UserSelectedPriorityValidator as validator
} from './user.selected.priority.validator';
import {
    uuid
} from '../../../domain.types/miscellaneous/system.types';
import {
    UserSelectedPriorityCreateModel,
    UserSelectedPriorityUpdateModel,
    UserSelectedPrioritySearchFilters,
    UserSelectedPrioritySearchResults
} from '../../../domain.types/user.responses/user.selected.priority.domain.types';

///////////////////////////////////////////////////////////////////////////////////////

export class UserSelectedPriorityControllerDelegate {

    //#region member variables and constructors

    _service: UserSelectedPriorityService = null;

    constructor() {
        this._service = new UserSelectedPriorityService();
    }

    //#endregion

    create = async (requestBody: any) => {
        await validator.validateCreateRequest(requestBody);
        var createModel: UserSelectedPriorityCreateModel = this.getCreateModel(requestBody);
        const record = await this._service.create(createModel);
        if (record === null) {
            throw new ApiError('Unable to create user selected priority!', 400);
        }
        return this.getEnrichedDto(record);
    }

    getById = async (id: uuid) => {
        const record = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('User selected priority with id ' + id.toString() + ' cannot be found!');
        }
        return this.getEnrichedDto(record);
    }

    search = async (query: any) => {
        await validator.validateSearchRequest(query);
        var filters: UserSelectedPrioritySearchFilters = this.getSearchFilters(query);
        var searchResults: UserSelectedPrioritySearchResults = await this._service.search(filters);
        var items = searchResults.Items.map(x => this.getSearchDto(x));
        searchResults.Items = items;
        return searchResults;
    }

    update = async (id: uuid, requestBody: any) => {
        await validator.validateUpdateRequest(requestBody);
        const record = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('User selected priority with id ' + id.toString() + ' cannot be found!');
        }
        const updateModel: UserSelectedPriorityUpdateModel = this.getUpdateModel(requestBody);
        const updated = await this._service.update(id, updateModel);
        if (updated == null) {
            throw new ApiError('Unable to update user selected priority!', 400);
        }
        return this.getEnrichedDto(updated);
    }

    delete = async (id: uuid) => {
        const record = await this._service.getById(id);
        if (record == null) {
            ErrorHandler.throwNotFoundError('User selected priority with id ' + id.toString() + ' cannot be found!');
        }
        const userSelectedPriorityDeleted: boolean = await this._service.delete(id);
        return {
            Deleted : userSelectedPriorityDeleted
        };
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////

    //#region Privates

    getSearchFilters = (query) => {

        var filters = {};

        var name = query.name ? query.name : null;
        if (name != null) {
            filters['Name'] = name;
        }
        var description = query.description ? query.description : null;
        if (description != null) {
            filters['Description'] = description;
        }
        var careplanId = query.careplanId ? query.careplanId : null;
        if (careplanId != null) {
            filters['CareplanId'] = careplanId;
        }
        var assetId = query.assetId ? query.assetId : null;
        if (assetId != null) {
            filters['AssetId'] = assetId;
        }
        var assetType = query.assetType ? query.assetType : null;
        if (assetType != null) {
            filters['AssetType'] = assetType;
        }
        var startDate = query.startDate ? query.startDate : null;
        if (startDate != null) {
            filters['StartDate'] = startDate;
        }

        return filters;
    }

    getUpdateModel = (requestBody): UserSelectedPriorityUpdateModel => {

        const updateModel: UserSelectedPriorityUpdateModel = {};

        if (Helper.hasProperty(requestBody, 'Name')) {
            updateModel.Name = requestBody.Name;
        }
        if (Helper.hasProperty(requestBody, 'Description')) {
            updateModel.Description = requestBody.Description;
        }
        if (Helper.hasProperty(requestBody, 'UserId')) {
            updateModel.UserId = requestBody.UserId;
        }
        if (Helper.hasProperty(requestBody, 'CareplanId')) {
            updateModel.CareplanId = requestBody.CareplanId;
        }
        if (Helper.hasProperty(requestBody, 'StartDate')) {
            updateModel.StartDate = requestBody.StartDate;
        }

        return updateModel;
    }

    getCreateModel = (requestBody): UserSelectedPriorityCreateModel => {
        return {
            Name        : requestBody.Name ? requestBody.Name : null,
            Description : requestBody.Description ? requestBody.Description : null,
            UserId      : requestBody.UserId ? requestBody.UserId : null,
            CareplanId  : requestBody.CareplanId ? requestBody.CareplanId : null,
            StartDate   : requestBody.StartDate ? requestBody.StartDate : null
        };
    }

    getEnrichedDto = (record) => {
        if (record == null) {
            return null;
        }
        return {
            id          : record.id,
            Name        : record.Name,
            Description : record.Description,
            UserId      : record.UserId,
            CareplanId  : record.CareplanId,
            AssetId     : record.AssetId,
            AssetType   : record.AssetType,
            StartDate   : record.StartDate
        };
    }

    getSearchDto = (record) => {
        if (record == null) {
            return null;
        }
        return {
            id          : record.id,
            Name        : record.Name,
            Description : record.Description,
            UserId      : record.UserId,
            CareplanId  : record.CareplanId,
            AssetId     : record.AssetId,
            AssetType   : record.AssetType,
            StartDate   : record.StartDate
        };
    }

    //#endregion

}
///////////////////////////////////////////////////////////////////////////////////////////////
