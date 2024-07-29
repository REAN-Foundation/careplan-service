import {
    BaseSearchFilters,
    BaseSearchResults
} from "../miscellaneous/base.search.types";
import {
    uuid
} from "../miscellaneous/system.types";

export interface InfographicsCreateModel {
    AssetCode   ?: string;
    Name        ?: string;
    Description ?: string;
    Url         ?: string;
    Tags        ?: string;
    Version     ?: string;
    OwnerUserId ?: uuid;
}

export interface InfographicsUpdateModel {
    AssetCode   ?: string;
    Name        ?: string;
    Description ?: string;
    Url         ?: string;
    Tags        ?: string;
    Version     ?: string;
    OwnerUserId ?: uuid;
}

export interface InfographicsDto {
    id            : uuid;
    AssetCode     : string;
    Name          : string;
    Description   : string;
    Url           : string;
    FileResourceId: uuid;
    AssetCategory : string;
    OwnerUserId   : uuid;
    Tags          : string[];
    Version       : string;

}

export interface InfographicsSearchFilters extends BaseSearchFilters {
    AssetCode     ?: string;
    Name          ?: string;
    Description   ?: string;
    Url           ?: string;
    AssetCategory ?: string;
    Tags          ?: string;
    Version       ?: string;
    CreatedAt     ?: Date;
}

export interface InfographicsSearchResults extends BaseSearchResults {
    Items: InfographicsDto[];
}
