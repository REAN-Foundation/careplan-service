import {
    BaseSearchFilters,
    BaseSearchResults
} from "../miscellaneous/base.search.types";
import {
    uuid
} from "../miscellaneous/system.types";

export interface WordPowerCreateModel {
    AssetCode ? : string;
    Word ? : string;
    Description ? : string;
    AdditionalResources ? : string;
    Tags ? : string;
    Version ? : string;
}

export interface WordPowerUpdateModel {
    AssetCode ? : string;
    Word ? : string;
    Description ? : string;
    AdditionalResources ? : string;
    Tags ? : string;
    Version ? : string;
}

export interface WordPowerDto {
    id: number;
    AssetCode: string;
    Word: string;
    Description: string;
    AdditionalResources: string[];
    AssetCategory: string;
    OwnerUserId: uuid;
    Tags: string[];
    Version: string;

}

export interface WordPowerSearchFilters extends BaseSearchFilters {
    AssetCode ? : string;
    Word ? : string;
    Description ? : string;
    AdditionalResources ? : string;
    AssetCategory ? : string;
    Tags ? : string;
    Version ? : string;
}

export interface WordPowerSearchResults extends BaseSearchResults {
    Items: WordPowerDto[];
}