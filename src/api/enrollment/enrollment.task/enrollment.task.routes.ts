import express from 'express';
import {
    EnrollmentTaskController
} from './enrollment.task.controller';
import {
    Loader
} from '../../../startup/loader';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {

    const router = express.Router();
    const authenticator = Loader.Authenticator;
    const controller = new EnrollmentTaskController();

    router.get('/search', authenticator.authenticateClientOrUser, controller.search);
    router.get('/:id', authenticator.authenticateClientOrUser, controller.getById);

    app.use('/api/v1/enrollment-tasks', router);
};
