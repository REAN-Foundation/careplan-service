import express from 'express';
import {
    NutritionController
} from './nutrition.controller';
import { NutritionAuth } from './nutrition.auth';
import { auth } from '../../../auth/auth.handler';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {

    const router = express.Router();
    const controller = new NutritionController();

    router.post('/', auth(NutritionAuth.create), controller.create);
    router.get('/search', auth(NutritionAuth.search), controller.search);
    router.get('/:id', auth(NutritionAuth.getById), controller.getById);
    router.put('/:id', auth(NutritionAuth.update), controller.update);
    router.delete('/:id', auth(NutritionAuth.delete), controller.delete);

    app.use('/api/v1/assets/nutritions', router);
};
