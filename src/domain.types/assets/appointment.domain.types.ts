import {
    BaseSearchFilters,
    BaseSearchResults
} from "../miscellaneous/base.search.types";
import {
    uuid
} from "../miscellaneous/system.types";

export interface AppointmentCreateModel {
    AssetCode       ?: string;
    Name            ?: string;
    Description     ?: string;
    AppointmentType ?: AppointmentType;
    Tags            ?: string;
    Version         ?: string;
}

export interface AppointmentUpdateModel {
    AssetCode ? : string;
    Name ? : string;
    Description ? : string;
    AppointmentType ? : AppointmentType;
    Tags ? : string;
    Version ? : string;
}

export interface AppointmentDto {
    id: number;
    AssetCode: string;
    Name: string;
    Description: string;
    AppointmentType: AppointmentType;
    AssetCategory: string;
    OwnerUserId: uuid;
    Tags: string[];
    Version: string;

}

export interface AppointmentSearchFilters extends BaseSearchFilters {
    AssetCode ? : string;
    Name ? : string;
    Description ? : string;
    AppointmentType ? : AppointmentType;
    AssetCategory ? : string;
    Tags ? : string;
    Version ? : string;
}

export interface AppointmentSearchResults extends BaseSearchResults {
    Items: AppointmentDto[];
}