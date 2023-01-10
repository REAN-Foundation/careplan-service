import { CareplanService } from '../../../database/repository.services/careplan/careplan.service';
import { ErrorHandler } from '../../../common/error.handler';
import { Helper } from '../../../common/helper';
import { ApiError } from '../../../common/api.error';
import { CareplanValidator as validator } from './careplan.validator';
import { CareplanCreateModel, CareplanDto, CareplanSearchFilters, CareplanSearchResults, CareplanUpdateModel } from '../../../domain.types/careplan/careplan.domain.types';
import { uuid } from '../../../domain.types/miscellaneous/system.types';

///////////////////////////////////////////////////////////////////////////////////////

export class CareplanControllerDelegate {

    //#region member variables and constructors

    _service: CareplanService = null;

    constructor() {
        this._service = new CareplanService();
    }

    //#endregion

    create = async (requestBody: any) => {
        await validator.validateCreateRequest(requestBody);
        var createModel: CareplanCreateModel = this.getCreateModel(requestBody);
        const record: CareplanDto = await this._service.create(createModel);
        if (record === null) {
            throw new ApiError('Unable to create care plan!', 400);
        }
        return this.getEnrichedDto(record);
    };

    getById = async (id: uuid) => {
        const record: CareplanDto = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('Care plan with id ' + id.toString() + ' cannot be found!');
        }
        return this.getEnrichedDto(record);
    };

    search = async (query: any) => {
        await validator.validateSearchRequest(query);
        var filters: CareplanSearchFilters = this.getSearchFilters(query);
        var searchResults: CareplanSearchResults = await this._service.search(filters);
        var items = searchResults.Items.map(x => this.getPublicDto(x));
        searchResults.Items = items;
        return searchResults;
    };

    update = async (id: uuid, requestBody: any) => {
        await validator.validateUpdateRequest(requestBody);
        const record: CareplanDto = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('Care plan with id ' + id.toString() + ' cannot be found!');
        }
        const updateModel: CareplanUpdateModel = this.getUpdateModel(requestBody);
        const updated: CareplanDto = await this._service.update(id, updateModel);
        if (updated == null) {
            throw new ApiError('Unable to update care plan!', 400);
        }
        return this.getEnrichedDto(updated);
    };

    delete = async (id: uuid) => {
        const record: CareplanDto = await this._service.getById(id);
        if (record == null) {
            ErrorHandler.throwNotFoundError('Care plan with id ' + id.toString() + ' cannot be found!');
        }
        const carePlanDeleted: boolean = await this._service.delete(id);
        return {
            Deleted : carePlanDeleted
        };
    };

    ///////////////////////////////////////////////////////////////////////////////////////////////

    getSearchFilters = (query) => {

        var filters = {};

        var code = query.code ? query.code : null;
        if (code != null) {
            filters['Code'] = code;
        }
        var categoryId = query.categoryId ? query.categoryId : null;
        if (categoryId != null) {
            filters['CategoryId'] = categoryId;
        }
        var name = query.name ? query.name : null;
        if (name != null) {
            filters['Name'] = name;
        }
        var version = query.version ? query.version : null;
        if (version != null) {
            filters['Version'] = version;
        }
        var ownerUserId = query.ownerUserId ? query.ownerUserId : null;
        if (ownerUserId != null) {
            filters['OwnerUserId'] = ownerUserId;
        }
        var tags = query.tags ? query.tags : null;
        if (tags != null) {
            filters['Tags'] = tags;
        }
        var isActive = query.isActive ? query.isActive : null;
        if (isActive != null) {
            filters['IsActive'] = isActive;
        }
        return filters;
    };

    getUpdateModel = (requestBody) => {

        const updateModel: CareplanUpdateModel = {};

        if (Helper.hasProperty(requestBody, 'Code')) {
            updateModel.Code = requestBody.Code;
        }
        if (Helper.hasProperty(requestBody, 'CategoryId')) {
            updateModel.CategoryId = requestBody.CategoryId;
        }
        if (Helper.hasProperty(requestBody, 'Name')) {
            updateModel.Name = requestBody.Name;
        }
        if (Helper.hasProperty(requestBody, 'Description')) {
            updateModel.Description = requestBody.Description;
        }
        if (Helper.hasProperty(requestBody, 'Version')) {
            updateModel.Version = requestBody.Version;
        }
        if (Helper.hasProperty(requestBody, 'OwnerUserId')) {
            updateModel.OwnerUserId = requestBody.OwnerUserId;
        }
        if (Helper.hasProperty(requestBody, 'Tags')) {
            updateModel.Tags = JSON.stringify(requestBody.Tags);
        }
        return updateModel;
    };

    getCreateModel = (requestBody): CareplanCreateModel => {
        return {
            Code        : requestBody.Code ? requestBody.Code : null,
            CategoryId  : requestBody.CategoryId ? requestBody.CategoryId : null,
            Name        : requestBody.Name ? requestBody.Name : null,
            Description : requestBody.Description ? requestBody.Description : null,
            Version     : requestBody.Version ? requestBody.Version : 'V1',
            OwnerUserId : requestBody.OwnerUserId ? requestBody.OwnerUserId : null,
            Tags        : requestBody.Tags ? JSON.stringify(requestBody.Tags) as string : JSON.stringify([]),
        };
    };

    //This function returns a response DTO which is enriched with available resource data

    getEnrichedDto = (record) => {
        if (record == null) {
            return null;
        }
        return {
            id          : record.id,
            Code        : record.Code,
            CategoryId  : record.CategoryId,
            Name        : record.Name,
            Description : record.Description,
            Version     : record.Version,
            OwnerUserId : record.OwnerUserId,
            Tags        : JSON.parse(record.Tags),
            IsActive    : record.IsActive,
            CreatedAt   : record.CreatedAt,
            UpdatedAt   : record.UpdatedAt,
            Type        : record.Category.Type
        };
    };

    //This function returns a response DTO which has only public parameters

    getPublicDto = (record) => {
        if (record == null) {
            return null;
        }
        return {
            id          : record.id,
            Code        : record.Code,
            CategoryId  : record.CategoryId,
            Name        : record.Name,
            Description : record.Description,
            Version     : record.Version,
            OwnerUserId : record.OwnerUserId,
            Tags        : JSON.parse(record.Tags),
            IsActive    : record.IsActive,
            CreatedAt   : record.CreatedAt,
            UpdatedAt   : record.UpdatedAt,
            Type        : record.Category.Type
        
        };
    };

}
