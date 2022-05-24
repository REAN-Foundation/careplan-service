import {
    MeditationDto
} from '../../../domain.types/assets/meditation.domain.types';

///////////////////////////////////////////////////////////////////////////////////

export class MeditationMapper {

    static toDto = (meditation: any): MeditationDto => {
        if (meditation == null) {
            return null;
        }
        const dto: MeditationDto = {
            id                     : meditation.id,
            AssetCode              : meditation.AssetCode,
            Name                   : meditation.Name,
            Description            : meditation.Description,
            MeditationType         : meditation.MeditationType,
            RecommendedDurationMin : meditation.RecommendedDurationMin,
            AssetCategory          : meditation.AssetCategory,
            OwnerUserId            : meditation.OwnerUserId,
            Tags                   : meditation.Tags,
            Version                : meditation.Version,

        };
        return dto;
    };

}
