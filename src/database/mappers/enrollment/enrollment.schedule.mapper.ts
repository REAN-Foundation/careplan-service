import {
    EnrollmentScheduleDto
} from '../../../domain.types/enrollment/enrollment.schedule.domain.types';

///////////////////////////////////////////////////////////////////////////////////

export class EnrollmentScheduleMapper {

    static toDto = (enrollmentSchedule: any): EnrollmentScheduleDto => {
        if (enrollmentSchedule == null) {
            return null;
        }
        const dto: EnrollmentScheduleDto = {
            id: enrollmentSchedule.id,
            EnrollmentId: enrollmentSchedule.EnrollmentId,
            ParticipantId: enrollmentSchedule.ParticipantId,
            CareplanScheduleId: enrollmentSchedule.CareplanScheduleId,
            AssetId: enrollmentSchedule.AssetId,
            AssetType: enrollmentSchedule.AssetType,
            CareplanId: enrollmentSchedule.CareplanId,
            TimeSlot: enrollmentSchedule.TimeSlot,
            ScheduledDate: enrollmentSchedule.ScheduledDate,

        };
        return dto;
    };

}