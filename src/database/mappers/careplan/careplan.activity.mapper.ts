import {
    CareplanActivityDto
} from '../../../domain.types/careplan/careplan.activity.domain.types';

///////////////////////////////////////////////////////////////////////////////////

export class CareplanActivityMapper {

    static toDto = (careplanActivity: any): CareplanActivityDto => {
        if (careplanActivity == null) {
            return null;
        }
        const dto: CareplanActivityDto = {
            id                     : careplanActivity.id,
            AssetId                : careplanActivity.AssetId,
            AssetType              : careplanActivity.AssetType,
            CareplanId             : careplanActivity.CareplanId,
            Day                    : careplanActivity.Day,
            TimeSlot               : careplanActivity.TimeSlot,
            IsRegistrationActivity : careplanActivity.IsRegistrationActivity,
            Code               : [],
        };
        return dto;
    };

}
