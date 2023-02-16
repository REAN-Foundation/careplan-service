import {
    BiometricsService
} from '../../../database/repository.services/assets/biometrics.service';
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
    BiometricsValidator as validator
} from './biometrics.validator';
import {
    uuid
} from '../../../domain.types/miscellaneous/system.types';
import {
    BiometricsCreateModel,
    BiometricsUpdateModel,
    BiometricsSearchFilters,
    BiometricsSearchResults
} from '../../../domain.types/assets/biometrics.domain.types';
import { AssetHelper } from '../../../database/repository.services/assets/asset.helper';

///////////////////////////////////////////////////////////////////////////////////////

export class BiometricsControllerDelegate {

    //#region member variables and constructors

    _service: BiometricsService = null;

    constructor() {
        this._service = new BiometricsService();
    }

    //#endregion

    create = async (requestBody: any) => {
        await validator.validateCreateRequest(requestBody);
        var createModel: BiometricsCreateModel = this.getCreateModel(requestBody);
        var record = await this._service.create(createModel);
        if (record === null) {
            throw new ApiError('Unable to create biometrics!', 400);
        }
        record = await AssetHelper.updateAssetCode(record, this._service);
        return this.getEnrichedDto(record);
    };

    getById = async (id: uuid) => {
        const record = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('Biometrics with id ' + id.toString() + ' cannot be found!');
        }
        return this.getEnrichedDto(record);
    };

    search = async (query: any) => {
        await validator.validateSearchRequest(query);
        var filters: BiometricsSearchFilters = this.getSearchFilters(query);
        var searchResults: BiometricsSearchResults = await this._service.search(filters);
        var items = searchResults.Items.map(x => this.getSearchDto(x));
        searchResults.Items = items;
        return searchResults;
    };

    update = async (id: uuid, requestBody: any) => {
        await validator.validateUpdateRequest(requestBody);
        const record = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('Biometrics with id ' + id.toString() + ' cannot be found!');
        }
        const updateModel: BiometricsUpdateModel = this.getUpdateModel(requestBody);
        const updated = await this._service.update(id, updateModel);
        if (updated == null) {
            throw new ApiError('Unable to update biometrics!', 400);
        }
        return this.getEnrichedDto(updated);
    };

    delete = async (id: uuid) => {
        const record = await this._service.getById(id);
        if (record == null) {
            ErrorHandler.throwNotFoundError('Biometrics with id ' + id.toString() + ' cannot be found!');
        }
        const biometricsDeleted: boolean = await this._service.delete(id);
        return {
            Deleted : biometricsDeleted
        };
    };

    ///////////////////////////////////////////////////////////////////////////////////////////////

    //#region Privates

    getSearchFilters = (query) => {

        var filters = Helper.getDefaultSearchFilters(query);

        var assetCode = query.assetCode ? query.assetCode : null;
        if (assetCode != null) {
            filters['AssetCode'] = assetCode;
        }
        var name = query.name ? query.name : null;
        if (name != null) {
            filters['Name'] = name;
        }
        var description = query.description ? query.description : null;
        if (description != null) {
            filters['Description'] = description;
        }
        var assetCategory = query.assetCategory ? query.assetCategory : null;
        if (assetCategory != null) {
            filters['AssetCategory'] = assetCategory;
        }
        var biometricsType = query.biometricsType ? query.biometricsType : null;
        if (biometricsType != null) {
            filters['BiometricsType'] = biometricsType;
        }
        var measurementUnit = query.measurementUnit ? query.measurementUnit : null;
        if (measurementUnit != null) {
            filters['MeasurementUnit'] = measurementUnit;
        }
        var tags = query.tags ? query.tags : null;
        if (tags != null) {
            filters['Tags'] = tags;
        }
        var version = query.version ? query.version : null;
        if (version != null) {
            filters['Version'] = version;
        }

        return filters;
    };

    getUpdateModel = (requestBody): BiometricsUpdateModel => {

        const updateModel: BiometricsUpdateModel = {};

        if (Helper.hasProperty(requestBody, 'AssetCode')) {
            updateModel.AssetCode = requestBody.AssetCode;
        }
        if (Helper.hasProperty(requestBody, 'Name')) {
            updateModel.Name = requestBody.Name;
        }
        if (Helper.hasProperty(requestBody, 'Description')) {
            updateModel.Description = requestBody.Description;
        }
        if (Helper.hasProperty(requestBody, 'BiometricsType')) {
            updateModel.BiometricsType = requestBody.BiometricsType;
        }
        if (Helper.hasProperty(requestBody, 'MeasurementUnit')) {
            updateModel.MeasurementUnit = requestBody.MeasurementUnit;
        }
        if (Helper.hasProperty(requestBody, 'Tags')) {
            updateModel.Tags = JSON.stringify(requestBody.Tags);
        }
        if (Helper.hasProperty(requestBody, 'Version')) {
            updateModel.Version = requestBody.Version;
        }

        return updateModel;
    };

    getCreateModel = (requestBody): BiometricsCreateModel => {
        return {
            AssetCode       : requestBody.AssetCode ? requestBody.AssetCode : null,
            Name            : requestBody.Name ? requestBody.Name : null,
            Description     : requestBody.Description ? requestBody.Description : null,
            BiometricsType  : requestBody.BiometricsType ? requestBody.BiometricsType : 'Other',
            MeasurementUnit : requestBody.MeasurementUnit ? requestBody.MeasurementUnit : null,
            Tags            : requestBody.Tags ? JSON.stringify(requestBody.Tags) as string : JSON.stringify([]),
            Version         : requestBody.Version ? requestBody.Version : 'V1',
            OwnerUserId     : requestBody.OwnerUserId
        };
    };

    getEnrichedDto = (record) => {
        if (record == null) {
            return null;
        }
        return {
            id              : record.id,
            AssetCode       : record.AssetCode,
            Name            : record.Name,
            Description     : record.Description,
            AssetCategory   : record.AssetCategory,
            BiometricsType  : record.BiometricsType,
            MeasurementUnit : record.MeasurementUnit,
            OwnerUserId     : record.OwnerUserId,
            Tags            : JSON.parse(record.Tags),
            Version         : record.Version
        };
    };

    getSearchDto = (record) => {
        if (record == null) {
            return null;
        }
        return {
            id              : record.id,
            AssetCode       : record.AssetCode,
            Name            : record.Name,
            Description     : record.Description,
            AssetCategory   : record.AssetCategory,
            BiometricsType  : record.BiometricsType,
            MeasurementUnit : record.MeasurementUnit,
            OwnerUserId     : record.OwnerUserId,
            Tags            : JSON.parse(record.Tags),
            Version         : record.Version,
            CreatedAt       : record.CreatedAt,
        };
    };

    //#endregion

}
///////////////////////////////////////////////////////////////////////////////////////////////
