import {
    CareplanScheduleService
} from '../../../database/repository.services/careplan/careplan.schedule.service';
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
    CareplanScheduleValidator as validator
} from './careplan.schedule.validator';
import {
    uuid
} from '../../../domain.types/miscellaneous/system.types';
import {
    CareplanScheduleCreateModel,
    CareplanScheduleUpdateModel,
    CareplanScheduleSearchFilters,
    CareplanScheduleSearchResults
} from '../../../domain.types/careplan/careplan.schedule.domain.types';

///////////////////////////////////////////////////////////////////////////////////////

export class CareplanScheduleControllerDelegate {

    //#region member variables and constructors

    _service: CareplanScheduleService = null;

    constructor() {
        this._service = new CareplanScheduleService();
    }

    //#endregion

    create = async (requestBody: any) => {
        await validator.validateCreateRequest(requestBody);
        var createModel: CareplanScheduleCreateModel = this.getCreateModel(requestBody);
        const record = await this._service.create(createModel);
        if (record === null) {
            throw new ApiError('Unable to create careplan schedule!', 400);
        }
        return this.getEnrichedDto(record);
    }

    getById = async (id: uuid) => {
        const record = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('Careplan schedule with id ' + id.toString() + ' cannot be found!');
        }
        return this.getEnrichedDto(record);
    }

    search = async (query: any) => {
        await validator.validateSearchRequest(query);
        var filters: CareplanScheduleSearchFilters = this.getSearchFilters(query);
        var searchResults: CareplanScheduleSearchResults = await this._service.search(filters);
        var items = searchResults.Items.map(x => this.getSearchDto(x));
        searchResults.Items = items;
        return searchResults;
    }

    update = async (id: uuid, requestBody: any) => {
        await validator.validateUpdateRequest(requestBody);
        const record = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('Careplan schedule with id ' + id.toString() + ' cannot be found!');
        }
        const updateModel: CareplanScheduleUpdateModel = this.getUpdateModel(requestBody);
        const updated = await this._service.update(id, updateModel);
        if (updated == null) {
            throw new ApiError('Unable to update careplan schedule!', 400);
        }
        return this.getEnrichedDto(updated);
    }

    delete = async (id: uuid) => {
        const record = await this._service.getById(id);
        if (record == null) {
            ErrorHandler.throwNotFoundError('Careplan schedule with id ' + id.toString() + ' cannot be found!');
        }
        const careplanScheduleDeleted: boolean = await this._service.delete(id);
        return {
            Deleted : careplanScheduleDeleted
        };
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////

    //#region Privates

    getSearchFilters = (query) => {

        var filters = {};

        var assetId = query.assetId ? query.assetId : null;
        if (assetId != null) {
            filters['AssetId'] = assetId;
        }
        var assetType = query.assetType ? query.assetType : null;
        if (assetType != null) {
            filters['AssetType'] = assetType;
        }
        var careplanId = query.careplanId ? query.careplanId : null;
        if (careplanId != null) {
            filters['CareplanId'] = careplanId;
        }
        var day = query.day ? query.day : null;
        if (day != null) {
            filters['Day'] = day;
        }
        var timeSlot = query.timeSlot ? query.timeSlot : null;
        if (timeSlot != null) {
            filters['TimeSlot'] = timeSlot;
        }

        return filters;
    }

    getUpdateModel = (requestBody): CareplanScheduleUpdateModel => {

        const updateModel: CareplanScheduleUpdateModel = {};

        if (Helper.hasProperty(requestBody, 'AssetId')) {
            updateModel.AssetId = requestBody.AssetId;
        }
        if (Helper.hasProperty(requestBody, 'AssetType')) {
            updateModel.AssetType = requestBody.AssetType;
        }
        if (Helper.hasProperty(requestBody, 'CareplanId')) {
            updateModel.CareplanId = requestBody.CareplanId;
        }
        if (Helper.hasProperty(requestBody, 'Day')) {
            updateModel.Day = requestBody.Day;
        }
        if (Helper.hasProperty(requestBody, 'TimeSlot')) {
            updateModel.TimeSlot = requestBody.TimeSlot;
        }

        return updateModel;
    }

    getCreateModel = (requestBody): CareplanScheduleCreateModel => {
        return {
            AssetId    : requestBody.AssetId ? requestBody.AssetId : null,
            AssetType  : requestBody.AssetType ? requestBody.AssetType : null,
            CareplanId : requestBody.CareplanId ? requestBody.CareplanId : null,
            Day        : requestBody.Day ? requestBody.Day : null,
            TimeSlot   : requestBody.TimeSlot ? requestBody.TimeSlot : 'Unspecified'
        };
    }

    getEnrichedDto = (record) => {
        if (record == null) {
            return null;
        }
        return {
            id         : record.id,
            AssetId    : record.AssetId,
            AssetType  : record.AssetType,
            CareplanId : record.CareplanId,
            Day        : record.Day,
            TimeSlot   : record.TimeSlot
        };
    }

    getSearchDto = (record) => {
        if (record == null) {
            return null;
        }
        return {
            id         : record.id,
            AssetId    : record.AssetId,
            AssetType  : record.AssetType,
            CareplanId : record.CareplanId,
            Day        : record.Day,
            TimeSlot   : record.TimeSlot
        };
    }

    //#endregion

}
///////////////////////////////////////////////////////////////////////////////////////////////
