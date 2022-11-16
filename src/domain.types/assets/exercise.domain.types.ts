import {
    BaseSearchFilters,
    BaseSearchResults
} from "../miscellaneous/base.search.types";
import { uuid } from "../miscellaneous/system.types";

export enum ExerciseType {
    Strength    = "Strength",
    Aerobic     = "Aerobic",
    Balance     = "Balance",
    Reflexes    = "Reflexes",
    Flexibility = "Flexibility"
}

export const ExerciseTypeList: ExerciseType[] = [
    ExerciseType.Strength,
    ExerciseType.Aerobic,
    ExerciseType.Balance,
    ExerciseType.Reflexes,
    ExerciseType.Flexibility
];

export enum IntensityLevel {
    None          = "None",
    Minimal       = "Minimal",
    Moderate      = "Moderate",
    SomewhatHard  = "Somewhat hard",
    Hard          = "Hard",
    Harder        = "Harder",
    VeryHard      = "Very hard",
    ExtremelyHard = "Extremely hard",
    MaximumEffort = "Maximum effort"
}

export const IntensityLevelList: IntensityLevel[] = [
    IntensityLevel.None,
    IntensityLevel.Minimal,
    IntensityLevel.Moderate,
    IntensityLevel.SomewhatHard,
    IntensityLevel.Hard,
    IntensityLevel.Harder,
    IntensityLevel.VeryHard,
    IntensityLevel.ExtremelyHard,
    IntensityLevel.MaximumEffort,
];

export interface ExerciseCreateModel {
    AssetCode?             : string;
    Name?                  : string;
    Description?           : string;
    ExerciseType?          : ExerciseType;
    IntensityLevel?        : IntensityLevel;
    RecommendedDurationMin?: number;
    Tags?                  : string;
    Version?               : string;
    OwnerUserId?           : uuid;
}

export interface ExerciseUpdateModel {
    AssetCode?             : string;
    Name?                  : string;
    Description?           : string;
    ExerciseType?          : ExerciseType;
    IntensityLevel?        : IntensityLevel;
    RecommendedDurationMin?: number;
    Tags?                  : string;
    Version?               : string;
    OwnerUserId? : uuid;
}

export interface ExerciseDto {
    id                    : uuid;
    AssetCode             : string;
    Name                  : string;
    Description           : string;
    ExerciseType          : ExerciseType;
    IntensityLevel        : IntensityLevel;
    RecommendedDurationMin: number;
    AssetCategory         : string;
    OwnerUserId           : uuid;
    Tags                  : string[];
    Version               : string;

}

export interface ExerciseSearchFilters extends BaseSearchFilters {
    AssetCode?             : string;
    Name?                  : string;
    Description?           : string;
    ExerciseType?          : ExerciseType;
    IntensityLevel?        : IntensityLevel;
    RecommendedDurationMin?: number;
    AssetCategory?         : string;
    Tags?                  : string;
    Version?               : string;
    CreatedAt ?            : Date;
}

export interface ExerciseSearchResults extends BaseSearchResults {
    Items: ExerciseDto[];
}
