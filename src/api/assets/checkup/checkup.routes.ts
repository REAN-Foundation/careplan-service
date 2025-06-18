import express from 'express';
import {
    CheckupController
} from './checkup.controller';
import { CheckupAuth } from './checkup.auth';
import { auth } from '../../../auth/auth.handler';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {

    const router = express.Router();
    const controller = new CheckupController();

    router.post('/', auth(CheckupAuth.create), controller.create);
    router.get('/search', auth(CheckupAuth.search), controller.search);
    router.get('/:id', auth(CheckupAuth.getById), controller.getById);
    router.put('/:id', auth(CheckupAuth.update), controller.update);
    router.delete('/:id', auth(CheckupAuth.delete), controller.delete);

    app.use('/api/v1/assets/checkups', router);
};
