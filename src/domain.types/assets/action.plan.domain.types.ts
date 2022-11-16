import {
    BaseSearchFilters,
    BaseSearchResults
} from "../miscellaneous/base.search.types";
import {
    uuid
} from "../miscellaneous/system.types";

export interface ActionPlanCreateModel {
    AssetCode?  : string;
    Name?       : string;
    Description?: string;
    Tags?       : string;
    Version?    : string;
    OwnerUserId?: uuid;
}

export interface ActionPlanUpdateModel {
    AssetCode?  : string;
    Name?       : string;
    Description?: string;
    Tags?       : string;
    Version?    : string;
    OwnerUserId?: uuid;
}

export interface ActionPlanDto {
    id           : uuid;
    AssetCode    : string;
    Name         : string;
    Description  : string;
    AssetCategory: string;
    OwnerUserId  : uuid;
    Tags         : string[];
    Version      : string;
}

export interface ActionPlanSearchFilters extends BaseSearchFilters {
    AssetCode?    : string;
    Name?         : string;
    Description?  : string;
    AssetCategory?: string;
    Tags?         : string;
    Version?      : string;
    CreatedAt?    : Date;
}

export interface ActionPlanSearchResults extends BaseSearchResults {
    Items: ActionPlanDto[];
}
