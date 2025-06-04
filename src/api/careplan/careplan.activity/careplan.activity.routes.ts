import express from 'express';
import {
    CareplanActivityController
} from './careplan.activity.controller';
import {
    Loader
} from '../../../startup/loader';
import { CareplanActivityAuth } from './careplan.activity.auth';
import { auth } from '../../../auth/auth.handler';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {

    const router = express.Router();
    // const authenticator = Loader.Authenticator;
    const controller = new CareplanActivityController();

    router.post('/', auth(CareplanActivityAuth.create), controller.create);
    router.get('/search', auth(CareplanActivityAuth.search), controller.search);
    router.get('/:id', auth(CareplanActivityAuth.getById), controller.getById);
    router.put('/:id', auth(CareplanActivityAuth.update), controller.update);
    router.delete('/:id', auth(CareplanActivityAuth.delete), controller.delete);

    // router.post('/', authenticator.authenticateUser, controller.create);
    // router.get('/search', authenticator.authenticateClientOrUser, controller.search);
    // router.get('/:id', authenticator.authenticateClientOrUser, controller.getById);
    // router.put('/:id', authenticator.authenticateUser, controller.update);
    // router.delete('/:id', authenticator.authenticateUser, controller.delete);

    app.use('/api/v1/careplan-activities', router);
};
