import express from 'express';
import {
    Loader
} from '../../startup/loader';
import { StatisticsController } from './statistics.controller';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {

    const router = express.Router();
    const authenticator = Loader.Authenticator;
    const controller = new StatisticsController();

    router.get('/search', authenticator.authenticateClientOrUser, controller.getDashboardStats);

    app.use('/api/v1/statistics', router);
};
