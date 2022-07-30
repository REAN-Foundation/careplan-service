import {
    ParticipantSelectedGoalDto
} from '../../../domain.types/participant.responses/participant.selected.goal.domain.types';

///////////////////////////////////////////////////////////////////////////////////

export class ParticipantSelectedGoalMapper {

    static toDto = (participantSelectedGoal: any): ParticipantSelectedGoalDto | null => {
        if (participantSelectedGoal == null) {
            return null;
        }
        const dto: ParticipantSelectedGoalDto = {
            id                 : participantSelectedGoal.id,
            Name               : participantSelectedGoal.Name,
            Description        : participantSelectedGoal.Description,
            EnrollmentId       : participantSelectedGoal.EnrollmentId,
            ParticipantId      : participantSelectedGoal.ParticipantId,
            SelectedPriorityId : participantSelectedGoal.SelectedPriorityId,
            CareplanId         : participantSelectedGoal.CareplanId,
            AssetId            : participantSelectedGoal.AssetId,
            AssetType          : participantSelectedGoal.AssetType,
            AssetCode          : participantSelectedGoal.AssetCode,
            AdditionalDetails  : participantSelectedGoal.AdditionalDetails,
            StartDate          : participantSelectedGoal.StartDate,
            EndDate            : participantSelectedGoal.EndDate,
            ProgressStatus     : participantSelectedGoal.ProgressStatus,

        };
        return dto;
    };

}
