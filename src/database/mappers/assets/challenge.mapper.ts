import {
    ChallengeDto
} from '../../../domain.types/assets/challenge.domain.types';

///////////////////////////////////////////////////////////////////////////////////

export class ChallengeMapper {

    static toDto = (challenge: any): ChallengeDto => {
        if (challenge == null) {
            return null;
        }
        const dto: ChallengeDto = {
            id            : challenge.id,
            AssetCode     : challenge.AssetCode,
            Name          : challenge.Name,
            Description   : challenge.Description,
            AssetCategory : challenge.AssetCategory,
            OwnerUserId   : challenge.OwnerUserId,
            Tags          : challenge.Tags,
            Version       : challenge.Version,

        };
        return dto;
    };

}
