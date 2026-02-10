import {
    BaseSearchFilters,
    BaseSearchResults
} from "../miscellaneous/base.search.types";
import {
    uuid
} from "../miscellaneous/system.types";

export interface WebLinkCreateModel {
    AssetCode ? : string;
    Name ? : string;
    Description ? : string;
    Url ? : string;
    Tags ? : string;
    Version ? : string;
    OwnerUserId ? : uuid;
    TenantId?: uuid;
    TenantCode?: string;

}

export interface WebLinkUpdateModel {
    AssetCode ? : string;
    Name ? : string;
    Description ? : string;
    Url ? : string;
    Tags ? : string;
    Version ? : string;
    OwnerUserId ? : uuid;
    TenantId?: uuid;
    TenantCode?: string;
}

export interface WebLinkDto {
    id: uuid;
    AssetCode: string;
    Name: string;
    Description: string;
    Url: string;
    AssetCategory: string;
    OwnerUserId: uuid;
    TenantId: uuid;
    TenantCode?: string;
    Tags: string[];
    Version: string;

}

export interface WebLinkSearchFilters extends BaseSearchFilters {
    AssetCode ? : string;
    Name ? : string;
    Description ? : string;
    Url ? : string;
    AssetCategory ? : string;
    Tags ? : string;
    Version ? : string;
    TenantId?: uuid;
    TenantCode?: string;
    CreatedAt ? : Date;
}

export interface WebLinkSearchResults extends BaseSearchResults {
    Items: WebLinkDto[];
}
