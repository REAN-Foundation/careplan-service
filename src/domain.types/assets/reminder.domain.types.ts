import {
    BaseSearchFilters,
    BaseSearchResults
} from "../miscellaneous/base.search.types";
import {
    uuid
} from "../miscellaneous/system.types";

export interface ReminderCreateModel {
    AssetCode ? : string;
    Name ? : string;
    Description ? : string;
    Tags ? : string;
    Version ? : string;
    OwnerUserId ? : uuid;
    TenantId?: uuid;
}

export interface ReminderUpdateModel {
    AssetCode ? : string;
    Name ? : string;
    Description ? : string;
    Tags ? : string;
    Version ? : string;
    OwnerUserId ? : uuid;
    TenantId?: uuid;
}

export interface ReminderDto {
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

export interface ReminderSearchFilters extends BaseSearchFilters {
    AssetCode ? : string;
    Name ? : string;
    Description ? : string;
    AssetCategory ? : string;
    Tags ? : string;
    Version ? : string;
    TenantId?: uuid;
    CreatedAt ? : Date;
}

export interface ReminderSearchResults extends BaseSearchResults {
    Items: ReminderDto[];
}
