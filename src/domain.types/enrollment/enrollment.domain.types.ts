import {
    BaseSearchFilters,
    BaseSearchResults
} from "../miscellaneous/base.search.types";
import {
    ProgressStatus,
    uuid
} from "../miscellaneous/system.types";

export interface EnrollmentCreateModel {
    CareplanId     ?: number;
    ParticipantId  ?: uuid;
    StartDate      ?: Date;
    EndDate        ?: Date;
    WeekOffset     ?: number;
    DayOffset      ?: number;
    EnrollmentDate ?: Date;
}

export interface EnrollmentUpdateModel {
    CareplanId     ?: number;
    ParticipantId  ?: uuid;
    StartDate      ?: Date;
    EndDate        ?: Date;
    WeekOffset     ?: number;
    DayOffset      ?: number;
    EnrollmentDate ?: Date;
}

export interface EnrollmentDto {
    id            : uuid;
    CareplanId    : number;
    ParticipantId : uuid;
    StartDate     : Date;
    EndDate       : Date;
    EnrollmentDate: Date;
    WeekOffset   ?: number;
    DayOffset    ?: number;
    ProgressStatus: ProgressStatus;
}

export interface EnrollmentSearchFilters extends BaseSearchFilters {
    CareplanId     ?: number;
    ProgressStatus ?: ProgressStatus;
}

export interface EnrollmentSearchResults extends BaseSearchResults {
    Items: EnrollmentDto[];
}
