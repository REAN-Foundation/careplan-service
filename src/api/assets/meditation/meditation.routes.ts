import express from 'express';
import {
    MeditationController
} from './meditation.controller';
import {
    Loader
} from '../../../startup/loader';
import { MeditationAuth } from './meditation.auth';
import { auth } from '../../../auth/auth.handler';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {

    const router = express.Router();
    // const authenticator = Loader.Authenticator;
    const controller = new MeditationController();

    router.post('/', auth(MeditationAuth.create), controller.create);
    router.get('/search', auth(MeditationAuth.search), controller.search);
    router.get('/:id', auth(MeditationAuth.getById), controller.getById);
    router.put('/:id', auth(MeditationAuth.update), controller.update);
    router.delete('/:id', auth(MeditationAuth.delete), controller.delete);
    // router.post('/', authenticator.authenticateUser, controller.create);
    // router.get('/search', authenticator.authenticateUser, controller.search);
    // router.get('/:id', authenticator.authenticateUser, controller.getById);
    // router.put('/:id', authenticator.authenticateUser, controller.update);
    // router.delete('/:id', authenticator.authenticateUser, controller.delete);

    app.use('/api/v1/assets/meditations', router);
};
