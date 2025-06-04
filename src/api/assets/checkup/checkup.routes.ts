import express from 'express';
import {
    CheckupController
} from './checkup.controller';
import {
    Loader
} from '../../../startup/loader';
import { CheckupAuth } from './checkup.auth';
import { auth } from '../../../auth/auth.handler';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {

    const router = express.Router();
    // const authenticator = Loader.Authenticator;
    const controller = new CheckupController();

    router.post('/', auth(CheckupAuth.create), controller.create);
    router.get('/search', auth(CheckupAuth.search), controller.search);
    router.get('/:id', auth(CheckupAuth.getById), controller.getById);
    router.put('/:id', auth(CheckupAuth.update), controller.update);
    router.delete('/:id', auth(CheckupAuth.delete), controller.delete);
        
    // router.post('/', authenticator.authenticateUser, controller.create);
    // router.get('/search', authenticator.authenticateUser, controller.search);
    // router.get('/:id', authenticator.authenticateUser, controller.getById);
    // router.put('/:id', authenticator.authenticateUser, controller.update);
    // router.delete('/:id', authenticator.authenticateUser, controller.delete);

    app.use('/api/v1/assets/checkups', router);
};
