import { AssetType } from "../assets/asset.types";
import {
    BaseSearchFilters,
    BaseSearchResults
} from "../miscellaneous/base.search.types";
import {
    ProgressStatus,
    uuid
} from "../miscellaneous/system.types";

export interface UserActivityResponseCreateModel {
    ParticipantId       : uuid;
    EnrollmentTaskId: uuid;
    CareplanActivityId  : uuid;
    CareplanId          : number;
    AssetId             : number;
    AssetType           : AssetType;
    Response            : string;
    TimeResponded       : Date;
    ProgressStatus      : ProgressStatus;
}

export interface UserActivityResponseUpdateModel {
    ParticipantId        ?: uuid;
    EnrollmentTaskId ?: uuid;
    Response             ?: string;
    ProgressStatus       ?: ProgressStatus;
}

export interface UserActivityResponseDto {
    id                  : uuid;
    ParticipantId       : uuid;
    EnrollmentTaskId: uuid;
    CareplanActivityId  : uuid;
    CareplanId          : number;
    AssetId             : number;
    AssetType           : AssetType;
    Response            : string;
    TimeResponded       : Date;
    ProgressStatus      : ProgressStatus;

}

export interface UserActivityResponseSearchFilters extends BaseSearchFilters {
    CareplanId     ?: number;
    AssetId        ?: number;
    AssetType      ?: AssetType;
    Response       ?: string;
    TimeResponded  ?: Date;
    ProgressStatus ?: ProgressStatus;
}

export interface UserActivityResponseSearchResults extends BaseSearchResults {
    Items: UserActivityResponseDto[];
}
