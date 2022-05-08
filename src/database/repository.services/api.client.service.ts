import { Model as ApiClient } from '../models/ApiClient';
import { ApiClientDomainModel, ApiClientDto, ClientApiKeyDto } from '../../domain.types/api.client.domain.types';
import { Logger } from '../../common/logger';
import { ApiError } from '../../common/api.error';
import { CurrentClient } from '../../domain.types/miscellaneous/current.client';
import { Op } from 'sequelize';

///////////////////////////////////////////////////////////////////////

export class ApiClientService {

    create = async (clientDomainModel: ApiClientDomainModel): Promise<ApiClientDto> => {
        try {
            const entity = {
                ClientName : clientDomainModel.ClientName,
                ClientCode : clientDomainModel.ClientCode,
                Phone      : clientDomainModel.Phone,
                Email      : clientDomainModel.Email,
                Password   : clientDomainModel.Password ?? null,
                ApiKey     : clientDomainModel.ApiKey ?? null,
                ValidFrom  : clientDomainModel.ValidFrom ?? null,
                ValidTill  : clientDomainModel.ValidTill ?? null,
            };
            const client = await ApiClient.create(entity);
            const dto = await this.toDto(client);
            return dto;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    getById = async (id: string): Promise<ApiClientDto> => {
        try {
            const client = await ApiClient.findByPk(id);
            const dto = await this.toDto(client);
            return dto;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    getByClientCode = async (clientCode: string): Promise<ApiClientDto> =>{
        try {
            const client = await ApiClient.findOne({
                where : {
                    ClientCode : clientCode
                }
            });
            const dto = await this.toDto(client);
            return dto;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    }

    getClientHashedPassword = async(id: string): Promise<string> => {
        try {
            const client = await ApiClient.findByPk(id);
            return client.Password;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    }

    getApiKey = async(id: string): Promise<ClientApiKeyDto> => {
        try {
            const client = await ApiClient.findByPk(id);
            const dto = await this.toClientSecretsDto(client);
            return dto;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    }
    
    setApiKey = async(id: string, apiKey: string, validFrom: Date, validTill: Date): Promise<ClientApiKeyDto> => {
        try {
            const client = await ApiClient.findByPk(id);
            client.ApiKey = apiKey;
            client.ValidFrom = validFrom;
            client.ValidTill = validTill;
            await client.save();
            const dto = await this.toClientSecretsDto(client);
            return dto;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    }
    
    isApiKeyValid = async (apiKey: string): Promise<CurrentClient> => {
        try {
            const client = await ApiClient.findOne({
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
            throw new ApiError(500, error.message);
        }
    }
    
    update = async (id: string, clientDomainModel: ApiClientDomainModel): Promise<ApiClientDto> => {
        try {
            const client = await ApiClient.findByPk(id);

            //Client code is not modifiable
            //Use renew key to update ApiKey, ValidFrom and ValidTill
            
            if (clientDomainModel.ClientName != null) {
                client.ClientName = clientDomainModel.ClientName;
            }
            if (clientDomainModel.Password != null) {
                client.Password = clientDomainModel.Password;
            }
            if (clientDomainModel.Phone != null) {
                client.Phone = clientDomainModel.Phone;
            }
            if (clientDomainModel.Email != null) {
                client.Email = clientDomainModel.Email;
            }
            if (clientDomainModel.ValidTill != null) {
                client.ValidTill = clientDomainModel.ValidTill;
            }
            await client.save();

            const dto = await this.toDto(client);
            return dto;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    }

    delete = async (id: string): Promise<boolean> => {
        try {
            const result = await ApiClient.destroy({ where: { id: id } });
            return result === 1;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
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
            id         : client.id,
            ClientName : client.ClientName,
            ClientCode : client.ClientCode,
            Phone      : client.Phone,
            Email      : client.Email,
            IsActive   : active
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

}
