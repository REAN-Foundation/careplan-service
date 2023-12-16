import { DailyStatisticsService } from "../../../database/repository.services/statistics/daily.statistics/daily.statistics.service";
import { ErrorHandler } from "../../../common/error.handler";
import { DailyStatisticsDto } from "../../../domain.types/daily.statistics/daily.statistics.dto";
import { DailyStatisticsDomainModel } from "../../../domain.types/daily.statistics/daily.statistics.domain.model";
import { ApiError } from "../../../common/api.error";

////////////////////////////////////////////////////////////////////////////////////////////////////////

export class DailyStatisticsControllerDelegate {

    _service: DailyStatisticsService = null;

    constructor() {
        this._service = new DailyStatisticsService();
    }

    create = async (dailyStatisticsDomainModel: DailyStatisticsDomainModel): Promise<DailyStatisticsDto> => {
        const record: DailyStatisticsDto = await this._service.create(dailyStatisticsDomainModel);
        if (record === null) {
            throw new ApiError('Unable to create daily careplan statistics!', 400);
        }
        return this.getEnrichedDto(record);
    };

    getLatestStatistics = async (): Promise<DailyStatisticsDto> => {
        const record: DailyStatisticsDto = await this._service.getLatestStatistics();
        if (record === null) {
            ErrorHandler.throwNotFoundError('Careplan statistics not found!');
        }
        return this.getEnrichedDto(record);
    };

    private getEnrichedDto = (dailyStatistics): DailyStatisticsDto => {
        if (dailyStatistics == null) {
            return null;
        }
        const dto: DailyStatisticsDto = {
            id              : dailyStatistics.id,
            ReportDate      : dailyStatistics.ReportDate,
            ReportTimestamp : dailyStatistics.ReportTimestamp,
            Statistics      : JSON.parse(dailyStatistics.Statistics)
        };
        return dto;
    };

}
