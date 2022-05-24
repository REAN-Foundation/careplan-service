import {
    BaseSearchFilters,
    BaseSearchResults
} from "../miscellaneous/base.search.types";
import {
    uuid
} from "../miscellaneous/system.types";

export interface UserSelectedActionPlanCreateModel {
    Name ? : string;
    Description ? : string;
    UserId ? : uuid;
    CareplanId ? : number;
    AdditionalDetails ? : string;
    StartDate ? : Date;
    EndDate ? : Date;
}

export interface UserSelectedActionPlanUpdateModel {
    Name ? : string;
    Description ? : string;
    UserId ? : uuid;
    CareplanId ? : number;
    AdditionalDetails ? : string;
    StartDate ? : Date;
    EndDate ? : Date;
}

export interface UserSelectedActionPlanDto {
    id: uuid;
    Name: string;
    Description: string;
    UserId: uuid;
    CareplanId: number;
    AssetId: number;
    AssetType: string;
    AdditionalDetails: string;
    StartDate: Date;
    EndDate: Date;
    ProgressStatus: ProgressStatus;

}

export interface UserSelectedActionPlanSearchFilters extends BaseSearchFilters {
    Name ? : string;
    Description ? : string;
    CareplanId ? : number;
    AssetId ? : number;
    AssetType ? : string;
    AdditionalDetails ? : string;
    StartDate ? : Date;
    EndDate ? : Date;
    ProgressStatus ? : ProgressStatus;
}

export interface UserSelectedActionPlanSearchResults extends BaseSearchResults {
    Items: UserSelectedActionPlanDto[];
}