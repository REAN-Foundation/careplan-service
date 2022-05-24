import {
    BiometricsDto
} from '../../../domain.types/assets/biometrics.domain.types';

///////////////////////////////////////////////////////////////////////////////////

export class BiometricsMapper {

    static toDto = (biometrics: any): BiometricsDto => {
        if (biometrics == null) {
            return null;
        }
        const dto: BiometricsDto = {
            id              : biometrics.id,
            AssetCode       : biometrics.AssetCode,
            Name            : biometrics.Name,
            Description     : biometrics.Description,
            AssetCategory   : biometrics.AssetCategory,
            BiometricsType  : biometrics.BiometricsType,
            MeasurementUnit : biometrics.MeasurementUnit,
            OwnerUserId     : biometrics.OwnerUserId,
            Tags            : biometrics.Tags,
            Version         : biometrics.Version,

        };
        return dto;
    };

}
