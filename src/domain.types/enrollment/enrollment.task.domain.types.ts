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
    AssetId           : uuid;
    AssetType         : AssetType;
    CareplanId        : uuid;
    IsRegistrationActivity : boolean;
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
    AssetId           : uuid;
    AssetType         : AssetType;
    Asset?            : any;
    CareplanId        : uuid;
    TimeSlot          : TimeSlot;
    ScheduledDate     : Date;
    IsRegistrationActivity : boolean,
    CreatedAt        : Date;
}

export interface EnrollmentTaskSearchFilters extends BaseSearchFilters {
    AssetId    ?: uuid;
    AssetType  ?: AssetType;
    CareplanId ?: uuid;
    TimeSlot   ?: TimeSlot;
    IsRegistrationActivity? : boolean,
    EnrollmentId? : string,
}

export interface EnrollmentTaskSearchResults extends BaseSearchResults {
    Items: EnrollmentTaskDto[];
}
