import {
    ParticipantSelectedGoalDto
} from '../../../domain.types/user.responses/participant.selected.goal.domain.types';

///////////////////////////////////////////////////////////////////////////////////

export class UserSelectedGoalMapper {

    static toDto = (participantSelectedGoal: any): ParticipantSelectedGoalDto => {
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
