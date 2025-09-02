import express from 'express';
import {
    WebNewsfeedController
} from './web.newsfeed.controller';
import { WebNewsfeedAuth } from './web.newsfeed.auth';
import { auth } from '../../../auth/auth.handler';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {

    const router = express.Router();
    const controller = new WebNewsfeedController();

    router.post('/', auth(WebNewsfeedAuth.create), controller.create);
    router.get('/search', auth(WebNewsfeedAuth.search), controller.search);
    router.get('/:id', auth(WebNewsfeedAuth.getById), controller.getById);
    router.put('/:id', auth(WebNewsfeedAuth.update), controller.update);
    router.delete('/:id', auth(WebNewsfeedAuth.delete), controller.delete);

    app.use('/api/v1/assets/web-newsfeeds', router);
};
