
import { BaseSearchFilters, BaseSearchResults } from "../miscellaneous/base.search.types";
import { Gender, uuid } from "../miscellaneous/system.types";

export interface UserCreateModel {
    RoleId     : number;
    UserName   : string;
    Prefix     : string;
    FirstName  : string;
    LastName   : string;
    CountryCode: string;
    Phone      : string;
    Email      : string;
    Gender     : Gender;
    BirthDate  : Date;
    Password   : string;
}

export interface UserUpdateModel {
    UserName?   : string;
    Prefix?     : string;
    FirstName?  : string;
    LastName?   : string;
    CountryCode?: string;
    Phone?      : string;
    Email?      : string;
    Gender?     : Gender;
    BirthDate?  : Date;
}

export interface UserDto {
    id         : uuid;
    UserName   : string;
    Prefix     : string;
    FirstName  : string;
    LastName   : string;
    CountryCode: string;
    Phone      : string;
    Email      : string;
    Gender     : Gender;
    BirthDate  : Date;
}

export interface UserSearchFilters extends BaseSearchFilters {
    FirstName?: string;
    LastName? : string;
    Phone?    : string;
    Email?    : string;
}

export interface UserSearchResults extends BaseSearchResults {
    Items: UserDto[];
}
