import express from 'express';
import {
    NutritionController
} from './nutrition.controller';
import {
    Loader
} from '../../../startup/loader';
import { NutritionAuth } from './nutrition.auth';
import { auth } from '../../../auth/auth.handler';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {

    const router = express.Router();
    // const authenticator = Loader.Authenticator;
    const controller = new NutritionController();

    router.post('/', auth(NutritionAuth.create), controller.create);
    router.get('/search', auth(NutritionAuth.search), controller.search);
    router.get('/:id', auth(NutritionAuth.getById), controller.getById);
    router.put('/:id', auth(NutritionAuth.update), controller.update);
    router.delete('/:id', auth(NutritionAuth.delete), controller.delete);
    
    // router.post('/', authenticator.authenticateUser, controller.create);
    // router.get('/search', authenticator.authenticateUser, controller.search);
    // router.get('/:id', authenticator.authenticateUser, controller.getById);
    // router.put('/:id', authenticator.authenticateUser, controller.update);
    // router.delete('/:id', authenticator.authenticateUser, controller.delete);

    app.use('/api/v1/assets/nutritions', router);
};
