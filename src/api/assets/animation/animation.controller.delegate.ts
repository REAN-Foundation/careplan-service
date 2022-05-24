import {
    AnimationService
} from '../../../database/repository.services/assets/animation.service';
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
    AnimationValidator as validator
} from './animation.validator';
import {
    uuid
} from '../../../domain.types/miscellaneous/system.types';
import {
    AnimationCreateModel,
    AnimationUpdateModel,
    AnimationSearchFilters,
    AnimationSearchResults
} from '../../../domain.types/assets/animation.domain.types';

///////////////////////////////////////////////////////////////////////////////////////

export class AnimationControllerDelegate {

    //#region member variables and constructors

    _service: AnimationService = null;

    constructor() {
        this._service = new AnimationService();
    }

    //#endregion

    create = async (requestBody: any) => {
        await validator.validateCreateRequest(requestBody);
        var createModel: AnimationCreateModel = this.getCreateModel(requestBody);
        const record = await this._service.create(createModel);
        if (record === null) {
            throw new ApiError('Unable to create animation!', 400);
        }
        return this.getEnrichedDto(record);
    }

    getById = async (id: uuid) => {
        const record = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('Animation with id ' + id.toString() + ' cannot be found!');
        }
        return this.getEnrichedDto(record);
    }

    search = async (query: any) => {
        await validator.validateSearchRequest(query);
        var filters: AnimationSearchFilters = this.getSearchFilters(query);
        var searchResults: AnimationSearchResults = await this._service.search(filters);
        var items = searchResults.Items.map(x => this.getSearchDto(x));
        searchResults.Items = items;
        return searchResults;
    }

    update = async (id: uuid, requestBody: any) => {
        await validator.validateUpdateRequest(requestBody);
        const record = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('Animation with id ' + id.toString() + ' cannot be found!');
        }
        const updateModel: AnimationUpdateModel = this.getUpdateModel(requestBody);
        const updated = await this._service.update(id, updateModel);
        if (updated == null) {
            throw new ApiError('Unable to update animation!', 400);
        }
        return this.getEnrichedDto(updated);
    }

    delete = async (id: uuid) => {
        const record = await this._service.getById(id);
        if (record == null) {
            ErrorHandler.throwNotFoundError('Animation with id ' + id.toString() + ' cannot be found!');
        }
        const animationDeleted: boolean = await this._service.delete(id);
        return {
            Deleted : animationDeleted
        };
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////

    //#region Privates

    getSearchFilters = (query) => {

        var filters = {};

        var assetCode = query.assetCode ? query.assetCode : null;
        if (assetCode != null) {
            filters['AssetCode'] = assetCode;
        }
        var name = query.name ? query.name : null;
        if (name != null) {
            filters['Name'] = name;
        }
        var transcript = query.transcript ? query.transcript : null;
        if (transcript != null) {
            filters['Transcript'] = transcript;
        }
        var url = query.url ? query.url : null;
        if (url != null) {
            filters['Url'] = url;
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
    }

    getUpdateModel = (requestBody): AnimationUpdateModel => {

        const updateModel: AnimationUpdateModel = {};

        if (Helper.hasProperty(requestBody, 'AssetCode')) {
            updateModel.AssetCode = requestBody.AssetCode;
        }
        if (Helper.hasProperty(requestBody, 'Name')) {
            updateModel.Name = requestBody.Name;
        }
        if (Helper.hasProperty(requestBody, 'Transcript')) {
            updateModel.Transcript = requestBody.Transcript;
        }
        if (Helper.hasProperty(requestBody, 'Url')) {
            updateModel.Url = requestBody.Url;
        }
        if (Helper.hasProperty(requestBody, 'Tags')) {
            updateModel.Tags = JSON.stringify(requestBody.Tags);
        }
        if (Helper.hasProperty(requestBody, 'Version')) {
            updateModel.Version = requestBody.Version;
        }

        return updateModel;
    }

    getCreateModel = (requestBody): AnimationCreateModel => {
        return {
            AssetCode  : requestBody.AssetCode ? requestBody.AssetCode : null,
            Name       : requestBody.Name ? requestBody.Name : null,
            Transcript : requestBody.Transcript ? requestBody.Transcript : null,
            Url        : requestBody.Url ? requestBody.Url : null,
            Tags       : requestBody.Tags ? JSON.stringify(requestBody.Tags) as string : JSON.stringify([]),
            Version    : requestBody.Version ? requestBody.Version : 'V1'
        };
    }

    getEnrichedDto = (record) => {
        if (record == null) {
            return null;
        }
        return {
            id             : record.id,
            AssetCode      : record.AssetCode,
            Name           : record.Name,
            Transcript     : record.Transcript,
            Url            : record.Url,
            FileResourceId : record.FileResourceId,
            AssetCategory  : record.AssetCategory,
            OwnerUserId    : record.OwnerUserId,
            Tags           : JSON.parse(record.Tags),
            Version        : record.Version
        };
    }

    getSearchDto = (record) => {
        if (record == null) {
            return null;
        }
        return {
            id             : record.id,
            AssetCode      : record.AssetCode,
            Name           : record.Name,
            Transcript     : record.Transcript,
            Url            : record.Url,
            FileResourceId : record.FileResourceId,
            AssetCategory  : record.AssetCategory,
            OwnerUserId    : record.OwnerUserId,
            Tags           : JSON.parse(record.Tags),
            Version        : record.Version
        };
    }

    //#endregion

}
///////////////////////////////////////////////////////////////////////////////////////////////
