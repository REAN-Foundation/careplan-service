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
    UserId         ?: uuid;
    StartDate      ?: Date;
    EndDate        ?: Date;
    EnrollmentDate ?: Date;
}

export interface EnrollmentUpdateModel {
    CareplanId     ?: number;
    UserId         ?: uuid;
    StartDate      ?: Date;
    EndDate        ?: Date;
    EnrollmentDate ?: Date;
}

export interface EnrollmentDto {
    id            : uuid;
    CareplanId    : number;
    UserId        : uuid;
    StartDate     : Date;
    EndDate       : Date;
    EnrollmentDate: Date;
    ProgressStatus: ProgressStatus;
}

export interface EnrollmentSearchFilters extends BaseSearchFilters {
    CareplanId     ?: number;
    ProgressStatus ?: ProgressStatus;
}

export interface EnrollmentSearchResults extends BaseSearchResults {
    Items: EnrollmentDto[];
}
