import {
    EnrollmentDto
} from '../../../domain.types/enrollment/enrollment.domain.types';

///////////////////////////////////////////////////////////////////////////////////

export class EnrollmentMapper {

    static toDto = (enrollment: any): EnrollmentDto => {
        if (enrollment == null) {
            return null;
        }
        const dto: EnrollmentDto = {
            id             : enrollment.id,
            CareplanId     : enrollment.CareplanId,
            ParticipantId  : enrollment.ParticipantId,
            DisplayId      : enrollment.DisplayId,
            StartDate      : enrollment.StartDate,
            EndDate        : enrollment.EndDate,
            EnrollmentDate : enrollment.EnrollmentDate,
            ProgressStatus : enrollment.ProgressStatus,
            Careplan       : [],
            Participant    : [],

        };
        return dto;
    };

}
