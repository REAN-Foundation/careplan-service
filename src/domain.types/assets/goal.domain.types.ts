import {
    BaseSearchFilters,
    BaseSearchResults
} from "../miscellaneous/base.search.types";
import {
    uuid
} from "../miscellaneous/system.types";

export interface GoalCreateModel {
    AssetCode ? : string;
    Name ? : string;
    Description ? : string;
    Tags ? : string;
    Version ? : string;
    OwnerUserId? : uuid;
    TenantId?: uuid;
}

export interface GoalUpdateModel {
    AssetCode ? : string;
    Name ? : string;
    Description ? : string;
    Tags ? : string;
    Version ? : string;
    OwnerUserId? : uuid;
    TenantId?: uuid;
}

export interface GoalDto {
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

export interface GoalSearchFilters extends BaseSearchFilters {
    AssetCode ? : string;
    Name ? : string;
    Description ? : string;
    AssetCategory ? : string;
    Tags ? : string;
    Version ? : string;
    TenantId?: uuid;
    CreatedAt ? : Date;
}

export interface GoalSearchResults extends BaseSearchResults {
    Items: GoalDto[];
}
