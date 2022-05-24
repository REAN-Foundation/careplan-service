import {
    BaseSearchFilters,
    BaseSearchResults
} from "../miscellaneous/base.search.types";
import {
    uuid
} from "../miscellaneous/system.types";

export interface BiometricsCreateModel {
    AssetCode       ?: string;
    Name            ?: string;
    Description     ?: string;
    BiometricsType  ?: BiometricsType;
    MeasurementUnit ?: string;
    Tags            ?: string;
    Version         ?: string;
}

export interface BiometricsUpdateModel {
    AssetCode       ?: string;
    Name            ?: string;
    Description     ?: string;
    BiometricsType  ?: BiometricsType;
    MeasurementUnit ?: string;
    Tags            ?: string;
    Version         ?: string;
}

export interface BiometricsDto {
    id             : number;
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
}

export interface BiometricsSearchResults extends BaseSearchResults {
    Items: BiometricsDto[];
}