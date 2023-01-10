import express from 'express';
import {
    TypesController
} from './types.controller';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {

    const router = express.Router();
    const controller = new TypesController();

    router.get('/roles', controller.getRoleTypes);
    router.get('/careplan-categories', controller.getCareplanCategories);
    router.get('/slot', controller.getSlotTypes);
    router.get('/assets', controller.getAssetTypes);

    app.use('/api/v1/types', router);
};
