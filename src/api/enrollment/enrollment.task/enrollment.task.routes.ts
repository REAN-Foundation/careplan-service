import express from 'express';
import {
    EnrollmentTaskController
} from './enrollment.task.controller';
import { EnrollmentTaskAuth } from './enrollment.task.auth';
import { auth } from '../../../auth/auth.handler';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {

    const router = express.Router();
    const controller = new EnrollmentTaskController();

    router.get('/search', auth(EnrollmentTaskAuth.search), controller.search);
    router.get('/:id', auth(EnrollmentTaskAuth.getById), controller.getById);

    app.use('/api/v1/enrollment-tasks', router);
};
