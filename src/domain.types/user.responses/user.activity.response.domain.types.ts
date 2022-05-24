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
    UserId               ?: uuid;
    EnrollmentScheduleId ?: uuid;
    Response             ?: string;
}

export interface UserActivityResponseUpdateModel {
    UserId               ?: uuid;
    EnrollmentScheduleId ?: uuid;
    Response             ?: string;
}

export interface UserActivityResponseDto {
    id                  : uuid;
    UserId              : uuid;
    EnrollmentScheduleId: uuid;
    CareplanScheduleId  : uuid;
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
