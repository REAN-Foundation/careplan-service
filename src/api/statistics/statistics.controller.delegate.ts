
import { StatisticsService } from '../../database/repository.services/statistics/statistics.service';

///////////////////////////////////////////////////////////////////////////////////////

export class StatisticsControllerDelegate {

    //#region member variables and constructors

    _service: StatisticsService = null;

    constructor() {
        this._service = new StatisticsService();
    }

    //#endregion
    getDashboardStats = async () => {
        var searchResults = await this._service.getDashboardStats();
        // var items = searchResults.Items.map(x => this.getSearchDto(x));
        // searchResults.Items = items;
        return searchResults;
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////

    //#region Privates

    getSearchDto = (record) => {
        if (record == null) {
            return null;
        }
        return {
            id                     : record.id,
            EnrollmentId           : record.EnrollmentId,
            ParticipantId          : record.ParticipantId,
            CareplanActivityId     : record.CareplanActivityId,
            AssetId                : record.AssetId,
            AssetType              : record.AssetType,
            Asset                  : record.Asset,
            CareplanId             : record.CareplanId,
            TimeSlot               : record.TimeSlot,
            ScheduledDate          : record.ScheduledDate,
            IsRegistrationActivity : record.IsRegistrationActivity
        };
    }

    //#endregion

}
///////////////////////////////////////////////////////////////////////////////////////////////
