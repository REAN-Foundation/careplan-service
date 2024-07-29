import {
    ParticipantDto
} from '../../../domain.types/enrollment/participant.domain.types';

///////////////////////////////////////////////////////////////////////////////////

export class ParticipantMapper {

    static toDto = (enrollment: any): ParticipantDto => {
        if (enrollment == null) {
            return null;
        }
        const dto: ParticipantDto = {
            id                     : enrollment.id,
            DisplayId              : enrollment.DisplayId,
            Prefix                 : enrollment.Prefix,
            FirstName              : enrollment.FirstName,
            LastName               : enrollment.LastName,
            CountryCode            : enrollment.CountryCode,
            Phone                  : enrollment.Phone,
            Email                  : enrollment.Email,
            ParticipantReferenceId : enrollment.ParticipantReferenceId,
            Gender                 : enrollment.Gender,
            BirthDate              : enrollment.BirthDate,
            Country                : enrollment.Country

        };
        return dto;
    };

}
