import express from 'express';
import {
    ReflectionController
} from './reflection.controller';
import {
    Loader
} from '../../../startup/loader';
import { ReflectionAuth } from './reflection.auth';
import { auth } from '../../../auth/auth.handler';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {

    const router = express.Router();
    // const authenticator = Loader.Authenticator;
    const controller = new ReflectionController();

    router.post('/', auth(ReflectionAuth.create), controller.create);
    router.get('/search', auth(ReflectionAuth.search), controller.search);
    router.get('/:id', auth(ReflectionAuth.getById), controller.getById);
    router.put('/:id', auth(ReflectionAuth.update), controller.update);
    router.delete('/:id', auth(ReflectionAuth.delete), controller.delete);
    // router.post('/', authenticator.authenticateUser, controller.create);
    // router.get('/search', authenticator.authenticateUser, controller.search);
    // router.get('/:id', authenticator.authenticateUser, controller.getById);
    // router.put('/:id', authenticator.authenticateUser, controller.update);
    // router.delete('/:id', authenticator.authenticateUser, controller.delete);

    app.use('/api/v1/assets/reflectionReflectionAuthns', router);
};
