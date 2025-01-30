
import { BaseSearchFilters, BaseSearchResults } from "../miscellaneous/base.search.types";
import { uuid } from "../miscellaneous/system.types";
import { CareplanCategoryCreateModel, CareplanCategoryDto } from "./careplan.category.domain.types";

export interface CareplanCreateModel {
    id?: uuid;
    Code: string;
    CategoryId: uuid;
    Name: string;
    Description?: string;
    Version?: string;
    OwnerUserId: uuid;
    Tags?: string;
    IsActive?: boolean;
    Category?:CareplanCategoryCreateModel;
    Assets?:any[];
    CareplanActivities?:any[];
}

export interface CareplanUpdateModel {
    Code?: string;
    CategoryId?: uuid;
    Name?: string;
    Description?: string;
    Version?: string;
    OwnerUserId?: uuid;
    Tags?: string;
    IsActive?: boolean;
}

export interface CareplanDto  {
    id: uuid;
    Code: string;
    CategoryId: uuid;
    Name: string;
    Description?: string;
    Version: string;
    OwnerUserId: uuid;
    Tags: string[];
    IsActive: boolean;
    CreatedAt:Date;
    UpdatedAt:Date;
    Category:CareplanCategoryDto[];
}

export interface CareplanSearchFilters extends BaseSearchFilters {
    Code?: string;
    CategoryId?: uuid;
    Name?: string;
    Version?: string;
    OwnerUserId?: uuid;
    Tags?: string[];
    IsActive?: boolean;
}

export interface CareplanSearchResults extends BaseSearchResults {
    Items: CareplanDto[];
}
