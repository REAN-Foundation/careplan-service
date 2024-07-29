import { CareplanCategoryService } from '../../../database/repository.services/careplan/careplan.category.service';
import { ErrorHandler } from '../../../common/error.handler';
import { Helper } from '../../../common/helper';
import { ApiError } from '../../../common/api.error';
import { CareplanCategoryValidator as validator } from './careplan.category.validator';
import { CareplanCategoryCreateModel,
    CareplanCategoryDto, CareplanCategorySearchFilters,
    CareplanCategorySearchResults, CareplanCategoryUpdateModel
} from '../../../domain.types/careplan/careplan.category.domain.types';
import { uuid } from '../../../domain.types/miscellaneous/system.types';

///////////////////////////////////////////////////////////////////////////////////////

export class CareplanCategoryControllerDelegate {

    //#region member variables and constructors

    _service: CareplanCategoryService = null;

    constructor() {
        this._service = new CareplanCategoryService();
    }

    //#endregion

    create = async (requestBody: any) => {
        await validator.validateCreateRequest(requestBody);
        var exists = await this._service.existsByName(requestBody.Type);
        if (exists) {
            ErrorHandler.throwConflictError(`Category with same name exists!`);
        }
        var createModel: CareplanCategoryCreateModel = this.getCreateModel(requestBody);
        const record: CareplanCategoryDto = await this._service.create(createModel);
        if (record === null) {
            throw new ApiError('Unable to create careplan category!', 400);
        }
        return this.getEnrichedDto(record);
    };

    getById = async (id: uuid) => {
        const record: CareplanCategoryDto = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('Careplan category with id ' + id.toString() + ' cannot be found!');
        }
        return this.getEnrichedDto(record);
    };

    search = async (query: any) => {
        await validator.validateSearchRequest(query);
        var filters: CareplanCategorySearchFilters = this.getSearchFilters(query);
        var searchResults: CareplanCategorySearchResults = await this._service.search(filters);
        var items = searchResults.Items.map(x => this.getPublicDto(x));
        searchResults.Items = items;
        return searchResults;
    };

    update = async (id: uuid, requestBody: any) => {
        await validator.validateUpdateRequest(requestBody);
        const record: CareplanCategoryDto = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('Careplan category with id ' + id.toString() + ' cannot be found!');
        }
        const updateModel: CareplanCategoryUpdateModel = this.getUpdateModel(requestBody);
        const updated: CareplanCategoryDto = await this._service.update(id, updateModel);
        if (updated == null) {
            throw new ApiError('Unable to update careplan category!', 400);
        }
        return this.getEnrichedDto(updated);
    };

    delete = async (id: uuid) => {
        const record: CareplanCategoryDto = await this._service.getById(id);
        if (record == null) {
            ErrorHandler.throwNotFoundError('Careplan category with id ' + id.toString() + ' cannot be found!');
        }
        const careplanCategoryDeleted: boolean = await this._service.delete(id);
        return {
            Deleted : careplanCategoryDeleted
        };
    };

    ///////////////////////////////////////////////////////////////////////////////////////////////

    getSearchFilters = (query) => {

        var filters = {};

        var type = query.type ? query.type : null;
        if (type != null) {
            filters['Type'] = type;
        }
        var description = query.description ? query.description : null;
        if (description != null) {
            filters['Description'] = description;
        }
        return filters;
    };

    getUpdateModel = (requestBody) => {

        const updateModel: CareplanCategoryUpdateModel = {};

        if (Helper.hasProperty(requestBody, 'Type')) {
            updateModel.Type = requestBody.Type;
        }
        if (Helper.hasProperty(requestBody, 'Description')) {
            updateModel.Description = requestBody.Description;
        }
        return updateModel;
    };

    getCreateModel = (requestBody): CareplanCategoryCreateModel => {
        return {
            Type        : requestBody.Type ? requestBody.Type : null,
            Description : requestBody.Description ? requestBody.Description : null
        };
    };

    //This function returns a response DTO which is enriched with available resource data

    getEnrichedDto = (record) => {
        if (record == null) {
            return null;
        }
        return {
            id          : record.id,
            Type        : record.Type,
            Description : record.Description
        };
    };

    //This function returns a response DTO which has only public parameters

    getPublicDto = (record) => {
        if (record == null) {
            return null;
        }
        return {
            id          : record.id,
            Type        : record.Type,
            Description : record.Description
        };
    };

}
