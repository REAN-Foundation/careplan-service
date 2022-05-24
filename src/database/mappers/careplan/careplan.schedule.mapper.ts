import {
    CareplanScheduleDto
} from '../../../domain.types/careplan/careplan.schedule.domain.types';

///////////////////////////////////////////////////////////////////////////////////

export class CareplanScheduleMapper {

    static toDto = (careplanSchedule: any): CareplanScheduleDto => {
        if (careplanSchedule == null) {
            return null;
        }
        const dto: CareplanScheduleDto = {
            id: careplanSchedule.id,
            AssetId: careplanSchedule.AssetId,
            AssetType: careplanSchedule.AssetType,
            CareplanId: careplanSchedule.CareplanId,
            Day: careplanSchedule.Day,
            TimeSlot: careplanSchedule.TimeSlot,

        };
        return dto;
    };

}