import {
    BaseSearchFilters,
    BaseSearchResults
} from "../miscellaneous/base.search.types";
import {
    ProgressStatus,
    uuid
} from "../miscellaneous/system.types";

export interface UserSelectedGoalCreateModel {
    Name              ?: string;
    Description       ?: string;
    EnrollmentId      ?: uuid;
    ParticipantId     ?: uuid;
    CareplanId        ?: number;
    AssetId           ?: number;
    AssetType         ?: string;
    AssetCode         ?: string;
    AdditionalDetails ?: string;
    StartDate         ?: Date;
    EndDate           ?: Date;
}

export interface UserSelectedGoalUpdateModel {
    Name              ?: string;
    Description       ?: string;
    EnrollmentId      ?: uuid;
    ParticipantId     ?: uuid;
    CareplanId        ?: number;
    AdditionalDetails ?: string;
    StartDate         ?: Date;
    EndDate           ?: Date;
}

export interface UserSelectedGoalDto {
    id               : uuid;
    Name             : string;
    Description      : string;
    EnrollmentId     : uuid;
    ParticipantId    : uuid;
    CareplanId       : number;
    AssetId          : number;
    AssetType        : string;
    AssetCode        : string;
    AdditionalDetails: string;
    StartDate        : Date;
    EndDate          : Date;
    ProgressStatus   : ProgressStatus;
}

export interface UserSelectedGoalSearchFilters extends BaseSearchFilters {
    Name              ?: string;
    Description       ?: string;
    EnrollmentId      ?: uuid;
    ParticipantId     ?: uuid;
    CareplanId        ?: number;
    AssetId           ?: number;
    AssetType         ?: string;
    AssetCode         ?: string;
    AdditionalDetails ?: string;
    StartDate         ?: Date;
    EndDate           ?: Date;
    ProgressStatus    ?: ProgressStatus;
}

export interface UserSelectedGoalSearchResults extends BaseSearchResults {
    Items: UserSelectedGoalDto[];
}
