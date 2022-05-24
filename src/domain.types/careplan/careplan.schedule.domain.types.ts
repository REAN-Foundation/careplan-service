import {
    BaseSearchFilters,
    BaseSearchResults
} from "../miscellaneous/base.search.types";
import {
    uuid
} from "../miscellaneous/system.types";

export interface CareplanScheduleCreateModel {
    AssetId ? : number;
    AssetType ? : AssetType;
    CareplanId ? : number;
    Day ? : number;
    TimeSlot ? : TimeSlot;
}

export interface CareplanScheduleUpdateModel {
    AssetId ? : number;
    AssetType ? : AssetType;
    CareplanId ? : number;
    Day ? : number;
    TimeSlot ? : TimeSlot;
}

export interface CareplanScheduleDto {
    id: uuid;
    AssetId: number;
    AssetType: AssetType;
    CareplanId: number;
    Day: number;
    TimeSlot: TimeSlot;

}

export interface CareplanScheduleSearchFilters extends BaseSearchFilters {
    AssetId ? : number;
    AssetType ? : AssetType;
    CareplanId ? : number;
    Day ? : number;
    TimeSlot ? : TimeSlot;
}

export interface CareplanScheduleSearchResults extends BaseSearchResults {
    Items: CareplanScheduleDto[];
}