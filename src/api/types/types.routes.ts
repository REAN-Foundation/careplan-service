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

    app.use('/api/v1/types', router);
};
