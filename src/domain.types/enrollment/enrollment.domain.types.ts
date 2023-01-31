import { CareplanDto } from "../careplan/careplan.domain.types";
import {
    BaseSearchFilters,
    BaseSearchResults
} from "../miscellaneous/base.search.types";
import {
    ProgressStatus,
    uuid
} from "../miscellaneous/system.types";
import { ParticipantDto } from "./participant.domain.types";

export interface EnrollmentCreateModel {
    CareplanId     ?: uuid;
    PlanCode       ?: string;
    ParticipantId  ?: uuid;
    StartDate      ?: Date;
    EndDate        ?: Date;
    WeekOffset     ?: number;
    DayOffset      ?: number;
    EnrollmentDate ?: Date;
}

export interface EnrollmentUpdateModel {
    CareplanId     ?: uuid;
    ParticipantId  ?: uuid;
    StartDate      ?: Date;
    EndDate        ?: Date;
    WeekOffset     ?: number;
    DayOffset      ?: number;
    EnrollmentDate ?: Date;
}

export interface EnrollmentDto {
    id            : uuid;
    CareplanId    : uuid;
    CareplanName? : string;
    PlanCode?     : string;
    ParticipantId : uuid;
    DisplayId     : string;
    StartDate     : Date;
    EndDate       : Date;
    EnrollmentDate: Date;
    WeekOffset   ?: number;
    DayOffset    ?: number;
    ProgressStatus: ProgressStatus;
    Careplan      : CareplanDto[];
    Participant   : ParticipantDto[];
}

export interface EnrollmentSearchFilters extends BaseSearchFilters {
    CareplanId     ?: uuid;
    CareplanName   ?: string;
    PlanCode       ?: string;
    ProgressStatus ?: ProgressStatus;
    DisplayId     ?: string;
    StartDate     ?: Date;
    EndDate       ?: Date;
}

export interface EnrollmentSearchResults extends BaseSearchResults {
    Items: EnrollmentDto[];
}
