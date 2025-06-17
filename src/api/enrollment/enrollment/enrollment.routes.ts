import express from 'express';
import {
    EnrollmentController
} from './enrollment.controller';
import { EnrollmentAuth } from './enrollment.auth';
import { auth } from '../../../auth/auth.handler';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {

    const router = express.Router();
    const controller = new EnrollmentController();

    router.post('/', auth(EnrollmentAuth.create), controller.create);
    router.get('/search', auth(EnrollmentAuth.search), controller.search);
    router.get('/:id', auth(EnrollmentAuth.getById), controller.getById);
    router.get('/:participantId/stats', auth(EnrollmentAuth.getById), controller.getEnrollmentStats);
    router.put('/:id', auth(EnrollmentAuth.update), controller.update);
    router.delete('/:id', auth(EnrollmentAuth.delete), controller.delete);

    app.use('/api/v1/enrollments', router);
};
