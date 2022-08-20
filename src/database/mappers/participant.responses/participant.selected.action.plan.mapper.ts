import {
    ParticipantSelectedActionPlanDto
} from '../../../domain.types/participant.responses/participant.selected.action.plan.domain.types';

///////////////////////////////////////////////////////////////////////////////////

export class ParticipantSelectedActionPlanMapper {

    static toDto = (participantSelectedActionPlan: any): ParticipantSelectedActionPlanDto | null => {
        if (participantSelectedActionPlan == null) {
            return null;
        }
        const dto: ParticipantSelectedActionPlanDto = {
            id                : participantSelectedActionPlan.id,
            Name              : participantSelectedActionPlan.Name,
            Description       : participantSelectedActionPlan.Description,
            EnrollmentId      : participantSelectedActionPlan.EnrollmentId,
            ParticipantId     : participantSelectedActionPlan.ParticipantId,
            SelectedGoalId    : participantSelectedActionPlan.SelectedGoalId,
            CareplanId        : participantSelectedActionPlan.CareplanId,
            AssetId           : participantSelectedActionPlan.AssetId,
            AssetType         : participantSelectedActionPlan.AssetType,
            AssetCode         : participantSelectedActionPlan.AssetCode,
            AdditionalDetails : participantSelectedActionPlan.AdditionalDetails,
            StartDate         : participantSelectedActionPlan.StartDate,
            EndDate           : participantSelectedActionPlan.EndDate,
            ProgressStatus    : participantSelectedActionPlan.ProgressStatus,

        };
        return dto;
    };

}
