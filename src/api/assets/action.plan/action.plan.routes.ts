import express from 'express';
import {
    ActionPlanController
} from './action.plan.controller';
import { auth } from '../../../auth/auth.handler';
import { ActionplanAuth } from './action.plan.auth';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {

    const router = express.Router();
    const controller = new ActionPlanController();

    router.post('/', auth(ActionplanAuth.create), controller.create);
    router.get('/search', auth(ActionplanAuth.search), controller.search);
    router.get('/:id', auth(ActionplanAuth.getById), controller.getById);
    router.put('/:id', auth(ActionplanAuth.update), controller.update);
    router.delete('/:id', auth(ActionplanAuth.delete), controller.delete);

    app.use('/api/v1/assets/action-plans', router);
};
