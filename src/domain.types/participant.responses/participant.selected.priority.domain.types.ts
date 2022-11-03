import {
    BaseSearchFilters,
    BaseSearchResults
} from "../miscellaneous/base.search.types";
import {
    uuid
} from "../miscellaneous/system.types";

export interface ParticipantSelectedPriorityCreateModel {
    Name          ?: string;
    Description   ?: string;
    EnrollmentId  ?: uuid;
    ParticipantId ?: uuid;
    CareplanId    ?: uuid;
    AssetId       ?: uuid;
    AssetType     ?: string;
    AssetCode     ?: string;
    StartDate     ?: Date;
}

export interface ParticipantSelectedPriorityUpdateModel {
    Name          ?: string;
    Description   ?: string;
    EnrollmentId  ?: uuid;
    ParticipantId ?: uuid;
    CareplanId    ?: uuid;
    AssetId       ?: uuid;
    AssetType     ?: string;
    AssetCode     ?: string;
    StartDate     ?: Date;
}

export interface ParticipantSelectedPriorityDto {
    id            : uuid;
    Name          : string;
    Description   : string;
    EnrollmentId  : uuid;
    ParticipantId : uuid;
    CareplanId    : uuid;
    AssetId       : uuid;
    AssetType     : string;
    AssetCode     : string;
    StartDate     : Date;

}

export interface ParticipantSelectedPrioritySearchFilters extends BaseSearchFilters {
    Name          ?: string;
    Description   ?: string;
    EnrollmentId  ?: uuid;
    ParticipantId ?: uuid;
    CareplanId    ?: uuid;
    AssetId       ?: uuid;
    AssetType     ?: string;
    AssetCode     ?: string;
    StartDate     ?: Date;
}

export interface ParticipantSelectedPrioritySearchResults extends BaseSearchResults {
    Items: ParticipantSelectedPriorityDto[];
}
