import {
    CareplanActivityService
} from '../../../database/repository.services/careplan/careplan.activity.service';
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
    CareplanActivityValidator as validator
} from './careplan.activity.validator';
import {
    uuid
} from '../../../domain.types/miscellaneous/system.types';
import {
    CareplanActivityCreateModel,
    CareplanActivityUpdateModel,
    CareplanActivitySearchFilters,
    CareplanActivitySearchResults
} from '../../../domain.types/careplan/careplan.activity.domain.types';
import { AssetHelper } from '../../../database/repository.services/assets/asset.helper';

///////////////////////////////////////////////////////////////////////////////////////

export class CareplanActivityControllerDelegate {

    //#region member variables and constructors

    _service: CareplanActivityService = null;

    constructor() {
        this._service = new CareplanActivityService();
    }

    //#endregion

    create = async (requestBody: any) => {
        await validator.validateCreateRequest(requestBody);
        var createModel: CareplanActivityCreateModel = this.getCreateModel(requestBody);
        await this.checkValidAssetType(createModel);
        const record = await this._service.create(createModel);
        if (record === null) {
            throw new ApiError('Unable to create careplan activity!', 400);
        }
        return this.getEnrichedDto(record);
    };

    getById = async (id: uuid) => {
        const record = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('Careplan activity with id ' + id.toString() + ' cannot be found!');
        }
        return this.getEnrichedDto(record);
    };

    search = async (query: any) => {
        await validator.validateSearchRequest(query);
        var filters: CareplanActivitySearchFilters = this.getSearchFilters(query);
        var searchResults: CareplanActivitySearchResults = await this._service.search(filters);
        var items = searchResults.Items.map(x => this.getSearchDto(x));
        searchResults.Items = items;
        return searchResults;
    };

    update = async (id: uuid, requestBody: any) => {
        await validator.validateUpdateRequest(requestBody);
        const record = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('Careplan activity with id ' + id.toString() + ' cannot be found!');
        }
        const updateModel: CareplanActivityUpdateModel = this.getUpdateModel(requestBody);
        await this.checkValidAssetType(updateModel, record);
        const updated = await this._service.update(id, updateModel);
        if (updated == null) {
            throw new ApiError('Unable to update careplan activity!', 400);
        }
        return this.getEnrichedDto(updated);
    };

    delete = async (id: uuid) => {
        const record = await this._service.getById(id);
        if (record == null) {
            ErrorHandler.throwNotFoundError('Careplan activity with id ' + id.toString() + ' cannot be found!');
        }
        const careplanActivityDeleted: boolean = await this._service.delete(id);
        return {
            Deleted : careplanActivityDeleted
        };
    };

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
        var isRegistrationActivity = query.isRegistrationActivity ? query.isRegistrationActivity : null;
        if (isRegistrationActivity != null) {
            filters['IsRegistrationActivity'] = isRegistrationActivity;
        }

        return filters;
    };

    getUpdateModel = (requestBody): CareplanActivityUpdateModel => {

        const updateModel: CareplanActivityUpdateModel = {};

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
        if (Helper.hasProperty(requestBody, 'IsRegistrationActivity')) {
            updateModel.IsRegistrationActivity = requestBody.IsRegistrationActivity;
        }
        return updateModel;
    };

    getCreateModel = (requestBody): CareplanActivityCreateModel => {
        return {
            AssetId                : requestBody.AssetId ? requestBody.AssetId : null,
            AssetType              : requestBody.AssetType ? requestBody.AssetType : null,
            CareplanId             : requestBody.CareplanId ? requestBody.CareplanId : null,
            Day                    : requestBody.Day ? requestBody.Day : null,
            TimeSlot               : requestBody.TimeSlot ? requestBody.TimeSlot : 'Unspecified',
            IsRegistrationActivity : requestBody.IsRegistrationActivity ? requestBody.IsRegistrationActivity : false,
        };
    };

    getEnrichedDto = (record) => {
        if (record == null) {
            return null;
        }
        return {
            id                     : record.id,
            AssetId                : record.AssetId,
            AssetType              : record.AssetType,
            CareplanId             : record.CareplanId,
            Asset                  : record.Asset,
            Day                    : record.Day,
            TimeSlot               : record.TimeSlot,
            IsRegistrationActivity : record.IsRegistrationActivity
        };
    };

    getSearchDto = (record) => {
        if (record == null) {
            return null;
        }
        return {
            id                     : record.id,
            AssetId                : record.AssetId,
            AssetType              : record.AssetType,
            CareplanId             : record.CareplanId,
            Asset                  : record.Asset,
            Day                    : record.Day,
            TimeSlot               : record.TimeSlot,
            IsRegistrationActivity : record.IsRegistrationActivity,
            Code                   : record.Careplan.Code
        };
    };

    private async checkValidAssetType(
        model: CareplanActivityUpdateModel | CareplanActivityCreateModel, record?: any) {
        var assetType = model.AssetType ?? record?.AssetType;
        var assetId = model.AssetId ?? record?.AssetId;
        if (assetType && assetId) {
            const asset = await AssetHelper.getAsset(assetId, assetType);
            if (!asset) {
                ErrorHandler.throwNotFoundError(`Asset of type ${assetType} with id ${assetId} cannot be found!`);
            }
        }
    }

    //#endregion

}
///////////////////////////////////////////////////////////////////////////////////////////////
