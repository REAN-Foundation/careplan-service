import {
    MedicationDto
} from '../../../domain.types/assets/medication.domain.types';

///////////////////////////////////////////////////////////////////////////////////

export class MedicationMapper {

    static toDto = (medication: any): MedicationDto => {
        if (medication == null) {
            return null;
        }
        const dto: MedicationDto = {
            id            : medication.id,
            AssetCode     : medication.AssetCode,
            Name          : medication.Name,
            Description   : medication.Description,
            AssetCategory : medication.AssetCategory,
            OwnerUserId   : medication.OwnerUserId,
            Tags          : medication.Tags,
            Version       : medication.Version,

        };
        return dto;
    };

}
