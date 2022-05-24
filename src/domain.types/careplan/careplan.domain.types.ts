
import { BaseSearchFilters, BaseSearchResults } from "../miscellaneous/base.search.types";
import { uuid } from "../miscellaneous/system.types";

export interface CareplanCreateModel {
    id?: number;
    Code: string;
    CategoryId: number;
    Name: string;
    Description?: string;
    Version?: string;
    OwnerUserId: uuid;
    Tags?: string[];
    IsActive?: boolean;
}

export interface CareplanUpdateModel {
    Code?: string;
    CategoryId?: number;
    Name?: string;
    Description?: string;
    Version?: string;
    OwnerUserId?: uuid;
    Tags?: string[];
    IsActive?: boolean;
}

export interface CareplanDto {
    id?: number;
    Code: string;
    CategoryId: number;
    Name: string;
    Description?: string;
    Version: string;
    OwnerUserId: uuid;
    Tags: string[];
    IsActive: boolean;
}

export interface CareplanSearchFilters extends BaseSearchFilters {
    Code?: string;
    CategoryId?: number;
    Name?: string;
    Version?: string;
    OwnerUserId?: uuid;
    Tags?: string[];
    IsActive?: boolean;
}

export interface CareplanSearchResults extends BaseSearchResults {
    Items: CareplanDto[];
}
