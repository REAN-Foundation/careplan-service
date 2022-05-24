import {
    PriorityDto
} from '../../../domain.types/assets/priority.domain.types';

///////////////////////////////////////////////////////////////////////////////////

export class PriorityMapper {

    static toDto = (priority: any): PriorityDto => {
        if (priority == null) {
            return null;
        }
        const dto: PriorityDto = {
            id            : priority.id,
            AssetCode     : priority.AssetCode,
            Name          : priority.Name,
            Description   : priority.Description,
            AssetCategory : priority.AssetCategory,
            OwnerUserId   : priority.OwnerUserId,
            Tags          : priority.Tags,
            Version       : priority.Version,

        };
        return dto;
    };

}
