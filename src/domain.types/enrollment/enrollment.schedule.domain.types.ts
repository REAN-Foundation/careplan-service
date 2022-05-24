import {
    BaseSearchFilters,
    BaseSearchResults
} from "../miscellaneous/base.search.types";
import {
    uuid
} from "../miscellaneous/system.types";

export interface EnrollmentScheduleCreateModel {
    AssetType ? : AssetType;
}

export interface EnrollmentScheduleUpdateModel {
    AssetType ? : AssetType;
}

export interface EnrollmentScheduleDto {
    id: uuid;
    EnrollmentId: uuid;
    UserId: uuid;
    CareplanScheduleId: uuid;
    AssetId: number;
    AssetType: AssetType;
    CareplanId: number;
    TimeSlot: TimeSlot;
    ScheduledDate: Date;

}

export interface EnrollmentScheduleSearchFilters extends BaseSearchFilters {
    AssetId ? : number;
    AssetType ? : AssetType;
    CareplanId ? : number;
    TimeSlot ? : TimeSlot;
}

export interface EnrollmentScheduleSearchResults extends BaseSearchResults {
    Items: EnrollmentScheduleDto[];
}