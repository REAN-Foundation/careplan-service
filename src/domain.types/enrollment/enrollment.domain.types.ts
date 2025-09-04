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
    IsTest         ?: boolean;
    TenantId       ?: uuid;
    Language       ?: string;
    ScheduleConfig ?: ScheduleConfig;
}

export interface EnrollmentUpdateModel {
    CareplanId     ?: uuid;
    ParticipantId  ?: uuid;
    StartDate      ?: Date;
    EndDate        ?: Date;
    WeekOffset     ?: number;
    DayOffset      ?: number;
    Language       ?: string;
    EnrollmentDate ?: Date;
    TenantId       ?: uuid;
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
    Language     ?: string;
    TenantId     ?: uuid;
    ProgressStatus: ProgressStatus;
    Careplan      : CareplanDto[];
    Participant   : ParticipantDto[];
}

export interface EnrollmentSearchFilters extends BaseSearchFilters {
    CareplanId     ?: uuid;
    TenantId       ?: uuid;
    CareplanName   ?: string;
    PlanCode       ?: string;
    ProgressStatus ?: ProgressStatus;
    DisplayId     ?: string;
    StartDate     ?: Date;
    EndDate       ?: Date;
    Language      ?: string;
}

export interface EnrollmentSearchResults extends BaseSearchResults {
    Items: EnrollmentDto[];
}

export interface ScheduleConfig {
    NumberOfDays: number;
    StartHour: number;
    IntervalMinutes: number;
    StartFromTomorrow: boolean;
}
