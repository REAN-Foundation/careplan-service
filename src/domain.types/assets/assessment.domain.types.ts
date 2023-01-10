import {
    BaseSearchFilters,
    BaseSearchResults
} from "../miscellaneous/base.search.types";
import {
    uuid
} from "../miscellaneous/system.types";

export interface AssessmentCreateModel {
    AssetCode ? : string;
    Name ? : string;
    Description ? : string;
    Template ? : string;
    Tags ? : string;
    Version ? : string;
    OwnerUserId?: uuid;
}

export interface AssessmentUpdateModel {
    AssetCode ? : string;
    Name ? : string;
    Description ? : string;
    Template ? : string;
    Tags ? : string;
    Version ? : string;
    OwnerUserId?: uuid;
}

export interface AssessmentDto {
    id: uuid;
    AssetCode: string;
    Name: string;
    Description: string;
    AssetCategory: string;
    Template: string;
    OwnerUserId: uuid;
    Tags: string[];
    Version: string;

}

export interface AssessmentSearchFilters extends BaseSearchFilters {
    AssetCode ? : string;
    Name ? : string;
    Description ? : string;
    AssetCategory ? : string;
    Template ? : string;
    Tags ? : string;
    Version ? : string;
    CreatedAt ? : Date;
}

export interface AssessmentSearchResults extends BaseSearchResults {
    Items: AssessmentDto[];
}
