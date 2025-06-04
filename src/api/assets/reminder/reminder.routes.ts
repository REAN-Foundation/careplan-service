import express from 'express';
import {
    ReminderController
} from './reminder.controller';
import {
    Loader
} from '../../../startup/loader';
import { ReminderAuth } from './reminder.auth';
import { auth } from '../../../auth/auth.handler';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {

    const router = express.Router();
    // const authenticator = Loader.Authenticator;
    const controller = new ReminderController();
    
    router.post('/', auth(ReminderAuth.create), controller.create);
    router.get('/search', auth(ReminderAuth.search), controller.search);
    router.get('/:id', auth(ReminderAuth.getById), controller.getById);
    router.put('/:id', auth(ReminderAuth.update), controller.update);
    router.delete('/:id', auth(ReminderAuth.delete), controller.delete);
    // router.post('/', authenticator.authenticateUser, controller.create);
    // router.get('/search', authenticator.authenticateUser, controller.search);
    // router.get('/:id', authenticator.authenticateUser, controller.getById);
    // router.put('/:id', authenticator.authenticateUser, controller.update);
    // router.delete('/:id', authenticator.authenticateUser, controller.delete);

    app.use('/api/v1/assets/reminders', router);
};
