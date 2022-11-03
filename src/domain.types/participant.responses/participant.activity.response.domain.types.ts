import { AssetType } from "../assets/asset.types";
import {
    BaseSearchFilters,
    BaseSearchResults
} from "../miscellaneous/base.search.types";
import {
    ProgressStatus,
    uuid
} from "../miscellaneous/system.types";

export interface ParticipantActivityResponseCreateModel {
    ParticipantId       : uuid;
    EnrollmentTaskId    : uuid;
    CareplanActivityId  : uuid;
    CareplanId          : uuid;
    AssetId             : uuid;
    AssetType           : AssetType;
    Response            : string;
    TimeResponded       : Date;
    ProgressStatus      : ProgressStatus;
}

export interface ParticipantActivityResponseUpdateModel {
    ParticipantId        ?: uuid;
    EnrollmentTaskId     ?: uuid;
    Response             ?: string;
    ProgressStatus       ?: ProgressStatus;
}

export interface ParticipantActivityResponseDto {
    id                  : uuid;
    ParticipantId       : uuid;
    EnrollmentTaskId    : uuid;
    CareplanActivityId  : uuid;
    CareplanId          : uuid;
    AssetId             : uuid;
    AssetType           : AssetType;
    Response            : string;
    TimeResponded       : Date;
    ProgressStatus      : ProgressStatus;

}

export interface ParticipantActivityResponseSearchFilters extends BaseSearchFilters {
    CareplanId     ?: uuid;
    AssetId        ?: uuid;
    AssetType      ?: AssetType;
    Response       ?: string;
    TimeResponded  ?: Date;
    ProgressStatus ?: ProgressStatus;
}

export interface ParticipantActivityResponseSearchResults extends BaseSearchResults {
    Items: ParticipantActivityResponseDto[];
}
