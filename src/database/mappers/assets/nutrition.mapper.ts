import {
    NutritionDto
} from '../../../domain.types/assets/nutrition.domain.types';

///////////////////////////////////////////////////////////////////////////////////

export class NutritionMapper {

    static toDto = (nutrition: any): NutritionDto => {
        if (nutrition == null) {
            return null;
        }
        const dto: NutritionDto = {
            id            : nutrition.id,
            AssetCode     : nutrition.AssetCode,
            Name          : nutrition.Name,
            Description   : nutrition.Description,
            AssetCategory : nutrition.AssetCategory,
            OwnerUserId   : nutrition.OwnerUserId,
            Tags          : nutrition.Tags,
            Version       : nutrition.Version,

        };
        return dto;
    };

}
