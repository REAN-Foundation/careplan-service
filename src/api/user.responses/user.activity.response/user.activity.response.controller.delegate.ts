import {
    UserActivityResponseService
} from '../../../database/repository.services/user.responses/user.activity.response.service';
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
    UserActivityResponseValidator as validator
} from './user.activity.response.validator';
import {
    uuid
} from '../../../domain.types/miscellaneous/system.types';
import {
    UserActivityResponseCreateModel,
    UserActivityResponseUpdateModel,
    UserActivityResponseSearchFilters,
    UserActivityResponseSearchResults
} from '../../../domain.types/user.responses/user.activity.response.domain.types';

///////////////////////////////////////////////////////////////////////////////////////

export class UserActivityResponseControllerDelegate {

    //#region member variables and constructors

    _service: UserActivityResponseService = null;

    constructor() {
        this._service = new UserActivityResponseService();
    }

    //#endregion

    create = async (requestBody: any) => {
        await validator.validateCreateRequest(requestBody);
        var createModel: UserActivityResponseCreateModel = this.getCreateModel(requestBody);
        const record = await this._service.create(createModel);
        if (record === null) {
            throw new ApiError('Unable to create user activity response!', 400);
        }
        return this.getEnrichedDto(record);
    }

    getById = async (id: uuid) => {
        const record = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('User activity response with id ' + id.toString() + ' cannot be found!');
        }
        return this.getEnrichedDto(record);
    }

    search = async (query: any) => {
        await validator.validateSearchRequest(query);
        var filters: UserActivityResponseSearchFilters = this.getSearchFilters(query);
        var searchResults: UserActivityResponseSearchResults = await this._service.search(filters);
        var items = searchResults.Items.map(x => this.getSearchDto(x));
        searchResults.Items = items;
        return searchResults;
    }

    update = async (id: uuid, requestBody: any) => {
        await validator.validateUpdateRequest(requestBody);
        const record = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('User activity response with id ' + id.toString() + ' cannot be found!');
        }
        const updateModel: UserActivityResponseUpdateModel = this.getUpdateModel(requestBody);
        const updated = await this._service.update(id, updateModel);
        if (updated == null) {
            throw new ApiError('Unable to update user activity response!', 400);
        }
        return this.getEnrichedDto(updated);
    }

    delete = async (id: uuid) => {
        const record = await this._service.getById(id);
        if (record == null) {
            ErrorHandler.throwNotFoundError('User activity response with id ' + id.toString() + ' cannot be found!');
        }
        const userActivityResponseDeleted: boolean = await this._service.delete(id);
        return {
            Deleted : userActivityResponseDeleted
        };
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////

    //#region Privates

    getSearchFilters = (query) => {

        var filters = {};

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
        var response = query.response ? query.response : null;
        if (response != null) {
            filters['Response'] = response;
        }
        var timeResponded = query.timeResponded ? query.timeResponded : null;
        if (timeResponded != null) {
            filters['TimeResponded'] = timeResponded;
        }
        var progressStatus = query.progressStatus ? query.progressStatus : null;
        if (progressStatus != null) {
            filters['ProgressStatus'] = progressStatus;
        }

        return filters;
    }

    getUpdateModel = (requestBody): UserActivityResponseUpdateModel => {

        const updateModel: UserActivityResponseUpdateModel = {};

        if (Helper.hasProperty(requestBody, 'UserId')) {
            updateModel.UserId = requestBody.UserId;
        }
        if (Helper.hasProperty(requestBody, 'EnrollmentScheduleId')) {
            updateModel.EnrollmentScheduleId = requestBody.EnrollmentScheduleId;
        }
        if (Helper.hasProperty(requestBody, 'Response')) {
            updateModel.Response = requestBody.Response;
        }

        return updateModel;
    }

    getCreateModel = (requestBody): UserActivityResponseCreateModel => {
        return {
            UserId               : requestBody.UserId ? requestBody.UserId : null,
            EnrollmentScheduleId : requestBody.EnrollmentScheduleId ? requestBody.EnrollmentScheduleId : null,
            Response             : requestBody.Response ? requestBody.Response : '{}'
        };
    }

    getEnrichedDto = (record) => {
        if (record == null) {
            return null;
        }
        return {
            id                   : record.id,
            UserId               : record.UserId,
            EnrollmentScheduleId : record.EnrollmentScheduleId,
            CareplanScheduleId   : record.CareplanScheduleId,
            CareplanId           : record.CareplanId,
            AssetId              : record.AssetId,
            AssetType            : record.AssetType,
            Response             : record.Response,
            TimeResponded        : record.TimeResponded,
            ProgressStatus       : record.ProgressStatus
        };
    }

    getSearchDto = (record) => {
        if (record == null) {
            return null;
        }
        return {
            id                   : record.id,
            UserId               : record.UserId,
            EnrollmentScheduleId : record.EnrollmentScheduleId,
            CareplanScheduleId   : record.CareplanScheduleId,
            CareplanId           : record.CareplanId,
            AssetId              : record.AssetId,
            AssetType            : record.AssetType,
            Response             : record.Response,
            TimeResponded        : record.TimeResponded,
            ProgressStatus       : record.ProgressStatus
        };
    }

    //#endregion

}
///////////////////////////////////////////////////////////////////////////////////////////////
