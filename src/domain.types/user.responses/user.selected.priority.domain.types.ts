import {
    BaseSearchFilters,
    BaseSearchResults
} from "../miscellaneous/base.search.types";
import {
    uuid
} from "../miscellaneous/system.types";

export interface UserSelectedPriorityCreateModel {
    Name ? : string;
    Description ? : string;
    UserId ? : uuid;
    CareplanId ? : number;
    StartDate ? : Date;
}

export interface UserSelectedPriorityUpdateModel {
    Name ? : string;
    Description ? : string;
    UserId ? : uuid;
    CareplanId ? : number;
    StartDate ? : Date;
}

export interface UserSelectedPriorityDto {
    id: uuid;
    Name: string;
    Description: string;
    UserId: uuid;
    CareplanId: number;
    AssetId: number;
    AssetType: string;
    StartDate: Date;

}

export interface UserSelectedPrioritySearchFilters extends BaseSearchFilters {
    Name ? : string;
    Description ? : string;
    CareplanId ? : number;
    AssetId ? : number;
    AssetType ? : string;
    StartDate ? : Date;
}

export interface UserSelectedPrioritySearchResults extends BaseSearchResults {
    Items: UserSelectedPriorityDto[];
}