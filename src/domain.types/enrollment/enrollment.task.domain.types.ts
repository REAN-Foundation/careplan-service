import { AssetType, TimeSlot } from "../assets/asset.types";
import {
    BaseSearchFilters,
    BaseSearchResults
} from "../miscellaneous/base.search.types";
import {
    uuid
} from "../miscellaneous/system.types";

export enum Status {
    Pending    = 'Pending',
    InProgress = 'In-progress',
    Completed  = 'Completed',
    Cancelled  = 'Cancelled',
    Delayed    = 'Delayed',
    Unknown    = 'Unknown',
}

export const StatusList: Status[] = [
    Status.Pending,
    Status.InProgress,
    Status.Completed,
    Status.Cancelled,
    Status.Delayed,
    Status.Unknown,
];

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
    Status?           : Status;
    CompletedAt?      : Date;
}

export interface EnrollmentTaskUpdateModel {
    AssetId?              : uuid;
    AssetType?           : AssetType;
    TimeSlot?            : TimeSlot;
    ScheduledDate?       : Date;
    IsRegistrationActivity? : boolean;
    Status?              : Status;
    CompletedAt?         : Date | null;
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
    Status            : Status;
    CompletedAt       : Date | null;
    CreatedAt        : Date;
}

export interface EnrollmentTaskSearchFilters extends BaseSearchFilters {
    AssetId    ?: uuid;
    AssetType  ?: AssetType;
    CareplanId ?: uuid;
    TimeSlot   ?: TimeSlot;
    IsRegistrationActivity? : boolean,
    EnrollmentId? : string,
    ScheduledDate?: Date;
}

export interface EnrollmentTaskSearchResults extends BaseSearchResults {
    Items: EnrollmentTaskDto[];
}
