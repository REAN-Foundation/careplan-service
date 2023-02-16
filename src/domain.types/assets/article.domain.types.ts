import {
    BaseSearchFilters,
    BaseSearchResults
} from "../miscellaneous/base.search.types";
import {
    uuid
} from "../miscellaneous/system.types";

export interface ArticleCreateModel {
    AssetCode ? : string;
    Name ? : string;
    Summary ? : string;
    Url ? : string;
    Tags ? : string;
    Version ? : string;
    OwnerUserId?: uuid;
}

export interface ArticleUpdateModel {
    AssetCode ? : string;
    Name ? : string;
    Summary ? : string;
    Url ? : string;
    Tags ? : string;
    Version ? : string;
    OwnerUserId?: uuid;
}

export interface ArticleDto {
    id: uuid;
    AssetCode: string;
    Name: string;
    Summary: string;
    Url: string;
    FileResourceId: uuid;
    AssetCategory: string;
    OwnerUserId: uuid;
    Tags: string[];
    Version: string;

}

export interface ArticleSearchFilters extends BaseSearchFilters {
    AssetCode ? : string;
    Name ? : string;
    Summary ? : string;
    Url ? : string;
    AssetCategory ? : string;
    Tags ? : string;
    Version ? : string;
    CreatedAt ? : Date;
}

export interface ArticleSearchResults extends BaseSearchResults {
    Items: ArticleDto[];
}
