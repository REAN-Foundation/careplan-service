import { AssetType, TimeSlot } from "../assets/asset.types";
import {
    BaseSearchFilters,
    BaseSearchResults
} from "../miscellaneous/base.search.types";
import {
    uuid
} from "../miscellaneous/system.types";

export interface EnrollmentTaskCreateModel {
    EnrollmentId      : uuid;
    ParticipantId     : uuid;
    CareplanActivityId: uuid;
    AssetId           : number;
    AssetType         : AssetType;
    CareplanId        : number;
    TimeSlot          : TimeSlot;
    ScheduledDate     : Date;
}

export interface EnrollmentTaskUpdateModel {
    AssetType ?: AssetType;
}

export interface EnrollmentTaskDto {
    id                : uuid;
    EnrollmentId      : uuid;
    ParticipantId     : uuid;
    CareplanActivityId: uuid;
    AssetId           : number;
    AssetType         : AssetType;
    CareplanId        : number;
    TimeSlot          : TimeSlot;
    ScheduledDate     : Date;
}

export interface EnrollmentTaskSearchFilters extends BaseSearchFilters {
    AssetId    ?: number;
    AssetType  ?: AssetType;
    CareplanId ?: number;
    TimeSlot   ?: TimeSlot;
}

export interface EnrollmentTaskSearchResults extends BaseSearchResults {
    Items: EnrollmentTaskDto[];
}
