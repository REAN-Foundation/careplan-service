import express from 'express';
import { CareplanCategoryController } from './careplan.category.controller';
import { CareplanCategoryAuth } from './careplan.category.auth';
import { auth } from '../../../auth/auth.handler';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {

    const router = express.Router();
    const controller = new CareplanCategoryController();

    router.post('/', auth(CareplanCategoryAuth.create), controller.create);
    router.get('/search', auth(CareplanCategoryAuth.search), controller.search);
    router.get('/:id', auth(CareplanCategoryAuth.getById), controller.getById);
    router.put('/:id', auth(CareplanCategoryAuth.update), controller.update);
    router.delete('/:id', auth(CareplanCategoryAuth.delete), controller.delete);
    
    app.use('/api/v1/careplan-categories', router);
};
