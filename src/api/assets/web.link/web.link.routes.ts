import express from 'express';
import {
    WebLinkController
} from './web.link.controller';
import {
    Loader
} from '../../../startup/loader';
import { WebLinkAuth } from './web.link.auth';
import { auth } from '../../../auth/auth.handler';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {

    const router = express.Router();
    // const authenticator = Loader.Authenticator;
    const controller = new WebLinkController();

    router.post('/', auth(WebLinkAuth.create), controller.create);
    router.get('/search', auth(WebLinkAuth.search), controller.search);
    router.get('/:id', auth(WebLinkAuth.getById), controller.getById);
    router.put('/:id', auth(WebLinkAuth.update), controller.update);
    router.delete('/:id', auth(WebLinkAuth.delete), controller.delete);
    // router.post('/', authenticator.authenticateUser, controller.create);
    // router.get('/search', authenticator.authenticateUser, controller.search);
    // router.get('/:id', authenticator.authenticateUser, controller.getById);
    // router.put('/:id', authenticator.authenticateUser, controller.update);
    // router.delete('/:id', authenticator.authenticateUser, controller.delete);

    app.use('/api/v1/assets/web-links', router);
};
