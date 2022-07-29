import {
    UserSelectedActionPlanDto
} from '../../../domain.types/user.responses/user.selected.action.plan.domain.types';

///////////////////////////////////////////////////////////////////////////////////

export class UserSelectedActionPlanMapper {

    static toDto = (userSelectedActionPlan: any): UserSelectedActionPlanDto => {
        if (userSelectedActionPlan == null) {
            return null;
        }
        const dto: UserSelectedActionPlanDto = {
            id                : userSelectedActionPlan.id,
            Name              : userSelectedActionPlan.Name,
            Description       : userSelectedActionPlan.Description,
            EnrollmentId      : userSelectedActionPlan.EnrollmentId,
            ParticipantId     : userSelectedActionPlan.ParticipantId,
            CareplanId        : userSelectedActionPlan.CareplanId,
            AssetId           : userSelectedActionPlan.AssetId,
            AssetType         : userSelectedActionPlan.AssetType,
            AssetCode         : userSelectedActionPlan.AssetCode,
            AdditionalDetails : userSelectedActionPlan.AdditionalDetails,
            StartDate         : userSelectedActionPlan.StartDate,
            EndDate           : userSelectedActionPlan.EndDate,
            ProgressStatus    : userSelectedActionPlan.ProgressStatus,

        };
        return dto;
    };

}
