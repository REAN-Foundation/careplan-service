import {
    BaseSearchFilters,
    BaseSearchResults
} from "../miscellaneous/base.search.types";
import {
    ProgressStatus,
    uuid
} from "../miscellaneous/system.types";

export interface ParticipantSelectedActionPlanCreateModel {
    Name              ?: string;
    Description       ?: string;
    EnrollmentId      ?: uuid;
    ParticipantId     ?: uuid;
    SelectedGoalId    ?: uuid;
    CareplanId        ?: uuid;
    AssetId           ?: uuid;
    AssetType         ?: string;
    AssetCode         ?: string;
    AdditionalDetails ?: string;
    StartDate         ?: Date;
    EndDate           ?: Date;
}

export interface ParticipantSelectedActionPlanUpdateModel {
    Name              ?: string;
    Description       ?: string;
    EnrollmentId      ?: uuid;
    ParticipantId     ?: uuid;
    SelectedGoalId    ?: uuid;
    CareplanId        ?: uuid;
    AssetId           ?: uuid;
    AssetType         ?: string;
    AssetCode         ?: string;
    AdditionalDetails ?: string;
    StartDate         ?: Date;
    EndDate           ?: Date;
}

export interface ParticipantSelectedActionPlanDto {
    id               : uuid;
    Name             : string;
    Description      : string;
    EnrollmentId     : uuid;
    ParticipantId    : uuid;
    SelectedGoalId   : uuid;
    CareplanId       : uuid;
    AssetId          : uuid;
    AssetType        : string;
    AssetCode        : string;
    AdditionalDetails: string;
    StartDate        : Date;
    EndDate          : Date;
    ProgressStatus   : ProgressStatus;

}

export interface ParticipantSelectedActionPlanSearchFilters extends BaseSearchFilters {
    Name              ?: string;
    Description       ?: string;
    EnrollmentId      ?: uuid;
    ParticipantId     ?: uuid;
    SelectedGoalId    ?: uuid;
    CareplanId        ?: uuid;
    AssetId           ?: uuid;
    AssetType         ?: string;
    AssetCode         ?: string;
    AdditionalDetails ?: string;
    StartDate         ?: Date;
    EndDate           ?: Date;
    ProgressStatus    ?: ProgressStatus;
}

export interface ParticipantSelectedActionPlanSearchResults extends BaseSearchResults {
    Items: ParticipantSelectedActionPlanDto[];
}
