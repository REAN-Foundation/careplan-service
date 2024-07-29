import {
    BaseSearchFilters,
    BaseSearchResults
} from "../miscellaneous/base.search.types";
import {
    uuid
} from "../miscellaneous/system.types";

export enum BiometricsType {
    BloodPressure         = "Blood pressure",
    BloodGlucose          = "Blood glucose",
    BloodOxygenSaturation = "Blood oxygen saturation",
    BodyHeight            = "Body height",
    BodyWeight            = "Body weight",
    BodyTemperature       = "Body temperature",
    Pulse                 = "Pulse",
    Other                 = "Other"
}

export const BiometricsTypeList: BiometricsType[] = [
    BiometricsType.BloodPressure,
    BiometricsType.BloodGlucose,
    BiometricsType.BloodOxygenSaturation,
    BiometricsType.BodyHeight,
    BiometricsType.BodyWeight,
    BiometricsType.BodyTemperature,
    BiometricsType.Pulse,
    BiometricsType.Other,
];

export interface BiometricsCreateModel {
    AssetCode       ?: string;
    Name            ?: string;
    Description     ?: string;
    BiometricsType  ?: BiometricsType;
    MeasurementUnit ?: string;
    Tags            ?: string;
    Version         ?: string;
    OwnerUserId?: uuid;
}

export interface BiometricsUpdateModel {
    AssetCode       ?: string;
    Name            ?: string;
    Description     ?: string;
    BiometricsType  ?: BiometricsType;
    MeasurementUnit ?: string;
    Tags            ?: string;
    Version         ?: string;
    OwnerUserId?: uuid;
}

export interface BiometricsDto {
    id             : uuid;
    AssetCode      : string;
    Name           : string;
    Description    : string;
    AssetCategory  : string;
    BiometricsType : BiometricsType;
    MeasurementUnit: string;
    OwnerUserId    : uuid;
    Tags           : string[];
    Version        : string;

}

export interface BiometricsSearchFilters extends BaseSearchFilters {
    AssetCode       ?: string;
    Name            ?: string;
    Description     ?: string;
    AssetCategory   ?: string;
    BiometricsType  ?: BiometricsType;
    MeasurementUnit ?: string;
    Tags            ?: string;
    Version         ?: string;
    CreatedAt       ?: Date;
}

export interface BiometricsSearchResults extends BaseSearchResults {
    Items: BiometricsDto[];
}
