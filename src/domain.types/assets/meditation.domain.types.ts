import {
    BaseSearchFilters,
    BaseSearchResults
} from "../miscellaneous/base.search.types";
import {
    uuid
} from "../miscellaneous/system.types";

export enum MeditationType {
    Mindfulness           = "Mindfulness",
    Spiritual             = "Spiritual",
    Focused               = "Focused",
    Mantra                = "Mantra",
    ProgressiveRelaxation = "Progressive relaxation",
    Transcendental        = "Transcendental",
    Visualization         = "Visualization"
}

export const MeditationTypeList: MeditationType[] = [
    MeditationType.Mindfulness,
    MeditationType.Spiritual,
    MeditationType.Focused,
    MeditationType.Mantra,
    MeditationType.ProgressiveRelaxation,
    MeditationType.Transcendental,
    MeditationType.Visualization,
];

export interface MeditationCreateModel {
    AssetCode              ?: string;
    Name                   ?: string;
    Description            ?: string;
    MeditationType         ?: MeditationType;
    RecommendedDurationMin ?: number;
    Tags                   ?: string;
    Version                ?: string;
    OwnerUserId            ?: uuid;
    TenantId               ?: uuid;
    TenantCode             ?: string;

}

export interface MeditationUpdateModel {
    AssetCode              ?: string;
    Name                   ?: string;
    Description            ?: string;
    MeditationType         ?: MeditationType;
    RecommendedDurationMin ?: number;
    Tags                   ?: string;
    Version                ?: string;
    OwnerUserId            ?: uuid;
    TenantId               ?: uuid;
    TenantCode             ?: string;
}

export interface MeditationDto {
    id                    : uuid;
    AssetCode             : string;
    Name                  : string;
    Description           : string;
    MeditationType        : MeditationType;
    RecommendedDurationMin: number;
    AssetCategory         : string;
    OwnerUserId           : uuid;
    TenantId              : uuid;
    TenantCode            ?: string;
    Tags                  : string[];
    Version               : string;

}

export interface MeditationSearchFilters extends BaseSearchFilters {
    AssetCode              ?: string;
    Name                   ?: string;
    Description            ?: string;
    MeditationType         ?: MeditationType;
    RecommendedDurationMin ?: number;
    AssetCategory          ?: string;
    Tags                   ?: string;
    Version                ?: string;
    TenantId               ?: uuid;
    TenantCode             ?: string;
    CreatedAt              ?: Date;
}

export interface MeditationSearchResults extends BaseSearchResults {
    Items: MeditationDto[];
}
