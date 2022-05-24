import {
    ApiClientDto
} from '../../domain.types/api.client.domain.types';

///////////////////////////////////////////////////////////////////////////////////

export class ApiClientMapper {

    static toDto = (apiClient: any): ApiClientDto => {
        if (apiClient == null) {
            return null;
        }
        const dto: ApiClientDto = {
            id           : apiClient.id,
            ClientName   : apiClient.ClientName,
            ClientCode   : apiClient.ClientCode,
            IsPrivileged : apiClient.IsPrivileged,
            CountryCode  : apiClient.CountryCode,
            Phone        : apiClient.Phone,
            Email        : apiClient.Email,
            ValidFrom    : apiClient.ValidFrom,
            ValidTill    : apiClient.ValidTill,
            IsActive     : apiClient.IsActive
        };
        return dto;
    };

}
