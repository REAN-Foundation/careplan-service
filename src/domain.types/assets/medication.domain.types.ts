import {
    BaseSearchFilters,
    BaseSearchResults
} from "../miscellaneous/base.search.types";
import {
    uuid
} from "../miscellaneous/system.types";

export interface MedicationCreateModel {
    AssetCode ? : string;
    Name ? : string;
    Description ? : string;
    Tags ? : string;
    Version ? : string;
}

export interface MedicationUpdateModel {
    AssetCode ? : string;
    Name ? : string;
    Description ? : string;
    Tags ? : string;
    Version ? : string;
}

export interface MedicationDto {
    id: number;
    AssetCode: string;
    Name: string;
    Description: string;
    AssetCategory: string;
    OwnerUserId: uuid;
    Tags: string[];
    Version: string;

}

export interface MedicationSearchFilters extends BaseSearchFilters {
    AssetCode ? : string;
    Name ? : string;
    Description ? : string;
    AssetCategory ? : string;
    Tags ? : string;
    Version ? : string;
}

export interface MedicationSearchResults extends BaseSearchResults {
    Items: MedicationDto[];
}