import {
    GoalDto
} from '../../../domain.types/assets/goal.domain.types';

///////////////////////////////////////////////////////////////////////////////////

export class GoalMapper {

    static toDto = (goal: any): GoalDto => {
        if (goal == null) {
            return null;
        }
        const dto: GoalDto = {
            id            : goal.id,
            AssetCode     : goal.AssetCode,
            Name          : goal.Name,
            Description   : goal.Description,
            AssetCategory : goal.AssetCategory,
            OwnerUserId   : goal.OwnerUserId,
            Tags          : goal.Tags,
            Version       : goal.Version,

        };
        return dto;
    };

}
