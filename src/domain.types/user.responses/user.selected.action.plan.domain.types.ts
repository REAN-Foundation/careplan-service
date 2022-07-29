import {
    BaseSearchFilters,
    BaseSearchResults
} from "../miscellaneous/base.search.types";
import {
    ProgressStatus,
    uuid
} from "../miscellaneous/system.types";

export interface UserSelectedActionPlanCreateModel {
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

export interface UserSelectedActionPlanUpdateModel {
    Name              ?: string;
    Description       ?: string;
    EnrollmentId      ?: uuid;
    ParticipantId     ?: uuid;
    CareplanId        ?: number;
    AdditionalDetails ?: string;
    StartDate         ?: Date;
    EndDate           ?: Date;
}

export interface UserSelectedActionPlanDto {
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

export interface UserSelectedActionPlanSearchFilters extends BaseSearchFilters {
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

export interface UserSelectedActionPlanSearchResults extends BaseSearchResults {
    Items: UserSelectedActionPlanDto[];
}
