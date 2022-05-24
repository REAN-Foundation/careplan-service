import {
    BaseSearchFilters,
    BaseSearchResults
} from "../miscellaneous/base.search.types";
import {
    uuid
} from "../miscellaneous/system.types";

export interface AudioCreateModel {
    AssetCode ? : string;
    Name ? : string;
    Transcript ? : string;
    Url ? : string;
    Tags ? : string;
    Version ? : string;
}

export interface AudioUpdateModel {
    AssetCode ? : string;
    Name ? : string;
    Transcript ? : string;
    Url ? : string;
    Tags ? : string;
    Version ? : string;
}

export interface AudioDto {
    id: number;
    AssetCode: string;
    Name: string;
    Transcript: string;
    Url: string;
    FileResourceId: uuid;
    AssetCategory: string;
    OwnerUserId: uuid;
    Tags: string[];
    Version: string;

}

export interface AudioSearchFilters extends BaseSearchFilters {
    AssetCode ? : string;
    Name ? : string;
    Transcript ? : string;
    Url ? : string;
    AssetCategory ? : string;
    Tags ? : string;
    Version ? : string;
}

export interface AudioSearchResults extends BaseSearchResults {
    Items: AudioDto[];
}