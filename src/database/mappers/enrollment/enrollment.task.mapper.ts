import {
    EnrollmentTaskDto
} from '../../../domain.types/enrollment/enrollment.task.domain.types';

///////////////////////////////////////////////////////////////////////////////////

export class EnrollmentTaskMapper {

    static toDto = (enrollmentTask: any): EnrollmentTaskDto => {
        if (enrollmentTask == null) {
            return null;
        }
        const dto: EnrollmentTaskDto = {
            id                     : enrollmentTask.id,
            EnrollmentId           : enrollmentTask.EnrollmentId,
            ParticipantId          : enrollmentTask.ParticipantId,
            CareplanActivityId     : enrollmentTask.CareplanActivityId,
            AssetId                : enrollmentTask.AssetId,
            AssetType              : enrollmentTask.AssetType,
            CareplanId             : enrollmentTask.CareplanId,
            TimeSlot               : enrollmentTask.TimeSlot,
            ScheduledDate          : enrollmentTask.ScheduledDate,
            IsRegistrationActivity : enrollmentTask.IsRegistrationActivity,
            CreatedAt              : enrollmentTask.CreatedAt,
        };
        return dto;
    };

}
