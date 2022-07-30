import {
    ParticipantActivityResponseDto
} from '../../../domain.types/participant.responses/participant.activity.response.domain.types';

///////////////////////////////////////////////////////////////////////////////////

export class ParticipantActivityResponseMapper {

    static toDto = (participantActivityResponse: any): ParticipantActivityResponseDto | null => {
        if (participantActivityResponse == null) {
            return null;
        }
        const dto: ParticipantActivityResponseDto = {
            id                   : participantActivityResponse.id,
            ParticipantId        : participantActivityResponse.ParticipantId,
            EnrollmentScheduleId : participantActivityResponse.EnrollmentScheduleId,
            CareplanScheduleId   : participantActivityResponse.CareplanScheduleId,
            CareplanId           : participantActivityResponse.CareplanId,
            AssetId              : participantActivityResponse.AssetId,
            AssetType            : participantActivityResponse.AssetType,
            Response             : participantActivityResponse.Response,
            TimeResponded        : participantActivityResponse.TimeResponded,
            ProgressStatus       : participantActivityResponse.ProgressStatus,

        };
        return dto;
    };

}
