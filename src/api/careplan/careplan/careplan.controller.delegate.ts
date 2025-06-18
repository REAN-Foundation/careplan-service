import express from 'express';
import fs from 'fs';
import { CareplanService } from '../../../database/repository.services/careplan/careplan.service';
import { ErrorHandler } from '../../../common/error.handler';
import { Helper } from '../../../common/helper';
import { ApiError } from '../../../common/api.error';
import { CareplanValidator as validator } from './careplan.validator';
import { CareplanCreateModel, CareplanDto, CareplanSearchFilters, CareplanSearchResults, CareplanUpdateModel } from '../../../domain.types/careplan/careplan.domain.types';
import { uuid } from '../../../domain.types/miscellaneous/system.types';
import path from 'path';
import { ConfigurationManager } from '../../../config/configuration.manager';

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

    search = async (request: express.Request) => {
        await validator.validateSearchRequest(request.query);
        var filters: CareplanSearchFilters = this.getSearchFilters(request.query);
        filters = await this.authorizeSearch(request, filters);
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
    
    export = async (id: uuid) => {
        const careplan = await this._service.getById(id);
        if (careplan === null) {
            ErrorHandler.throwNotFoundError('Care plan with id ' + id.toString() + ' cannot be found!');
        }
        const careplanObj = await this._service.readCareplanObjToExport(careplan);
        return careplanObj;
    };

    import = async (request: express.Request) => {
        const uploadedFilePath = request.file?.path;
        const originalFileName = request.file?.originalname;
        const UPLOAD_FOLDER = ConfigurationManager.UploadTemporaryFolder();
        const normalizedPath = path.resolve(UPLOAD_FOLDER, uploadedFilePath);

        if (!normalizedPath.startsWith(UPLOAD_FOLDER)) {
            throw new ApiError(422, 'Cannot find valid file to import!');
        }

        if (!fs.existsSync(normalizedPath)) {
            throw new ApiError(422, 'File not found!');
        }

        const fileContent = fs.readFileSync(normalizedPath, 'utf8');
        const extension =  Helper.getFileExtension(originalFileName);

        if (extension.toLowerCase() !== 'json') {
            throw new Error(`Expected .json file extension!`);
        }

        const careplanModel =  JSON.parse(fileContent);
        const careplan: CareplanDto = await this._service.import(careplanModel);

        if (careplan === null) {
            ErrorHandler.throwNotFoundError('Cannot import careplan!');
        }

        if (fs.existsSync(normalizedPath)) {
            fs.rmSync(normalizedPath, { recursive: true, force: true });
        }

        return careplan;
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
        // var tenantId = query.tenantId ? query.tenantId : null;
        // if (tenantId != null) {
        //     filters['TenantId'] = tenantId;
        // }
        var tags = query.tags ? query.tags : null;
        if (tags != null) {
            filters['Tags'] = tags;
        }
        var isActive = query.isActive ? query.isActive : null;
        if (isActive != null) {
            filters['IsActive'] = isActive;
        }
        var orderBy = query.orderBy ? query.orderBy : 'CreatedAt';
        if (orderBy != null) {
            filters['OrderBy'] = orderBy;
        }
        var order = query.order ? query.order : 'ASC';
        if (order != null) {
            filters['Order'] = order;
        }
        var itemsPerPage = query.itemsPerPage ? query.itemsPerPage : null;
        if (itemsPerPage != null) {
            filters['ItemsPerPage'] = parseInt(itemsPerPage);
        }
        var pageIndex = query.pageIndex ? query.pageIndex : null;
        if (pageIndex != null) {
            filters['PageIndex'] = parseInt(pageIndex);
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
        if (Helper.hasProperty(requestBody, 'TenantId')) {
            updateModel.TenantId = requestBody.TenantId;
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
            TenantId    : requestBody.TenantId ? requestBody.TenantId : null,
            Tags        : requestBody.Tags ? JSON.stringify(requestBody.Tags) as string : JSON.stringify([]),
        };
    };

    authorizeSearch = async (
        request: express.Request,
        searchFilters: CareplanSearchFilters): Promise<CareplanSearchFilters> => {

        if (request.currentClient?.IsPrivileged) {
            return searchFilters;
        }

        if (searchFilters.TenantId != null) {
            if (searchFilters.TenantId !== request.currentUser.TenantId) {
                throw new ApiError(403, 'Forbidden');
            }
        }
        else {
            searchFilters.TenantId = request.currentUser.TenantId;
        }
        return searchFilters;
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
            TenantId    : record.TenantId,
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
            TenantId    : record.TenantId,
            Tags        : JSON.parse(record.Tags),
            IsActive    : record.IsActive,
            CreatedAt   : record.CreatedAt,
            UpdatedAt   : record.UpdatedAt,
            Type        : record.Category.Type,
            Category    : record.Category
        
        };
    };

}
