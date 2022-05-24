import {
    FileResourceService
} from '../../database/repository.services/file.resource.service';
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
    FileResourceValidator as validator
} from './file.resource.validator';
import {
    uuid
} from '../../domain.types/miscellaneous/system.types';
import {
    FileResourceCreateModel,
    FileResourceUpdateModel,
    FileResourceSearchFilters,
    FileResourceSearchResults
} from '../../domain.types/file.resource.domain.types';

///////////////////////////////////////////////////////////////////////////////////////

export class FileResourceControllerDelegate {

    //#region member variables and constructors

    _service: FileResourceService = null;

    constructor() {
        this._service = new FileResourceService();
    }

    //#endregion

    create = async (requestBody: any) => {
        await validator.validateCreateRequest(requestBody);
        var createModel: FileResourceCreateModel = this.getCreateModel(requestBody);
        const record = await this._service.create(createModel);
        if (record === null) {
            throw new ApiError('Unable to create file resource!', 400);
        }
        return this.getEnrichedDto(record);
    }

    getById = async (id: uuid) => {
        const record = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('File resource with id ' + id.toString() + ' cannot be found!');
        }
        return this.getEnrichedDto(record);
    }

    search = async (query: any) => {
        await validator.validateSearchRequest(query);
        var filters: FileResourceSearchFilters = this.getSearchFilters(query);
        var searchResults: FileResourceSearchResults = await this._service.search(filters);
        var items = searchResults.Items.map(x => this.getSearchDto(x));
        searchResults.Items = items;
        return searchResults;
    }

    update = async (id: uuid, requestBody: any) => {
        await validator.validateUpdateRequest(requestBody);
        const record = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('File resource with id ' + id.toString() + ' cannot be found!');
        }
        const updateModel: FileResourceUpdateModel = this.getUpdateModel(requestBody);
        const updated = await this._service.update(id, updateModel);
        if (updated == null) {
            throw new ApiError('Unable to update file resource!', 400);
        }
        return this.getEnrichedDto(updated);
    }

    delete = async (id: uuid) => {
        const record = await this._service.getById(id);
        if (record == null) {
            ErrorHandler.throwNotFoundError('File resource with id ' + id.toString() + ' cannot be found!');
        }
        const fileResourceDeleted: boolean = await this._service.delete(id);
        return {
            Deleted: fileResourceDeleted
        };
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////

    //#region Privates

    getSearchFilters = (query) => {

        var filters = {};

        var fileName = query.fileName ? query.fileName : null;
        if (fileName != null) {
            filters['FileName'] = fileName;
        }
        var isPublicResource = query.isPublicResource ? query.isPublicResource : null;
        if (isPublicResource != null) {
            filters['IsPublicResource'] = isPublicResource;
        }
        var tags = query.tags ? query.tags : null;
        if (tags != null) {
            filters['Tags'] = tags;
        }
        var mimeType = query.mimeType ? query.mimeType : null;
        if (mimeType != null) {
            filters['MimeType'] = mimeType;
        }

        return filters;
    }

    getUpdateModel = (requestBody): FileResourceUpdateModel => {

        let updateModel: FileResourceUpdateModel = {};

        if (Helper.hasProperty(requestBody, 'FileName')) {
            updateModel.FileName = requestBody.FileName;
        }
        if (Helper.hasProperty(requestBody, 'UserId')) {
            updateModel.UserId = requestBody.UserId;
        }
        if (Helper.hasProperty(requestBody, 'IsPublicResource')) {
            updateModel.IsPublicResource = requestBody.IsPublicResource;
        }
        if (Helper.hasProperty(requestBody, 'Tags')) {
            updateModel.Tags = JSON.stringify(requestBody.Tags);
        }

        return updateModel;
    }

    getCreateModel = (requestBody): FileResourceCreateModel => {
        return {
            FileName: requestBody.FileName ? requestBody.FileName : null,
            UserId: requestBody.UserId ? requestBody.UserId : null,
            IsPublicResource: requestBody.IsPublicResource ? requestBody.IsPublicResource : true,
            Tags: requestBody.Tags ? JSON.stringify(requestBody.Tags) as string : JSON.stringify([])
        };
    }

    getEnrichedDto = (record) => {
        if (record == null) {
            return null;
        }
        return {
            id: record.id,
            FileName: record.FileName,
            UserId: record.UserId,
            IsPublicResource: record.IsPublicResource,
            Tags: JSON.parse(record.Tags),
            MimeType: record.MimeType
        };
    }

    getSearchDto = (record) => {
        if (record == null) {
            return null;
        }
        return {
            id: record.id,
            FileName: record.FileName,
            UserId: record.UserId,
            IsPublicResource: record.IsPublicResource,
            Tags: JSON.parse(record.Tags),
            MimeType: record.MimeType
        };
    }

    //#endregion
}
///////////////////////////////////////////////////////////////////////////////////////////////