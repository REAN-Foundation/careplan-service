import { BaseSearchFilters, BaseSearchResults } from "../miscellaneous/base.search.types";
import { Gender, uuid } from "../miscellaneous/system.types";

export interface ParticipantModel {
    Prefix     : string;
    FirstName  : string;
    LastName   : string;
    CountryCode: string;
    Phone      : string;
    Email      : string;
    SystemId?  : string;
    Gender     : Gender;
    BirthDate  : Date;
    Country?   : string;
}

export interface ParticipantDto {
    id         : uuid;
    Prefix     : string;
    FirstName  : string;
    LastName   : string;
    CountryCode: string;
    Phone      : string;
    Email      : string;
    SystemId   : string;
    Gender     : Gender;
    BirthDate  : Date;
    Country    : string;
}

export interface ParticipantSearchFilters extends BaseSearchFilters {
    FirstName?: string;
    LastName? : string;
    Phone?    : string;
    Email?    : string;
    SystemId? : string;
}

export interface ParticipantSearchResults extends BaseSearchResults {
    Items: ParticipantDto[];
}
