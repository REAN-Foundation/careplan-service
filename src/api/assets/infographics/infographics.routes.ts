import express from 'express';
import {
    InfographicsController
} from './infographics.controller';
import { InfographicsAuth } from './infographics.auth';
import { auth } from '../../../auth/auth.handler';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {

    const router = express.Router();
    const controller = new InfographicsController();

    router.post('/', auth(InfographicsAuth.create), controller.create);
    router.get('/search', auth(InfographicsAuth.search), controller.search);
    router.get('/:id', auth(InfographicsAuth.getById), controller.getById);
    router.put('/:id', auth(InfographicsAuth.update), controller.update);
    router.delete('/:id', auth(InfographicsAuth.delete), controller.delete);

    app.use('/api/v1/assets/infographics', router);
};
