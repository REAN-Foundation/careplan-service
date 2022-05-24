import {
    ReminderDto
} from '../../../domain.types/assets/reminder.domain.types';

///////////////////////////////////////////////////////////////////////////////////

export class ReminderMapper {

    static toDto = (reminder: any): ReminderDto => {
        if (reminder == null) {
            return null;
        }
        const dto: ReminderDto = {
            id            : reminder.id,
            AssetCode     : reminder.AssetCode,
            Name          : reminder.Name,
            Description   : reminder.Description,
            AssetCategory : reminder.AssetCategory,
            OwnerUserId   : reminder.OwnerUserId,
            Tags          : reminder.Tags,
            Version       : reminder.Version,

        };
        return dto;
    };

}
