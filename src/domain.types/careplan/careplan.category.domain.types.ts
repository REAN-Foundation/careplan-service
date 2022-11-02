import { uuid } from "../miscellaneous/system.types";
import { BaseSearchFilters, BaseSearchResults } from "../miscellaneous/base.search.types";

export interface CareplanCategoryCreateModel {
    id?: uuid;
    Type: string;
    Description?: string;
}

export interface CareplanCategoryUpdateModel {
    Type?: string;
    Description?: string;
}

export interface CareplanCategoryDto {
    id: uuid;
    Type: string;
    Description?: string;
}

export interface CareplanCategorySearchFilters extends BaseSearchFilters {
    Type?: string;
}

export interface CareplanCategorySearchResults extends BaseSearchResults {
    Items: CareplanCategoryDto[];
}
