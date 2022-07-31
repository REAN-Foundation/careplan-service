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
    AssetId           : number;
    AssetType         : AssetType;
    Asset?            : any;
    CareplanId        : number;
    TimeSlot          : TimeSlot;
    ScheduledDate     : Date;
    IsRegistrationActivity : boolean,
}

export interface EnrollmentTaskSearchFilters extends BaseSearchFilters {
    AssetId    ?: number;
    AssetType  ?: AssetType;
    CareplanId ?: number;
    TimeSlot   ?: TimeSlot;
    IsRegistrationActivity? : boolean,
}

export interface EnrollmentTaskSearchResults extends BaseSearchResults {
    Items: EnrollmentTaskDto[];
}
