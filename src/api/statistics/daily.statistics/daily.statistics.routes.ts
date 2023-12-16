import express from 'express';
import { Loader } from '../../../startup/loader';
import { DailyStatisticsController } from './daily.statistics.controller';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {
    const router = express.Router();
    const authenticator = Loader.Authenticator;
    const controller = new DailyStatisticsController();

    router.get('/', authenticator.authenticateClientOrUser, controller.getLatestStatistics);
   
    app.use('/api/v1/daily-stats', router);
};
