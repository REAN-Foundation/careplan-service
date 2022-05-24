import {
    BaseSearchFilters,
    BaseSearchResults
} from "../miscellaneous/base.search.types";
import {
    uuid
} from "../miscellaneous/system.types";

export enum AppointmentType {
    Doctor        = "Doctor",
    Lab           = "Lab",
    Physiotherapy = "Physiotherapy",
    Other         = "Other"
}

export const AppointmentTypeList: AppointmentType[] = [
    AppointmentType.Doctor,
    AppointmentType.Lab,
    AppointmentType.Physiotherapy,
    AppointmentType.Other,
];

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
