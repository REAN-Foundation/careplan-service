import {
    CheckupDto
} from '../../../domain.types/assets/checkup.domain.types';

///////////////////////////////////////////////////////////////////////////////////

export class CheckupMapper {

    static toDto = (checkup: any): CheckupDto => {
        if (checkup == null) {
            return null;
        }
        const dto: CheckupDto = {
            id            : checkup.id,
            AssetCode     : checkup.AssetCode,
            Name          : checkup.Name,
            Description   : checkup.Description,
            AssetCategory : checkup.AssetCategory,
            OwnerUserId   : checkup.OwnerUserId,
            Tags          : checkup.Tags,
            Version       : checkup.Version,

        };
        return dto;
    };

}
