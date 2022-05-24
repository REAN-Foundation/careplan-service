import {
    UserSelectedActionPlanDto
} from '../../domain.types/user.response/user.selected.action.plan.domain.types';

///////////////////////////////////////////////////////////////////////////////////

export class UserSelectedActionPlanMapper {

    static toDto = (userSelectedActionPlan: any): UserSelectedActionPlanDto => {
        if (userSelectedActionPlan == null) {
            return null;
        }
        const dto: UserSelectedActionPlanDto = {
            id: userSelectedActionPlan.id,
            Name: userSelectedActionPlan.Name,
            Description: userSelectedActionPlan.Description,
            UserId: userSelectedActionPlan.UserId,
            CareplanId: userSelectedActionPlan.CareplanId,
            AssetId: userSelectedActionPlan.AssetId,
            AssetType: userSelectedActionPlan.AssetType,
            AdditionalDetails: userSelectedActionPlan.AdditionalDetails,
            StartDate: userSelectedActionPlan.StartDate,
            EndDate: userSelectedActionPlan.EndDate,
            ProgressStatus: userSelectedActionPlan.ProgressStatus,

        };
        return dto;
    };

}