import { ErrorHandler } from '../../../../common/error.handler';
import { DailyStatisticsModel } from '../../../../database/models/statistics/daily.statistics.model';

///////////////////////////////////////////////////////////////////////

export class DailyStatisticsService {

    DailyStatistics = DailyStatisticsModel.Model;

    create = async (createModel) => {
        try {
            const record = await this.DailyStatistics.create(createModel);
            return record;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to create careplan statistics!', error);
        }
    };

    getLatestStatistics = async () => {
        try {
            const record = await this.DailyStatistics.findOne({
                order : [['CreatedAt', 'DESC']],
            });
            return record;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to retrieve careplan statistics!', error);
        }
    };

}
