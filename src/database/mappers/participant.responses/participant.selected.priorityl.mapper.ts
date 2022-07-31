import {
    ParticipantSelectedPriorityDto
} from '../../../domain.types/participant.responses/participant.selected.priority.domain.types';

///////////////////////////////////////////////////////////////////////////////////

export class ParticipantSelectedPriorityMapper {

    static toDto = (participantSelectedPriority: any): ParticipantSelectedPriorityDto | null => {
        if (participantSelectedPriority == null) {
            return null;
        }
        const dto: ParticipantSelectedPriorityDto = {
            id            : participantSelectedPriority.id,
            Name          : participantSelectedPriority.Name,
            Description   : participantSelectedPriority.Description,
            EnrollmentId  : participantSelectedPriority.EnrollmentId,
            ParticipantId : participantSelectedPriority.ParticipantId,
            CareplanId    : participantSelectedPriority.CareplanId,
            AssetId       : participantSelectedPriority.AssetId,
            AssetType     : participantSelectedPriority.AssetType,
            AssetCode     : participantSelectedPriority.AssetCode,
            StartDate     : participantSelectedPriority.StartDate,

        };
        return dto;
    };

}
