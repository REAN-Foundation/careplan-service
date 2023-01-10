import {
    ArticleService
} from '../../../database/repository.services/assets/article.service';
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
    ArticleValidator as validator
} from './article.validator';
import {
    uuid
} from '../../../domain.types/miscellaneous/system.types';
import {
    ArticleCreateModel,
    ArticleUpdateModel,
    ArticleSearchFilters,
    ArticleSearchResults
} from '../../../domain.types/assets/article.domain.types';
import { AssetHelper } from '../../../database/repository.services/assets/asset.helper';

///////////////////////////////////////////////////////////////////////////////////////

export class ArticleControllerDelegate {

    //#region member variables and constructors

    _service: ArticleService = null;

    constructor() {
        this._service = new ArticleService();
    }

    //#endregion

    create = async (requestBody: any) => {
        await validator.validateCreateRequest(requestBody);
        var createModel: ArticleCreateModel = this.getCreateModel(requestBody);
        var record = await this._service.create(createModel);
        if (record === null) {
            throw new ApiError('Unable to create article!', 400);
        }
        record = await AssetHelper.updateAssetCode(record, this._service);
        return this.getEnrichedDto(record);
    };

    getById = async (id: uuid) => {
        const record = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('Article with id ' + id.toString() + ' cannot be found!');
        }
        return this.getEnrichedDto(record);
    };

    search = async (query: any) => {
        await validator.validateSearchRequest(query);
        var filters: ArticleSearchFilters = this.getSearchFilters(query);
        var searchResults: ArticleSearchResults = await this._service.search(filters);
        var items = searchResults.Items.map(x => this.getSearchDto(x));
        searchResults.Items = items;
        return searchResults;
    };

    update = async (id: uuid, requestBody: any) => {
        await validator.validateUpdateRequest(requestBody);
        const record = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('Article with id ' + id.toString() + ' cannot be found!');
        }
        const updateModel: ArticleUpdateModel = this.getUpdateModel(requestBody);
        const updated = await this._service.update(id, updateModel);
        if (updated == null) {
            throw new ApiError('Unable to update article!', 400);
        }
        return this.getEnrichedDto(updated);
    };

    delete = async (id: uuid) => {
        const record = await this._service.getById(id);
        if (record == null) {
            ErrorHandler.throwNotFoundError('Article with id ' + id.toString() + ' cannot be found!');
        }
        const articleDeleted: boolean = await this._service.delete(id);
        return {
            Deleted : articleDeleted
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
        var summary = query.summary ? query.summary : null;
        if (summary != null) {
            filters['Summary'] = summary;
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
    };

    getUpdateModel = (requestBody): ArticleUpdateModel => {

        const updateModel: ArticleUpdateModel = {};

        if (Helper.hasProperty(requestBody, 'AssetCode')) {
            updateModel.AssetCode = requestBody.AssetCode;
        }
        if (Helper.hasProperty(requestBody, 'Name')) {
            updateModel.Name = requestBody.Name;
        }
        if (Helper.hasProperty(requestBody, 'Summary')) {
            updateModel.Summary = requestBody.Summary;
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
    };

    getCreateModel = (requestBody): ArticleCreateModel => {
        return {
            AssetCode   : requestBody.AssetCode ? requestBody.AssetCode : null,
            Name        : requestBody.Name ? requestBody.Name : null,
            Summary     : requestBody.Summary ? requestBody.Summary : null,
            Url         : requestBody.Url ? requestBody.Url : null,
            Tags        : requestBody.Tags ? JSON.stringify(requestBody.Tags) as string : JSON.stringify([]),
            Version     : requestBody.Version ? requestBody.Version : 'V1',
            OwnerUserId : requestBody.OwnerUserId
        };
    };

    getEnrichedDto = (record) => {
        if (record == null) {
            return null;
        }
        return {
            id             : record.id,
            AssetCode      : record.AssetCode,
            Name           : record.Name,
            Summary        : record.Summary,
            Url            : record.Url,
            FileResourceId : record.FileResourceId,
            AssetCategory  : record.AssetCategory,
            OwnerUserId    : record.OwnerUserId,
            Tags           : JSON.parse(record.Tags),
            Version        : record.Version
        };
    };

    getSearchDto = (record) => {
        if (record == null) {
            return null;
        }
        return {
            id             : record.id,
            AssetCode      : record.AssetCode,
            Name           : record.Name,
            Summary        : record.Summary,
            Url            : record.Url,
            FileResourceId : record.FileResourceId,
            AssetCategory  : record.AssetCategory,
            OwnerUserId    : record.OwnerUserId,
            Tags           : JSON.parse(record.Tags),
            Version        : record.Version,
            CreatedAt      : record.CreatedAt,
        };
    };

    //#endregion

}
///////////////////////////////////////////////////////////////////////////////////////////////
