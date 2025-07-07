import express from 'express';
import {
    AnimationController
} from './animation.controller';
import { auth } from '../../../auth/auth.handler';
import { AnimationAuth } from './animation.auth';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {

    const router = express.Router();
    const controller = new AnimationController();

    router.post('/', auth(AnimationAuth.create), controller.create);
    router.get('/search', auth(AnimationAuth.search), controller.search);
    router.get('/:id', auth(AnimationAuth.getById), controller.getById);
    router.put('/:id', auth(AnimationAuth.update), controller.update);
    router.delete('/:id', auth(AnimationAuth.delete), controller.delete);

    app.use('/api/v1/assets/animations', router);
};
