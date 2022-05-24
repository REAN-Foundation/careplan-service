import {
    PhysiotherapyDto
} from '../../../domain.types/assets/physiotherapy.domain.types';

///////////////////////////////////////////////////////////////////////////////////

export class PhysiotherapyMapper {

    static toDto = (physiotherapy: any): PhysiotherapyDto => {
        if (physiotherapy == null) {
            return null;
        }
        const dto: PhysiotherapyDto = {
            id                     : physiotherapy.id,
            AssetCode              : physiotherapy.AssetCode,
            Name                   : physiotherapy.Name,
            Description            : physiotherapy.Description,
            RecommendedDurationMin : physiotherapy.RecommendedDurationMin,
            AssetCategory          : physiotherapy.AssetCategory,
            OwnerUserId            : physiotherapy.OwnerUserId,
            Tags                   : physiotherapy.Tags,
            Version                : physiotherapy.Version,

        };
        return dto;
    };

}
