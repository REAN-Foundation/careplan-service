import {
    ParticipantActivityResponseDto
} from '../../../domain.types/participant.responses/participant.activity.response.domain.types';

///////////////////////////////////////////////////////////////////////////////////

export class UserActivityResponseMapper {

    static toDto = (userActivityResponse: any): ParticipantActivityResponseDto => {
        if (userActivityResponse == null) {
            return null;
        }
        const dto: ParticipantActivityResponseDto = {
            id                 : userActivityResponse.id,
            ParticipantId      : userActivityResponse.ParticipantId,
            EnrollmentTaskId   : userActivityResponse.EnrollmentTaskId,
            CareplanActivityId : userActivityResponse.CareplanActivityId,
            CareplanId         : userActivityResponse.CareplanId,
            AssetId            : userActivityResponse.AssetId,
            AssetType          : userActivityResponse.AssetType,
            Response           : userActivityResponse.Response,
            TimeResponded      : userActivityResponse.TimeResponded,
            ProgressStatus     : userActivityResponse.ProgressStatus,

        };
        return dto;
    };

}
