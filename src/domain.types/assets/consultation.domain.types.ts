import {
    BaseSearchFilters,
    BaseSearchResults
} from "../miscellaneous/base.search.types";
import {
    uuid
} from "../miscellaneous/system.types";

export interface ConsultationCreateModel {
    AssetCode ? : string;
    Name ? : string;
    Description ? : string;
    ConsultationType ? : ConsultationType;
    Tags ? : string;
    Version ? : string;
}

export interface ConsultationUpdateModel {
    AssetCode ? : string;
    Name ? : string;
    Description ? : string;
    ConsultationType ? : ConsultationType;
    Tags ? : string;
    Version ? : string;
}

export interface ConsultationDto {
    id: number;
    AssetCode: string;
    Name: string;
    Description: string;
    ConsultationType: ConsultationType;
    AssetCategory: string;
    OwnerUserId: uuid;
    Tags: string[];
    Version: string;

}

export interface ConsultationSearchFilters extends BaseSearchFilters {
    AssetCode ? : string;
    Name ? : string;
    Description ? : string;
    ConsultationType ? : ConsultationType;
    AssetCategory ? : string;
    Tags ? : string;
    Version ? : string;
}

export interface ConsultationSearchResults extends BaseSearchResults {
    Items: ConsultationDto[];
}