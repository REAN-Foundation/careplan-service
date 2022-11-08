import express from 'express';
import {
    EnrollmentController
} from './enrollment.controller';
import {
    Loader
} from '../../../startup/loader';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {

    const router = express.Router();
    const authenticator = Loader.Authenticator;
    const controller = new EnrollmentController();

    router.post('/', authenticator.authenticateClient, controller.create);
    router.get('/search', authenticator.authenticateClientOrUser, controller.search);
    router.get('/:participantId/stats', authenticator.authenticateClientOrUser, controller.getEnrollmentStats);
    router.get('/:id', authenticator.authenticateClientOrUser, controller.getById);
    router.put('/:id', authenticator.authenticateClient, controller.update);
    router.delete('/:id', authenticator.authenticateClient, controller.delete);

    app.use('/api/v1/enrollments', router);
};
