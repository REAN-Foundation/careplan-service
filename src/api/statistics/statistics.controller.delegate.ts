import { DailyStatisticsDomainModel } from '../../domain.types/daily.statistics/daily.statistics.domain.model';
import { DailyStatisticsService } from '../../database/repository.services/statistics/daily.statistics/daily.statistics.service';
import { StatisticsService } from '../../database/repository.services/statistics/statistics.service';
import { Logger } from '../../common/logger';

///////////////////////////////////////////////////////////////////////////////////////

export class StatisticsControllerDelegate {

    //#region member variables and constructors

    _service: StatisticsService = null;

    _dailyStatisticsService: DailyStatisticsService = null;

    constructor() {
        this._service = new StatisticsService();
        this._dailyStatisticsService = new DailyStatisticsService();
    }

    createDailyStatistics = async () => {
        try {
            const record = await this.getDashboardStats();
            const createModel: DailyStatisticsDomainModel = {
                ReportDate      : new Date(),
                ReportTimestamp : new Date(),
                Statistics      : JSON.stringify(record)
            };
            const dailyStatistics = await this._dailyStatisticsService.create(createModel);
            if (!dailyStatistics) {
                Logger.instance().log('Unable to create daily careplan statistics!');
            }
            Logger.instance().log('Daily careplan statistics created successfully.');
        } catch (error) {
            Logger.instance().log(`Error in creating daily careplan statistics: ${error.message}`);
        }
    }

    //#endregion
    getDashboardStats = async () => {
        var searchResults = await this._service.getDashboardStats();
        // var items = searchResults.Items.map(x => this.getSearchDto(x));
        // searchResults.Items = items;
        return searchResults;
    };

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
    };

    //#endregion

}
///////////////////////////////////////////////////////////////////////////////////////////////
