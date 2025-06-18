import express from 'express';
import {
    MessageController
} from './message.controller';
import { MessageAuth } from './message.auth';
import { auth } from '../../../auth/auth.handler';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {

    const router = express.Router();
    const controller = new MessageController();

    router.post('/', auth(MessageAuth.create), controller.create);
    router.get('/search', auth(MessageAuth.search), controller.search);
    router.get('/:id', auth(MessageAuth.getById), controller.getById);
    router.put('/:id', auth(MessageAuth.update), controller.update);
    router.delete('/:id', auth(MessageAuth.delete), controller.delete);

    app.use('/api/v1/assets/messages', router);
};
