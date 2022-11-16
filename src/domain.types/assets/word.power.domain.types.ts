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
}

export interface WordPowerUpdateModel {
    AssetCode           ?: string;
    Name                ?: string;
    Description         ?: string;
    AdditionalResources ?: string;
    Tags                ?: string;
    Version             ?: string;
    OwnerUserId         ?: uuid;
}

export interface WordPowerDto {
    id                 : uuid;
    AssetCode          : string;
    Name               : string;
    Description        : string;
    AdditionalResources: string[];
    AssetCategory      : string;
    OwnerUserId        : uuid;
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
    CreatedAt           ?: Date;
}

export interface WordPowerSearchResults extends BaseSearchResults {
    Items: WordPowerDto[];
}
