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
            id: enrollment.id,
            CareplanId: enrollment.CareplanId,
            UserId: enrollment.UserId,
            StartDate: enrollment.StartDate,
            EndDate: enrollment.EndDate,
            EnrollmentDate: enrollment.EnrollmentDate,
            ProgressStatus: enrollment.ProgressStatus,

        };
        return dto;
    };

}