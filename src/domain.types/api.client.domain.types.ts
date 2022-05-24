import { BaseSearchFilters, BaseSearchResults } from "./miscellaneous/base.search.types";

export interface ApiClientCreateModel {
    id?          : string;
    ClientName   : string;
    ClientCode?  : string;
    Password?    : string;
    CountryCode? : string;
    Phone?       : string;
    Email?       : string;
    ApiKey?      : string;
    IsPrivileged?: boolean;
    ValidFrom?   : Date;
    ValidTill?   : Date;
}

export interface ApiClientUpdateModel {
    ClientName ? : string;
    ClientCode ? : string;
    IsPrivileged ? : boolean;
    CountryCode ? : string;
    Phone ? : string;
    Email ? : string;
    Password ? : string;
    ApiKey ? : string;
    ValidFrom ? : Date;
    ValidTill ? : Date;
}

export interface ApiClientVerificationDomainModel {
    ClientCode: string;
    Password  : string;
    ValidFrom : Date;
    ValidTill : Date;
}

export interface ApiClientDto {
    id           : string;
    ClientName   : string;
    ClientCode   : string;
    CountryCode  : string;
    Phone        : string;
    Email        : string;
    IsPrivileged : boolean;
    IsActive     : boolean;
    ValidFrom?   : Date,
    ValidTill?   : Date,
}

export interface ClientApiKeyDto {
    id        : string;
    ClientName: string;
    ClientCode: string;
    ApiKey    : string;
    ValidFrom : Date;
    ValidTill : Date;
}

export interface ApiClientSearchFilters extends BaseSearchFilters {
    ClientName ? : string;
    ClientCode ? : string;
    IsPrivileged ? : boolean;
    CountryCode ? : string;
    Phone ? : string;
    Email ? : string;
    ValidFrom ? : Date;
    ValidTill ? : Date;
}

export interface ApiClientSearchResults extends BaseSearchResults {
    Items: ApiClientDto[];
}
