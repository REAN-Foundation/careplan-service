import {
    ReflectionDto
} from '../../../domain.types/assets/reflection.domain.types';

///////////////////////////////////////////////////////////////////////////////////

export class ReflectionMapper {

    static toDto = (reflection: any): ReflectionDto => {
        if (reflection == null) {
            return null;
        }
        const dto: ReflectionDto = {
            id            : reflection.id,
            AssetCode     : reflection.AssetCode,
            Name          : reflection.Name,
            Description   : reflection.Description,
            AssetCategory : reflection.AssetCategory,
            OwnerUserId   : reflection.OwnerUserId,
            Tags          : reflection.Tags,
            Version       : reflection.Version,

        };
        return dto;
    };

}
