import { ApiClientService } from '../../database/repository.services/api.client.service';
import { ErrorHandler } from '../../common/error.handler';
import { Helper } from '../../common/helper';
import { ApiError } from '../../common/api.error';
import { ApiClientValidator as validator } from './api.client.validator';
import { uuid } from '../../domain.types/miscellaneous/system.types';
import {
    ApiClientCreateModel,
    ApiClientUpdateModel,
    ApiClientSearchFilters,
    ApiClientSearchResults,
} from '../../domain.types/api.client.domain.types';
import * as apikeyGenerator from 'uuid-apikey';
import { TimeHelper } from '../../common/time.helper';
import { DurationType } from '../../domain.types/miscellaneous/time.types';
import { generate } from 'generate-password';

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
        var clientCode = requestBody.ClientCode;
        if (clientCode) {
            var existing = await this._service.getByClientCode(clientCode);
            if (existing) {
                ErrorHandler.throwConflictError(`Client with this client code already exists!`);
            }
        } else {
            clientCode = await this.getClientCode(requestBody.ClientName);
            requestBody.ClientCode = clientCode;
        }
        var createModel: ApiClientCreateModel = this.getCreateModel(requestBody);
        const record = await this._service.create(createModel);
        if (record === null) {
            throw new ApiError('Unable to create api client!', 400);
        }
        return this.getEnrichedDto(record);
    };

    getById = async (id: uuid) => {
        const record = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('Api client with id ' + id.toString() + ' cannot be found!');
        }
        return this.getEnrichedDto(record);
    };

    search = async (query: any) => {
        await validator.validateSearchRequest(query);
        var filters: ApiClientSearchFilters = this.getSearchFilters(query);
        var searchResults: ApiClientSearchResults = await this._service.search(filters);
        var items = searchResults.Items.map((x) => this.getSearchDto(x));
        searchResults.Items = items;
        return searchResults;
    };

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
    };

    delete = async (id: uuid) => {
        const record = await this._service.getById(id);
        if (record == null) {
            ErrorHandler.throwNotFoundError('Api client with id ' + id.toString() + ' cannot be found!');
        }
        const apiClientDeleted: boolean = await this._service.delete(id);
        return {
            Deleted : apiClientDeleted,
        };
    };

    getCurrentApiKey = async (request) => {
        const verificationModel = await validator.getOrRenewApiKey(request);
        const apiKeyDto = await this._service.getApiKey(verificationModel);
        if (apiKeyDto == null) {
            throw new ApiError('Unable to retrieve client api key.', 400);
        }
        return apiKeyDto;
    };

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
            throw new ApiError('Unable to renew client api key.', 400);
        }
        return apiKeyDto;
    };

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
        var createdAt = query.createdAt ? query.createdAt : null;
        if (createdAt != null) {
            filters['CreatedAt'] = createdAt;
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
    };

    getUpdateModel = (requestBody): ApiClientUpdateModel => {
        const updateModel: ApiClientUpdateModel = {};

        if (Helper.hasProperty(requestBody, 'ClientName')) {
            updateModel.ClientName = requestBody.ClientName;
        }
        if (Helper.hasProperty(requestBody, 'FirstName')) {
            updateModel.FirstName = requestBody.FirstName;
        }
        if (Helper.hasProperty(requestBody, 'LastName')) {
            updateModel.LastName = requestBody.LastName;
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
    };

    getCreateModel = (requestBody): ApiClientCreateModel => {
        return {
            ClientName   : requestBody.ClientName ? requestBody.ClientName : null,
            FirstName    : requestBody.FirstName ? requestBody.FirstName : null,
            LastName     : requestBody.LastName ? requestBody.LastName : null,
            ClientCode   : requestBody.ClientCode ? requestBody.ClientCode : null,
            IsPrivileged : requestBody.IsPrivileged ? requestBody.IsPrivileged : false,
            CountryCode  : requestBody.CountryCode ? requestBody.CountryCode : null,
            Phone        : requestBody.Phone ? requestBody.Phone : null,
            Email        : requestBody.Email ? requestBody.Email : null,
            Password     : requestBody.Password ? requestBody.Password : null,
            ApiKey       : requestBody.ApiKey ? requestBody.ApiKey : apikeyGenerator.default.create().apiKey,
            ValidFrom    : requestBody.ValidFrom ? requestBody.ValidFrom : new Date(),
            ValidTill    : requestBody.ValidTill
                ? requestBody.ValidTill
                : TimeHelper.addDuration(new Date(), 180, DurationType.Day),
        };
    };

    getEnrichedDto = (record) => {
        if (record == null) {
            return null;
        }
        return {
            id           : record.id,
            ClientName   : record.ClientName,
            FirstName    : record.FirstName,
            LastName     : record.LastName,
            ClientCode   : record.ClientCode,
            IsPrivileged : record.IsPrivileged,
            IsActive     : record.IsActive,
            CountryCode  : record.CountryCode,
            Phone        : record.Phone,
            Email        : record.Email,
            ApiKey       : record.ApiKey,
            ValidFrom    : record.ValidFrom,
            ValidTill    : record.ValidTill,
        };
    };

    getSearchDto = (record) => {
        if (record == null) {
            return null;
        }
        return {
            id                  : record.id,
            ClientName          : record.ClientName,
            FirstName           : record.FirstName,
            LastName            : record.LastName,
            ClientCode          : record.ClientCode,
            ClientInterfaceType : record.ClientInterfaceType,
            IsPrivileged        : record.IsPrivileged,
            CountryCode         : record.CountryCode,
            Phone               : record.Phone,
            Email               : record.Email,
            ApiKey              : record.ApiKey,
            ValidFrom           : record.ValidFrom,
            ValidTill           : record.ValidTill,
            IsActive            : record.IsActive,
            CreatedAt           : record.CreatedAt,
        };
    };

    private getClientCodePostfix() {
        return generate({
            length    : 8,
            numbers   : false,
            lowercase : false,
            uppercase : true,
            symbols   : false,
            exclude   : ',-@#$%^&*()',
        });
    }

    private getClientCode = async (clientName: string) => {
        let name = clientName;
        name = name.toUpperCase();
        let cleanedName = '';
        const len = name.length;
        for (let i = 0; i < len; i++) {
            if (Helper.isAlpha(name.charAt(i))) {
                if (!Helper.isAlphaVowel(name.charAt(i))) {
                    cleanedName += name.charAt(i);
                }
            }
        }
        const postfix = this.getClientCodePostfix();
        let tmpCode = cleanedName + postfix;
        tmpCode = tmpCode.substring(0, 8);
        let existing = await this._service.getByClientCode(tmpCode);
        while (existing != null) {
            tmpCode = tmpCode.substring(0, 4);
            tmpCode += this.getClientCodePostfix();
            tmpCode = tmpCode.substring(0, 8);
            existing = await this._service.getByClientCode(tmpCode);
        }
        return tmpCode;
    };

    //#endregion

}
///////////////////////////////////////////////////////////////////////////////////////////////
