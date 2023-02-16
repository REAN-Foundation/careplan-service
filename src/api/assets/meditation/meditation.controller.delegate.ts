import {
    MeditationService
} from '../../../database/repository.services/assets/meditation.service';
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
    MeditationValidator as validator
} from './meditation.validator';
import {
    uuid
} from '../../../domain.types/miscellaneous/system.types';
import {
    MeditationCreateModel,
    MeditationUpdateModel,
    MeditationSearchFilters,
    MeditationSearchResults
} from '../../../domain.types/assets/meditation.domain.types';
import { AssetHelper } from '../../../database/repository.services/assets/asset.helper';

///////////////////////////////////////////////////////////////////////////////////////

export class MeditationControllerDelegate {

    //#region member variables and constructors

    _service: MeditationService = null;

    constructor() {
        this._service = new MeditationService();
    }

    //#endregion

    create = async (requestBody: any) => {
        await validator.validateCreateRequest(requestBody);
        var createModel: MeditationCreateModel = this.getCreateModel(requestBody);
        var record = await this._service.create(createModel);
        if (record === null) {
            throw new ApiError('Unable to create meditation!', 400);
        }
        record = await AssetHelper.updateAssetCode(record, this._service);
        return this.getEnrichedDto(record);
    };

    getById = async (id: uuid) => {
        const record = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('Meditation with id ' + id.toString() + ' cannot be found!');
        }
        return this.getEnrichedDto(record);
    };

    search = async (query: any) => {
        await validator.validateSearchRequest(query);
        var filters: MeditationSearchFilters = this.getSearchFilters(query);
        var searchResults: MeditationSearchResults = await this._service.search(filters);
        var items = searchResults.Items.map(x => this.getSearchDto(x));
        searchResults.Items = items;
        return searchResults;
    };

    update = async (id: uuid, requestBody: any) => {
        await validator.validateUpdateRequest(requestBody);
        const record = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('Meditation with id ' + id.toString() + ' cannot be found!');
        }
        const updateModel: MeditationUpdateModel = this.getUpdateModel(requestBody);
        const updated = await this._service.update(id, updateModel);
        if (updated == null) {
            throw new ApiError('Unable to update meditation!', 400);
        }
        return this.getEnrichedDto(updated);
    };

    delete = async (id: uuid) => {
        const record = await this._service.getById(id);
        if (record == null) {
            ErrorHandler.throwNotFoundError('Meditation with id ' + id.toString() + ' cannot be found!');
        }
        const meditationDeleted: boolean = await this._service.delete(id);
        return {
            Deleted : meditationDeleted
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
        var meditationType = query.meditationType ? query.meditationType : null;
        if (meditationType != null) {
            filters['MeditationType'] = meditationType;
        }
        var recommendedDurationMin = query.recommendedDurationMin ? query.recommendedDurationMin : null;
        if (recommendedDurationMin != null) {
            filters['RecommendedDurationMin'] = recommendedDurationMin;
        }
        var assetCategory = query.assetCategory ? query.assetCategory : null;
        if (assetCategory != null) {
            filters['AssetCategory'] = assetCategory;
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

    getUpdateModel = (requestBody): MeditationUpdateModel => {

        const updateModel: MeditationUpdateModel = {};

        if (Helper.hasProperty(requestBody, 'AssetCode')) {
            updateModel.AssetCode = requestBody.AssetCode;
        }
        if (Helper.hasProperty(requestBody, 'Name')) {
            updateModel.Name = requestBody.Name;
        }
        if (Helper.hasProperty(requestBody, 'Description')) {
            updateModel.Description = requestBody.Description;
        }
        if (Helper.hasProperty(requestBody, 'MeditationType')) {
            updateModel.MeditationType = requestBody.MeditationType;
        }
        if (Helper.hasProperty(requestBody, 'RecommendedDurationMin')) {
            updateModel.RecommendedDurationMin = requestBody.RecommendedDurationMin;
        }
        if (Helper.hasProperty(requestBody, 'Tags')) {
            updateModel.Tags = JSON.stringify(requestBody.Tags);
        }
        if (Helper.hasProperty(requestBody, 'Version')) {
            updateModel.Version = requestBody.Version;
        }

        return updateModel;
    };

    getCreateModel = (requestBody): MeditationCreateModel => {
        return {
            AssetCode              : requestBody.AssetCode ? requestBody.AssetCode : null,
            Name                   : requestBody.Name ? requestBody.Name : null,
            Description            : requestBody.Description ? requestBody.Description : null,
            MeditationType         : requestBody.MeditationType ? requestBody.MeditationType : 'Mindfulness',
            RecommendedDurationMin : requestBody.RecommendedDurationMin ? requestBody.RecommendedDurationMin : 15,
            Tags                   : requestBody.Tags ? JSON.stringify(requestBody.Tags) as string : JSON.stringify([]),
            Version                : requestBody.Version ? requestBody.Version : 'V1',
            OwnerUserId            : requestBody.OwnerUserId
        };
    };

    getEnrichedDto = (record) => {
        if (record == null) {
            return null;
        }
        return {
            id                     : record.id,
            AssetCode              : record.AssetCode,
            Name                   : record.Name,
            Description            : record.Description,
            MeditationType         : record.MeditationType,
            RecommendedDurationMin : record.RecommendedDurationMin,
            AssetCategory          : record.AssetCategory,
            OwnerUserId            : record.OwnerUserId,
            Tags                   : JSON.parse(record.Tags),
            Version                : record.Version
        };
    };

    getSearchDto = (record) => {
        if (record == null) {
            return null;
        }
        return {
            id                     : record.id,
            AssetCode              : record.AssetCode,
            Name                   : record.Name,
            Description            : record.Description,
            MeditationType         : record.MeditationType,
            RecommendedDurationMin : record.RecommendedDurationMin,
            AssetCategory          : record.AssetCategory,
            OwnerUserId            : record.OwnerUserId,
            Tags                   : JSON.parse(record.Tags),
            Version                : record.Version,
            CreatedAt              : record.Version,
        };
    };

    //#endregion

}
///////////////////////////////////////////////////////////////////////////////////////////////
