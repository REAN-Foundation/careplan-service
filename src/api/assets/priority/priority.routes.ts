import express from 'express';
import {
    PriorityController
} from './priority.controller';
import { PriorityAuth } from './priority.auth';
import { auth } from '../../../auth/auth.handler';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {

    const router = express.Router();
    const controller = new PriorityController();

    router.post('/', auth(PriorityAuth.create), controller.create);
    router.get('/search', auth(PriorityAuth.search), controller.search);
    router.get('/:id', auth(PriorityAuth.getById), controller.getById);
    router.put('/:id', auth(PriorityAuth.update), controller.update);
    router.delete('/:id', auth(PriorityAuth.delete), controller.delete);

    app.use('/api/v1/assets/priorities', router);
};
