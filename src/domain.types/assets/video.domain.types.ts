import {
    BaseSearchFilters,
    BaseSearchResults
} from "../miscellaneous/base.search.types";
import {
    uuid
} from "../miscellaneous/system.types";

export interface VideoCreateModel {
    AssetCode ? : string;
    Name ? : string;
    Transcript ? : string;
    Url ? : string;
    Tags ? : string;
    Version ? : string;
    OwnerUserId ? : uuid;
    TenantId?: uuid;
    TenantCode?: string;
}

export interface VideoUpdateModel {
    AssetCode ? : string;
    Name ? : string;
    Transcript ? : string;
    Url ? : string;
    Tags ? : string;
    Version ? : string;
    OwnerUserId ? : uuid;
    TenantId?: uuid;
    TenantCode?: string;
}

export interface VideoDto {
    id: uuid;
    AssetCode: string;
    Name: string;
    Transcript: string;
    Url: string;
    FileResourceId: uuid;
    AssetCategory: string;
    OwnerUserId: uuid;
    TenantId: uuid;
    TenantCode?: string;
    Tags: string[];
    Version: string;

}

export interface VideoSearchFilters extends BaseSearchFilters {
    AssetCode ? : string;
    Name ? : string;
    Transcript ? : string;
    Url ? : string;
    AssetCategory ? : string;
    Tags ? : string;
    Version ? : string;
    TenantId?: uuid;
    TenantCode?: string;
    CreatedAt ? : Date;
}

export interface VideoSearchResults extends BaseSearchResults {
    Items: VideoDto[];
}
