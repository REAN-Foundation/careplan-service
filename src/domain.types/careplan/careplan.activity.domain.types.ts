import { AssetType, TimeSlot } from "../assets/asset.types";
import {
    BaseSearchFilters,
    BaseSearchResults
} from "../miscellaneous/base.search.types";
import { uuid } from "../miscellaneous/system.types";

export interface CareplanActivityCreateModel {
    AssetId?   : number;
    AssetType? : AssetType;
    CareplanId?: number;
    Day?       : number;
    TimeSlot?  : TimeSlot;
}

export interface CareplanActivityUpdateModel {
    AssetId?   : number;
    AssetType? : AssetType;
    CareplanId?: number;
    Day?       : number;
    TimeSlot?  : TimeSlot;
}

export interface CareplanActivityDto {
    id        : uuid;
    AssetId   : number;
    AssetType : AssetType;
    CareplanId: number;
    Day       : number;
    TimeSlot  : TimeSlot;

}

export interface CareplanActivitySearchFilters extends BaseSearchFilters {
    AssetId?   : number;
    AssetType? : AssetType;
    CareplanId?: number;
    Day?       : number;
    TimeSlot?  : TimeSlot;
}

export interface CareplanActivitySearchResults extends BaseSearchResults {
    Items: CareplanActivityDto[];
}
