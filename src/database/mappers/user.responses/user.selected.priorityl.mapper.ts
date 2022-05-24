import {
    UserSelectedPriorityDto
} from '../../domain.types/user.selected.priority.domain.types';

///////////////////////////////////////////////////////////////////////////////////

export class UserSelectedPriorityMapper {

    static toDto = (userSelectedPriority: any): UserSelectedPriorityDto => {
        if (userSelectedPriority == null) {
            return null;
        }
        const dto: UserSelectedPriorityDto = {
            id: userSelectedPriority.id,
            Name: userSelectedPriority.Name,
            Description: userSelectedPriority.Description,
            UserId: userSelectedPriority.UserId,
            CareplanId: userSelectedPriority.CareplanId,
            AssetId: userSelectedPriority.AssetId,
            AssetType: userSelectedPriority.AssetType,
            StartDate: userSelectedPriority.StartDate,

        };
        return dto;
    };

}