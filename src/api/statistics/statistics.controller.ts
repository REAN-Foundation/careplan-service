import express from 'express';
import {
    ResponseHandler
} from '../../common/response.handler';
import {
    StatisticsControllerDelegate
} from './statistics.controller.delegate';
import {
    BaseController
} from '../base.controller';

///////////////////////////////////////////////////////////////////////////////////////

export class StatisticsController extends BaseController {

    //#region member variables and constructors

    _delegate: StatisticsControllerDelegate = null;

    constructor() {
        super();
        
        this._delegate = new StatisticsControllerDelegate();
    }

    //#endregion

    getDashboardStats = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('Statistics.Search', request, response, false);
            const searchResults = await this._delegate.getDashboardStats();
            const message = 'Statistics records retrieved successfully!';
            ResponseHandler.success(request, response, message, 200, searchResults);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    }

}
