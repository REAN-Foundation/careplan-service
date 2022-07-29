import {
    UserActivityResponseDto
} from '../../../domain.types/user.responses/user.activity.response.domain.types';

///////////////////////////////////////////////////////////////////////////////////

export class UserActivityResponseMapper {

    static toDto = (userActivityResponse: any): UserActivityResponseDto => {
        if (userActivityResponse == null) {
            return null;
        }
        const dto: UserActivityResponseDto = {
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
