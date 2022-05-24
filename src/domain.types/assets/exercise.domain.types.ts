import {
    BaseSearchFilters,
    BaseSearchResults
} from "../miscellaneous/base.search.types";
import {
    uuid
} from "../miscellaneous/system.types";

export interface ExerciseCreateModel {
    AssetCode ? : string;
    Name ? : string;
    Description ? : string;
    ExerciseType ? : ExerciseType;
    IntensityLevel ? : IntensityLevel;
    RecommendedDurationMin ? : number;
    Tags ? : string;
    Version ? : string;
}

export interface ExerciseUpdateModel {
    AssetCode ? : string;
    Name ? : string;
    Description ? : string;
    ExerciseType ? : ExerciseType;
    IntensityLevel ? : IntensityLevel;
    RecommendedDurationMin ? : number;
    Tags ? : string;
    Version ? : string;
}

export interface ExerciseDto {
    id: number;
    AssetCode: string;
    Name: string;
    Description: string;
    ExerciseType: ExerciseType;
    IntensityLevel: IntensityLevel;
    RecommendedDurationMin: number;
    AssetCategory: string;
    OwnerUserId: uuid;
    Tags: string[];
    Version: string;

}

export interface ExerciseSearchFilters extends BaseSearchFilters {
    AssetCode ? : string;
    Name ? : string;
    Description ? : string;
    ExerciseType ? : ExerciseType;
    IntensityLevel ? : IntensityLevel;
    RecommendedDurationMin ? : number;
    AssetCategory ? : string;
    Tags ? : string;
    Version ? : string;
}

export interface ExerciseSearchResults extends BaseSearchResults {
    Items: ExerciseDto[];
}