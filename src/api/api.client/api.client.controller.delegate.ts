import {
    ApiClientService
} from '../../database/repository.services/api.client.service';
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
    ApiClientValidator as validator
} from './api.client.validator';
import {
    uuid
} from '../../domain.types/miscellaneous/system.types';
import {
    ApiClientCreateModel,
    ApiClientUpdateModel,
    ApiClientSearchFilters,
    ApiClientSearchResults
} from '../../domain.types/api.client.domain.types';

///////////////////////////////////////////////////////////////////////////////////////

export class ApiClientControllerDelegate {

    //#region member variables and constructors

    _service: ApiClientService = null;

    constructor() {
        this._service = new ApiClientService();
    }

    //#endregion

    create = async (requestBody: any) => {
        await validator.validateCreateRequest(requestBody);
        var createModel: ApiClientCreateModel = this.getCreateModel(requestBody);
        const record = await this._service.create(createModel);
        if (record === null) {
            throw new ApiError('Unable to create api client!', 400);
        }
        return this.getEnrichedDto(record);
    }

    getById = async (id: uuid) => {
        const record = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('Api client with id ' + id.toString() + ' cannot be found!');
        }
        return this.getEnrichedDto(record);
    }

    search = async (query: any) => {
        await validator.validateSearchRequest(query);
        var filters: ApiClientSearchFilters = this.getSearchFilters(query);
        var searchResults: ApiClientSearchResults = await this._service.search(filters);
        var items = searchResults.Items.map(x => this.getSearchDto(x));
        searchResults.Items = items;
        return searchResults;
    }

    update = async (id: uuid, requestBody: any) => {
        await validator.validateUpdateRequest(requestBody);
        const record = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('Api client with id ' + id.toString() + ' cannot be found!');
        }
        const updateModel: ApiClientUpdateModel = this.getUpdateModel(requestBody);
        const updated = await this._service.update(id, updateModel);
        if (updated == null) {
            throw new ApiError('Unable to update api client!', 400);
        }
        return this.getEnrichedDto(updated);
    }

    delete = async (id: uuid) => {
        const record = await this._service.getById(id);
        if (record == null) {
            ErrorHandler.throwNotFoundError('Api client with id ' + id.toString() + ' cannot be found!');
        }
        const apiClientDeleted: boolean = await this._service.delete(id);
        return {
            Deleted : apiClientDeleted
        };
    }

    getCurrentApiKey = async (request) => {
        const verificationModel = await validator.getOrRenewApiKey(request);

        const apiKeyDto = await this._service.getApiKey(verificationModel);
        if (apiKeyDto == null) {
            throw new ApiError(400, 'Unable to retrieve client api key.');
        }
        return apiKeyDto;
    }

    renewApiKey = async (request) => {
        const verificationModel = await validator.getOrRenewApiKey(request);

        if (verificationModel.ValidFrom == null) {
            verificationModel.ValidFrom = new Date();
        }
        if (verificationModel.ValidTill == null) {
            const d = new Date();
            d.setFullYear(d.getFullYear() + 1);
            verificationModel.ValidTill = d;
        }

        const apiKeyDto = await this._service.renewApiKey(verificationModel);
        if (apiKeyDto == null) {
            throw new ApiError(400, 'Unable to renew client api key.');
        }
        return apiKeyDto;
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////

    //#region Privates

    getSearchFilters = (query) => {

        var filters = {};

        var clientName = query.clientName ? query.clientName : null;
        if (clientName != null) {
            filters['ClientName'] = clientName;
        }
        var clientCode = query.clientCode ? query.clientCode : null;
        if (clientCode != null) {
            filters['ClientCode'] = clientCode;
        }
        var isPrivileged = query.isPrivileged ? query.isPrivileged : null;
        if (isPrivileged != null) {
            filters['IsPrivileged'] = isPrivileged;
        }
        var countryCode = query.countryCode ? query.countryCode : null;
        if (countryCode != null) {
            filters['CountryCode'] = countryCode;
        }
        var phone = query.phone ? query.phone : null;
        if (phone != null) {
            filters['Phone'] = phone;
        }
        var email = query.email ? query.email : null;
        if (email != null) {
            filters['Email'] = email;
        }
        var validFrom = query.validFrom ? query.validFrom : null;
        if (validFrom != null) {
            filters['ValidFrom'] = validFrom;
        }
        var validTill = query.validTill ? query.validTill : null;
        if (validTill != null) {
            filters['ValidTill'] = validTill;
        }

        return filters;
    }

    getUpdateModel = (requestBody): ApiClientUpdateModel => {

        const updateModel: ApiClientUpdateModel = {};

        if (Helper.hasProperty(requestBody, 'ClientName')) {
            updateModel.ClientName = requestBody.ClientName;
        }
        if (Helper.hasProperty(requestBody, 'ClientCode')) {
            updateModel.ClientCode = requestBody.ClientCode;
        }
        if (Helper.hasProperty(requestBody, 'IsPrivileged')) {
            updateModel.IsPrivileged = requestBody.IsPrivileged;
        }
        if (Helper.hasProperty(requestBody, 'CountryCode')) {
            updateModel.CountryCode = requestBody.CountryCode;
        }
        if (Helper.hasProperty(requestBody, 'Phone')) {
            updateModel.Phone = requestBody.Phone;
        }
        if (Helper.hasProperty(requestBody, 'Email')) {
            updateModel.Email = requestBody.Email;
        }
        if (Helper.hasProperty(requestBody, 'Password')) {
            updateModel.Password = requestBody.Password;
        }
        if (Helper.hasProperty(requestBody, 'ApiKey')) {
            updateModel.ApiKey = requestBody.ApiKey;
        }
        if (Helper.hasProperty(requestBody, 'ValidFrom')) {
            updateModel.ValidFrom = requestBody.ValidFrom;
        }
        if (Helper.hasProperty(requestBody, 'ValidTill')) {
            updateModel.ValidTill = requestBody.ValidTill;
        }

        return updateModel;
    }

    getCreateModel = (requestBody): ApiClientCreateModel => {
        return {
            ClientName   : requestBody.ClientName ? requestBody.ClientName : null,
            ClientCode   : requestBody.ClientCode ? requestBody.ClientCode : null,
            IsPrivileged : requestBody.IsPrivileged ? requestBody.IsPrivileged : false,
            CountryCode  : requestBody.CountryCode ? requestBody.CountryCode : null,
            Phone        : requestBody.Phone ? requestBody.Phone : null,
            Email        : requestBody.Email ? requestBody.Email : null,
            Password     : requestBody.Password ? requestBody.Password : null,
            ApiKey       : requestBody.ApiKey ? requestBody.ApiKey : null,
            ValidFrom    : requestBody.ValidFrom ? requestBody.ValidFrom : null,
            ValidTill    : requestBody.ValidTill ? requestBody.ValidTill : null
        };
    }

    getEnrichedDto = (record) => {
        if (record == null) {
            return null;
        }
        return {
            id           : record.id,
            ClientName   : record.ClientName,
            ClientCode   : record.ClientCode,
            IsPrivileged : record.IsPrivileged,
            CountryCode  : record.CountryCode,
            Phone        : record.Phone,
            Email        : record.Email,
            Password     : record.Password,
            ApiKey       : record.ApiKey,
            ValidFrom    : record.ValidFrom,
            ValidTill    : record.ValidTill
        };
    }

    getSearchDto = (record) => {
        if (record == null) {
            return null;
        }
        return {
            id                  : record.id,
            ClientName          : record.ClientName,
            ClientCode          : record.ClientCode,
            ClientInterfaceType : record.ClientInterfaceType,
            IsPrivileged        : record.IsPrivileged,
            CountryCode         : record.CountryCode,
            Phone               : record.Phone,
            Email               : record.Email,
            ValidFrom           : record.ValidFrom,
            ValidTill           : record.ValidTill,
            IsActive            : record.IsActive
        };
    }

    //#endregion

}
///////////////////////////////////////////////////////////////////////////////////////////////
