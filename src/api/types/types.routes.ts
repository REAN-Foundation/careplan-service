import express from 'express';
import {
    TypesController
} from './types.controller';
import { TypesAuth } from './types.auth';
import { auth } from '../../auth/auth.handler';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {

    const router = express.Router();
    const controller = new TypesController();

    router.get('/careplan-categories', auth(TypesAuth.getCareplanCategories), controller.getCareplanCategories);
    router.get('/time-slots', auth(TypesAuth.timeSlots), controller.getTimeSlots);
    router.get('/assets', auth(TypesAuth.assetTypes), controller.getAssetTypes);

    app.use('/api/v1/types', router);
};
