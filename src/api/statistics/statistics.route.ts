import express from 'express';
import { StatisticsController } from './statistics.controller';
import { StatisticsAuth } from './statistics.auth';
import { auth } from '../../auth/auth.handler';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {

    const router = express.Router();
    const controller = new StatisticsController();

    router.get('/assets', auth(StatisticsAuth.search), controller.getDashboardStats);

    app.use('/api/v1/statistics', router);
};
