import express from 'express';
import {
    EnrollmentScheduleController
} from './enrollment.schedule.controller';
import {
    Loader
} from '../../../startup/loader';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {

    const router = express.Router();
    const authenticator = Loader.Authenticator;
    const controller = new EnrollmentScheduleController();

    router.get('/search', authenticator.authenticateClient, controller.search);
    router.get('/:id', authenticator.authenticateClient, controller.getById);

    app.use('/api/v1/enrollment-schedules', router);
};
