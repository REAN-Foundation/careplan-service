import express from 'express';
import {
    AnimationController
} from './animation.controller';
import {
    Loader
} from '../../../startup/loader';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {

    const router = express.Router();
    const authenticator = Loader.Authenticator;
    const controller = new AnimationController();

    router.post('/', authenticator.authenticateUser, controller.create);
    router.get('/search', authenticator.authenticateUser, controller.search);
    router.get('/:id', authenticator.authenticateUser, controller.getById);
    router.put('/:id', authenticator.authenticateUser, controller.update);
    router.delete('/:id', authenticator.authenticateUser, controller.delete);

    app.use('/api/v1/assets/animations', router);
};