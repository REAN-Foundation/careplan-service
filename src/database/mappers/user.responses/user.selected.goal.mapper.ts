import {
    UserSelectedGoalDto
} from '../../../domain.types/user.responses/user.selected.goal.domain.types';

///////////////////////////////////////////////////////////////////////////////////

export class UserSelectedGoalMapper {

    static toDto = (userSelectedGoal: any): UserSelectedGoalDto => {
        if (userSelectedGoal == null) {
            return null;
        }
        const dto: UserSelectedGoalDto = {
            id                : userSelectedGoal.id,
            Name              : userSelectedGoal.Name,
            Description       : userSelectedGoal.Description,
            UserId            : userSelectedGoal.UserId,
            CareplanId        : userSelectedGoal.CareplanId,
            AssetId           : userSelectedGoal.AssetId,
            AssetType         : userSelectedGoal.AssetType,
            AdditionalDetails : userSelectedGoal.AdditionalDetails,
            StartDate         : userSelectedGoal.StartDate,
            EndDate           : userSelectedGoal.EndDate,
            ProgressStatus    : userSelectedGoal.ProgressStatus,

        };
        return dto;
    };

}
