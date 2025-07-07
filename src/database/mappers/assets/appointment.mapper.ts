import {
    AppointmentDto
} from '../../../domain.types/assets/appointment.domain.types';

///////////////////////////////////////////////////////////////////////////////////

export class AppointmentMapper {

    static toDto = (appointment: any): AppointmentDto => {
        if (appointment == null) {
            return null;
        }
        const dto: AppointmentDto = {
            id              : appointment.id,
            AssetCode       : appointment.AssetCode,
            Name            : appointment.Name,
            Description     : appointment.Description,
            AppointmentType : appointment.AppointmentType,
            AssetCategory   : appointment.AssetCategory,
            OwnerUserId     : appointment.OwnerUserId,
            TenantId        : appointment.TenantId,
            Tags            : appointment.Tags,
            Version         : appointment.Version,

        };
        return dto;
    };

}
