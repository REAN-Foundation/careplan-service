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
    CreatedAt ? : Date;
}

export interface VideoSearchResults extends BaseSearchResults {
    Items: VideoDto[];
}
