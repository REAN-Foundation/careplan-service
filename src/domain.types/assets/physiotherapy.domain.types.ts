import {
    BaseSearchFilters,
    BaseSearchResults
} from "../miscellaneous/base.search.types";
import {
    uuid
} from "../miscellaneous/system.types";

export interface PhysiotherapyCreateModel {
    AssetCode ? : string;
    Name ? : string;
    Description ? : string;
    RecommendedDurationMin ? : number;
    Tags ? : string;
    Version ? : string;
    OwnerUserId ? : uuid;
    TenantId?: uuid;
}

export interface PhysiotherapyUpdateModel {
    AssetCode ? : string;
    Name ? : string;
    Description ? : string;
    RecommendedDurationMin ? : number;
    Tags ? : string;
    Version ? : string;
    OwnerUserId ? : uuid;
    TenantId?: uuid;
}

export interface PhysiotherapyDto {
    id: uuid;
    AssetCode: string;
    Name: string;
    Description: string;
    RecommendedDurationMin: number;
    AssetCategory: string;
    OwnerUserId: uuid;
    TenantId: uuid;
    Tags: string[];
    Version: string;

}

export interface PhysiotherapySearchFilters extends BaseSearchFilters {
    AssetCode ? : string;
    Name ? : string;
    Description ? : string;
    RecommendedDurationMin ? : number;
    AssetCategory ? : string;
    Tags ? : string;
    Version ? : string;
    TenantId?: uuid;
    CreatedAt ? : Date;
}

export interface PhysiotherapySearchResults extends BaseSearchResults {
    Items: PhysiotherapyDto[];
}
