import {
    ExerciseDto
} from '../../../domain.types/assets/exercise.domain.types';

///////////////////////////////////////////////////////////////////////////////////

export class ExerciseMapper {

    static toDto = (exercise: any): ExerciseDto => {
        if (exercise == null) {
            return null;
        }
        const dto: ExerciseDto = {
            id                     : exercise.id,
            AssetCode              : exercise.AssetCode,
            Name                   : exercise.Name,
            Description            : exercise.Description,
            ExerciseType           : exercise.ExerciseType,
            IntensityLevel         : exercise.IntensityLevel,
            RecommendedDurationMin : exercise.RecommendedDurationMin,
            AssetCategory          : exercise.AssetCategory,
            OwnerUserId            : exercise.OwnerUserId,
            Tags                   : exercise.Tags,
            Version                : exercise.Version,

        };
        return dto;
    };

}
