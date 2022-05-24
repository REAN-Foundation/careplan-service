import {
    ActionPlanDto
} from '../../../domain.types/assets/action.plan.domain.types';

///////////////////////////////////////////////////////////////////////////////////

export class ActionPlanMapper {

    static toDto = (actionPlan: any): ActionPlanDto => {
        if (actionPlan == null) {
            return null;
        }
        const dto: ActionPlanDto = {
            id            : actionPlan.id,
            AssetCode     : actionPlan.AssetCode,
            Name          : actionPlan.Name,
            Description   : actionPlan.Description,
            AssetCategory : actionPlan.AssetCategory,
            OwnerUserId   : actionPlan.OwnerUserId,
            Tags          : actionPlan.Tags,
            Version       : actionPlan.Version,

        };
        return dto;
    };

}
