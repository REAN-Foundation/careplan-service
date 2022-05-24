import {
    ConsultationDto
} from '../../../domain.types/assets/consultation.domain.types';

///////////////////////////////////////////////////////////////////////////////////

export class ConsultationMapper {

    static toDto = (consultation: any): ConsultationDto => {
        if (consultation == null) {
            return null;
        }
        const dto: ConsultationDto = {
            id               : consultation.id,
            AssetCode        : consultation.AssetCode,
            Name             : consultation.Name,
            Description      : consultation.Description,
            ConsultationType : consultation.ConsultationType,
            AssetCategory    : consultation.AssetCategory,
            OwnerUserId      : consultation.OwnerUserId,
            Tags             : consultation.Tags,
            Version          : consultation.Version,

        };
        return dto;
    };

}
