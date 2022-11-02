import {
    BaseSearchFilters,
    BaseSearchResults
} from "../miscellaneous/base.search.types";
import {
    ProgressStatus,
    uuid
} from "../miscellaneous/system.types";

export interface ParticipantSelectedGoalCreateModel {
    Name               ?: string;
    Description        ?: string;
    EnrollmentId       ?: uuid;
    ParticipantId      ?: uuid;
    SelectedPriorityId ?: uuid;
    CareplanId         ?: uuid;
    AssetId            ?: uuid;
    AssetType          ?: string;
    AssetCode          ?: string;
    AdditionalDetails  ?: string;
    StartDate          ?: Date;
    EndDate            ?: Date;
}

export interface ParticipantSelectedGoalUpdateModel {
    Name               ?: string;
    Description        ?: string;
    EnrollmentId       ?: uuid;
    ParticipantId      ?: uuid;
    SelectedPriorityId ?: uuid;
    CareplanId         ?: uuid;
    AssetId            ?: uuid;
    AssetType          ?: string;
    AssetCode          ?: string;
    AdditionalDetails  ?: string;
    StartDate          ?: Date;
    EndDate            ?: Date;
}

export interface ParticipantSelectedGoalDto {
    id                 : uuid;
    Name               : string;
    Description        : string;
    EnrollmentId       : uuid;
    ParticipantId      : uuid;
    SelectedPriorityId : uuid;
    CareplanId         : uuid;
    AssetId            : uuid;
    AssetType          : string;
    AssetCode          : string;
    AdditionalDetails  : string;
    StartDate          : Date;
    EndDate            : Date;
    ProgressStatus     : ProgressStatus;
}

export interface ParticipantSelectedGoalSearchFilters extends BaseSearchFilters {
    Name               ?: string;
    Description        ?: string;
    EnrollmentId       ?: uuid;
    ParticipantId      ?: uuid;
    SelectedPriorityId ?: uuid;
    CareplanId         ?: uuid;
    AssetId            ?: uuid;
    AssetType          ?: string;
    AssetCode          ?: string;
    AdditionalDetails  ?: string;
    StartDate          ?: Date;
    EndDate            ?: Date;
    ProgressStatus     ?: ProgressStatus;
}

export interface ParticipantSelectedGoalSearchResults extends BaseSearchResults {
    Items: ParticipantSelectedGoalDto[];
}
