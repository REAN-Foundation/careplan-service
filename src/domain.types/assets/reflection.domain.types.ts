import {
    BaseSearchFilters,
    BaseSearchResults
} from "../miscellaneous/base.search.types";
import {
    uuid
} from "../miscellaneous/system.types";

export interface ReflectionCreateModel {
    AssetCode ? : string;
    Name ? : string;
    Description ? : string;
    Tags ? : string;
    Version ? : string;
    OwnerUserId ? : uuid;
    TenantId?: uuid;
}

export interface ReflectionUpdateModel {
    AssetCode ? : string;
    Name ? : string;
    Description ? : string;
    Tags ? : string;
    Version ? : string;
    OwnerUserId ? : uuid;
    TenantId?: uuid;
}

export interface ReflectionDto {
    id: uuid;
    AssetCode: string;
    Name: string;
    Description: string;
    AssetCategory: string;
    OwnerUserId: uuid;
    TenantId: uuid;
    Tags: string[];
    Version: string;

}

export interface ReflectionSearchFilters extends BaseSearchFilters {
    AssetCode ? : string;
    Name ? : string;
    Description ? : string;
    AssetCategory ? : string;
    Tags ? : string;
    Version ? : string;
    TenantId?: uuid;
    CreatedAt ? : Date;
}

export interface ReflectionSearchResults extends BaseSearchResults {
    Items: ReflectionDto[];
}
