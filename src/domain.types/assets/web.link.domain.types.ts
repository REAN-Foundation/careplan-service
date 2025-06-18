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
    CreatedAt ? : Date;
}

export interface WebLinkSearchResults extends BaseSearchResults {
    Items: WebLinkDto[];
}
