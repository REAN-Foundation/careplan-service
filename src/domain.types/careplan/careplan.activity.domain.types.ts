import { AssetType, TimeSlot } from "../assets/asset.types";
import {
    BaseSearchFilters,
    BaseSearchResults
} from "../miscellaneous/base.search.types";
import { uuid } from "../miscellaneous/system.types";
import { CareplanDto } from "./careplan.domain.types";

export interface CareplanActivityCreateModel {
    AssetId?              : uuid;
    AssetType?            : AssetType;
    CareplanId?           : uuid;
    Day?                  : number;
    TimeSlot?             : TimeSlot;
    IsRegistrationActivity: boolean;
    Sequence?             : number;
}

export interface CareplanActivityUpdateModel {
    AssetId?               : uuid;
    AssetType?             : AssetType;
    CareplanId?            : uuid;
    Day?                   : number;
    TimeSlot?              : TimeSlot;
    IsRegistrationActivity?: boolean;
    Sequence?              : number;
}

export interface CareplanActivityDto {
    id                    : uuid;
    AssetId               : uuid;
    AssetType             : AssetType;
    CareplanId            : uuid;
    Day                   : number;
    TimeSlot              : TimeSlot;
    IsRegistrationActivity: boolean;
    Sequence              : number;
    Code                  : CareplanDto[];
}

export interface CareplanActivitySearchFilters extends BaseSearchFilters {
    AssetId?               : uuid;
    AssetType?             : AssetType;
    CareplanId?            : uuid;
    Day?                   : number;
    TimeSlot?              : TimeSlot;
    IsRegistrationActivity?: boolean;
    Sequence?              : number;
}

export interface CareplanActivitySearchResults extends BaseSearchResults {
    Items: CareplanActivityDto[];
}
