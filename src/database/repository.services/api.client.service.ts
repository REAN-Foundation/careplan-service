import { ApiClientModel } from '../models/api.client.model';
import { ApiClientCreateModel, ApiClientDto, ApiClientSearchFilters, ApiClientSearchResults, ApiClientUpdateModel, ApiClientVerificationDomainModel, ClientApiKeyDto } from '../../domain.types/api.client.domain.types';
import { Logger } from '../../common/logger';
import { ApiError } from '../../common/api.error';
import { CurrentClient } from '../../domain.types/miscellaneous/current.client';
import { Op } from 'sequelize';
import { ErrorHandler } from '../../common/error.handler';
import { Helper } from '../../common/helper';
import * as apikeyGenerator from 'uuid-apikey';

///////////////////////////////////////////////////////////////////////

export class ApiClientService {

    ApiClient = ApiClientModel.Model;

    create = async (clientDomainModel: ApiClientCreateModel): Promise<ApiClientDto> => {
        try {
            const entity = {
                ClientName   : clientDomainModel.ClientName,
                ClientCode   : clientDomainModel.ClientCode,
                IsPrivileged : clientDomainModel.IsPrivileged,
                Phone        : clientDomainModel.Phone,
                Email        : clientDomainModel.Email,
                Password     : clientDomainModel.Password ?? null,
                ApiKey       : clientDomainModel.ApiKey ?? apikeyGenerator.default.create().apiKey,
                ValidFrom    : clientDomainModel.ValidFrom ?? null,
                ValidTill    : clientDomainModel.ValidTill ?? null,
            };
            entity.Password = Helper.hash(clientDomainModel.Password);
            const client = await this.ApiClient.create(entity);
            const dto = await this.toDto(client);
            return dto;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(error.message, 500);
        }
    };

    getById = async (id: string): Promise<ApiClientDto> => {
        try {
            const client = await this.ApiClient.findByPk(id);
            const dto = await this.toDto(client);
            return dto;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(error.message, 500);
        }
    };

    search = async (filters: ApiClientSearchFilters): Promise < ApiClientSearchResults > => {
        try {

            var search = this.getSearchModel(filters);
            var {
                order,
                orderByColumn
            } = this.addSortingToSearch(search, filters);
            var {
                pageIndex,
                limit
            } = this.addPaginationToSearch(search, filters);

            const foundResults = await this.ApiClient.findAndCountAll(search);
            const searchResults: ApiClientSearchResults = {
                TotalCount     : foundResults.count,
                RetrievedCount : foundResults.rows.length,
                PageIndex      : pageIndex,
                ItemsPerPage   : limit,
                Order          : order === 'DESC' ? 'descending' : 'ascending',
                OrderedBy      : orderByColumn,
                Items          : foundResults.rows,
            };

            return searchResults;

        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to search api client records!', error);
        }
    }

    getByClientCode = async (clientCode: string): Promise<ApiClientDto> =>{
        try {
            const client = await this.ApiClient.findOne({
                where : {
                    ClientCode : clientCode
                }
            });
            const dto = await this.toDto(client);
            return dto;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(error.message, 500);
        }
    }

    getApiKeyByClientCode = async (clientCode: string): Promise<ClientApiKeyDto> =>{
        try {
            const client = await this.ApiClient.findOne({
                where : {
                    ClientCode : clientCode
                }
            });
            const dto = await this.toClientSecretsDto(client);
            return dto;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(error.message, 500);
        }
    }

    getClientHashedPassword = async(id: string): Promise<string> => {
        try {
            const client = await this.ApiClient.findByPk(id);
            return client.Password;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(error.message, 500);
        }
    }

    getApiKey = async(verificationModel: ApiClientVerificationDomainModel): Promise<ClientApiKeyDto> => {
        try {
            const client = await this.getApiKeyByClientCode(verificationModel.ClientCode);
            if (client == null) {
                const message = 'Client does not exist with code (' + verificationModel.ClientCode + ')';
                throw new ApiError(message, 404);
            }

            const hashedPassword = await this.getClientHashedPassword(client.id);
            const isPasswordValid = Helper.compareHashedPassword(verificationModel.Password, hashedPassword);
            if (!isPasswordValid) {
                throw new ApiError('Invalid password!', 401);
            }
            const dto = await this.toClientSecretsDto(client);
            return dto;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(error.message, 500);
        }
    }

    renewApiKey = async (verificationModel: ApiClientVerificationDomainModel): Promise<ClientApiKeyDto> => {

        const client = await this.getByClientCode(verificationModel.ClientCode);
        if (client == null) {
            const message = 'Client does not exist for client code (' + verificationModel.ClientCode + ')';
            throw new ApiError(message, 404);
        }

        const hashedPassword = await this.getClientHashedPassword(client.id);
        const isPasswordValid = Helper.compareHashedPassword(verificationModel.Password, hashedPassword);
        if (!isPasswordValid) {
            throw new ApiError('Invalid password!', 401);
        }

        const key = apikeyGenerator.default.create();
        const clientApiKeyDto = await this.setApiKey(
            client.id,
            key.apiKey,
            verificationModel.ValidFrom,
            verificationModel.ValidTill
        );
        
        return clientApiKeyDto;
    };
    
    setApiKey = async(id: string, apiKey: string, validFrom: Date, validTill: Date): Promise<ClientApiKeyDto> => {
        try {
            const client = await this.ApiClient.findByPk(id);
            client.ApiKey = apiKey;
            client.ValidFrom = validFrom;
            client.ValidTill = validTill;
            await client.save();
            const dto = await this.toClientSecretsDto(client);
            return dto;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(error.message, 500);
        }
    }
    
    isApiKeyValid = async (apiKey: string): Promise<CurrentClient> => {
        try {
            const client = await this.ApiClient.findOne({
                where : {
                    ApiKey    : apiKey,
                    ValidFrom : { [Op.lte]: new Date() },
                    ValidTill : { [Op.gte]: new Date() }
                }
            });
            if (client == null){
                return null;
            }
            const currentClient: CurrentClient = {
                ClientName   : client.ClientName,
                ClientCode   : client.ClientCode,
                IsPrivileged : client.IsPrivileged
            };
            return currentClient;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(error.message, 500);
        }
    }
    
    update = async (id: string, clientDomainModel: ApiClientUpdateModel): Promise<ApiClientDto> => {
        try {
            const client = await this.ApiClient.findByPk(id);

            //Client code is not modifiable
            //Use renew key to update ApiKey, ValidFrom and ValidTill
            
            if (clientDomainModel.ClientName != null) {
                client.ClientName = clientDomainModel.ClientName;
            }
            if (clientDomainModel.Password != null) {
                client.Password = Helper.hash(clientDomainModel.Password);
            }
            if (clientDomainModel.Phone != null) {
                client.Phone = clientDomainModel.Phone;
            }
            if (clientDomainModel.IsPrivileged != null) {
                client.IsPrivileged = clientDomainModel.IsPrivileged;
            }
            if (clientDomainModel.Email != null) {
                client.Email = clientDomainModel.Email;
            }
            if (clientDomainModel.ValidFrom != null) {
                client.ValidFrom = clientDomainModel.ValidFrom;
            }
            if (clientDomainModel.ValidTill != null) {
                client.ValidTill = clientDomainModel.ValidTill;
            }
            await client.save();

            const dto = await this.toDto(client);
            return dto;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(error.message, 500);
        }
    }

    delete = async (id: string): Promise<boolean> => {
        try {
            const result = await this.ApiClient.destroy({ where: { id: id } });
            return result === 1;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(error.message, 500);
        }
    };

    toDto = (client): ApiClientDto => {
        if (client == null){
            return null;
        }
        let active = false;
        if (client.ValidFrom < new Date() && client.ValidTill > new Date()) {
            active = true;
        }
        const dto: ApiClientDto = {
            id           : client.id,
            ClientName   : client.ClientName,
            ClientCode   : client.ClientCode,
            Phone        : client.Phone,
            Email        : client.Email,
            IsActive     : active,
            CountryCode  : client.CountryCode,
            IsPrivileged : client.IsPrivileged,
        };
        return dto;
    }

    toClientSecretsDto = (client): ClientApiKeyDto => {
        if (client == null){
            return null;
        }
        const dto: ClientApiKeyDto = {
            id         : client.id,
            ClientName : client.ClientName,
            ClientCode : client.ClientCode,
            ApiKey     : client.ApiKey,
            ValidFrom  : client.ValidFrom,
            ValidTill  : client.ValidTill,
        };
        return dto;
    }
    
    //#region Privates

    private getSearchModel = (filters) => {

        var search = {
            where   : {},
            include : []
        };

        if (filters.ClientName) {
            search.where['ClientName'] = {
                [Op.like] : '%' + filters.ClientName + '%'
            };
        }
        if (filters.ClientCode) {
            search.where['ClientCode'] = {
                [Op.like] : '%' + filters.ClientCode + '%'
            };
        }
        if (filters.IsPrivileged) {
            search.where['IsPrivileged'] = filters.IsPrivileged;
        }
        if (filters.CountryCode) {
            search.where['CountryCode'] = filters.CountryCode;
        }
        if (filters.Phone) {
            search.where['Phone'] = filters.Phone;
        }
        if (filters.Email) {
            search.where['Email'] = filters.Email;
        }
        if (filters.ValidFrom) {
            search.where['ValidFrom'] = filters.ValidFrom;
        }
        if (filters.ValidTill) {
            search.where['ValidTill'] = filters.ValidTill;
        }

        return search;
    }

    private addSortingToSearch = (search, filters) => {

        let orderByColumn = 'CreatedAt';
        if (filters.OrderBy) {
            orderByColumn = filters.OrderBy;
        }
        let order = 'ASC';
        if (filters.Order === 'descending') {
            order = 'DESC';
        }
        search['order'] = [
            [orderByColumn, order]
        ];

        if (filters.OrderBy) {
            //In case the 'order-by attribute' is on associated model
            //search['order'] = [[ '<AssociatedModel>', filters.OrderBy, order]];
        }
        return {
            order,
            orderByColumn
        };
    }

    private addPaginationToSearch = (search, filters) => {

        let limit = 25;
        if (filters.ItemsPerPage) {
            limit = filters.ItemsPerPage;
        }
        let offset = 0;
        let pageIndex = 0;
        if (filters.PageIndex) {
            pageIndex = filters.PageIndex < 0 ? 0 : filters.PageIndex;
            offset = pageIndex * limit;
        }
        search['limit'] = limit;
        search['offset'] = offset;

        return {
            pageIndex,
            limit
        };
    }

    //#endregion

}
