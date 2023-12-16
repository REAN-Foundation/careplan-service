import express from 'express';
import { ApiError } from '../../../common/api.error';
import { ResponseHandler } from '../../../common/response.handler';
import { BaseController } from '../../base.controller';
import { DailyStatisticsControllerDelegate } from './daily.statistics.controller.delegate';

///////////////////////////////////////////////////////////////////////////////////////

export class DailyStatisticsController extends BaseController {

    //#region member variables and constructors

    _delegate: DailyStatisticsControllerDelegate = null;

    constructor() {
        super();
        this._delegate = new DailyStatisticsControllerDelegate();
    }

    //#endregion

    //#region Action methods
    
    getLatestStatistics = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            await this.authorize('DailyStatistics.GetLatestStatistics', request, response, false);
            const latestStatistics = await this._delegate.getLatestStatistics();
            if (latestStatistics === null) {
                throw new ApiError(404, 'Daily careplan statistics not found.');
            }
            ResponseHandler.success(request, response, 'Latest careplan statistics retrieved successfully!', 200, {
                DailyStatistics : latestStatistics,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    //#endregion

}
