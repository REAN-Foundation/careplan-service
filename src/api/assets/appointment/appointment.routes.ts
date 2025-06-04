import express from 'express';
import {
    AppointmentController
} from './appointment.controller';
import {
    Loader
} from '../../../startup/loader';
import { AppointmentAuth } from './appointment.auth';
import { auth } from '../../../auth/auth.handler';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {

    const router = express.Router();
    // const authenticator = Loader.Authenticator;
    const controller = new AppointmentController();

    router.post('/', auth(AppointmentAuth.create), controller.create);
    router.get('/search', auth(AppointmentAuth.search), controller.search);
    router.get('/:id', auth(AppointmentAuth.getById), controller.getById);
    router.put('/:id', auth(AppointmentAuth.update), controller.update);
    router.delete('/:id', auth(AppointmentAuth.delete), controller.delete);

    // router.post('/', authenticator.authenticateUser, controller.create);
    // router.get('/search', authenticator.authenticateUser, controller.search);
    // router.get('/:id', authenticator.authenticateUser, controller.getById);
    // router.put('/:id', authenticator.authenticateUser, controller.update);
    // router.delete('/:id', authenticator.authenticateUser, controller.delete);

    app.use('/api/v1/assets/appointments', router);
};
