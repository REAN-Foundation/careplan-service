import express from 'express';
import {
    VideoController
} from './video.controller';
import {
    Loader
} from '../../../startup/loader';
import { VideoAuth } from './video.auth';
import { auth } from '../../../auth/auth.handler';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {

    const router = express.Router();
    // const authenticator = Loader.Authenticator;
    const controller = new VideoController();

    router.post('/', auth(VideoAuth.create), controller.create);
    router.get('/search', auth(VideoAuth.search), controller.search);
    router.get('/:id', auth(VideoAuth.getById), controller.getById);
    router.put('/:id', auth(VideoAuth.update), controller.update);
    router.delete('/:id', auth(VideoAuth.delete), controller.delete);
    // router.post('/', authenticator.authenticateUser, controller.create);
    // router.get('/search', authenticator.authenticateUser, controller.search);
    // router.get('/:id', authenticator.authenticateUser, controller.getById);
    // router.put('/:id', authenticator.authenticateUser, controller.update);
    // router.delete('/:id', authenticator.authenticateUser, controller.delete);

    app.use('/api/v1/assets/video', router);
};
