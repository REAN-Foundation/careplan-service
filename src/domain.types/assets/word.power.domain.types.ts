import {
    BaseSearchFilters,
    BaseSearchResults
} from "../miscellaneous/base.search.types";
import {
    uuid
} from "../miscellaneous/system.types";

export interface WordPowerCreateModel {
    AssetCode           ?: string;
    Name                ?: string;
    Description         ?: string;
    AdditionalResources ?: string;
    Tags                ?: string;
    Version             ?: string;
    OwnerUserId         ?: uuid;
    TenantId            ?: uuid;
    TenantCode          ?: string;
}

export interface WordPowerUpdateModel {
    AssetCode           ?: string;
    Name                ?: string;
    Description         ?: string;
    AdditionalResources ?: string;
    Tags                ?: string;
    Version             ?: string;
    OwnerUserId         ?: uuid;
    TenantId            ?: uuid;
    TenantCode          ?: string;
}

export interface WordPowerDto {
    id                 : uuid;
    AssetCode          : string;
    Name               : string;
    Description        : string;
    AdditionalResources: string[];
    AssetCategory      : string;
    OwnerUserId        : uuid;
    TenantId           : uuid;
    TenantCode         ?: string;
    Tags               : string[];
    Version            : string;

}

export interface WordPowerSearchFilters extends BaseSearchFilters {
    AssetCode           ?: string;
    Name                ?: string;
    Description         ?: string;
    AdditionalResources ?: string;
    AssetCategory       ?: string;
    Tags                ?: string;
    Version             ?: string;
    TenantId            ?: uuid;
    TenantCode          ?: string;
    CreatedAt           ?: Date;
}

export interface WordPowerSearchResults extends BaseSearchResults {
    Items: WordPowerDto[];
}
