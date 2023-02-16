import {
    BaseSearchFilters,
    BaseSearchResults
} from "../miscellaneous/base.search.types";
import {
    uuid
} from "../miscellaneous/system.types";

export interface AnimationCreateModel {
    AssetCode ? : string;
    Name ? : string;
    Transcript ? : string;
    Url ? : string;
    Tags ? : string;
    Version ? : string;
    OwnerUserId?: uuid;
}

export interface AnimationUpdateModel {
    AssetCode ? : string;
    Name ? : string;
    Transcript ? : string;
    Url ? : string;
    Tags ? : string;
    Version ? : string;
    OwnerUserId?: uuid;
}

export interface AnimationDto {
    id: uuid;
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

export interface AnimationSearchFilters extends BaseSearchFilters {
    AssetCode ? : string;
    Name ? : string;
    Transcript ? : string;
    Url ? : string;
    AssetCategory ? : string;
    Tags ? : string;
    Version ? : string;
    CreatedAt ? : Date;
}

export interface AnimationSearchResults extends BaseSearchResults {
    Items: AnimationDto[];
}
