import {
    BaseSearchFilters,
    BaseSearchResults
} from "../miscellaneous/base.search.types";
import {
    uuid
} from "../miscellaneous/system.types";

export interface WebNewsfeedCreateModel {
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

export interface WebNewsfeedUpdateModel {
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

export interface WebNewsfeedDto {
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

export interface WebNewsfeedSearchFilters extends BaseSearchFilters {
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

export interface WebNewsfeedSearchResults extends BaseSearchResults {
    Items: WebNewsfeedDto[];
}
