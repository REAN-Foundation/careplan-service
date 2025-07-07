import express from 'express';
import { CarePlanController } from './careplan.controller';
import { multerFileUploadMiddleware } from '../../../startup/file.upload.middleware';
import { CareplanAuth } from './careplan.auth';
import { auth } from '../../../auth/auth.handler';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {

    const router = express.Router();
    const controller = new CarePlanController();
    multerFileUploadMiddleware(router);
    
    router.post('/', auth(CareplanAuth.create), controller.create);
    router.get('/search', auth(CareplanAuth.search), controller.search);
    router.get('/:id', auth(CareplanAuth.getById), controller.getById);
    router.put('/:id', auth(CareplanAuth.update), controller.update);
    router.delete('/:id', auth(CareplanAuth.delete), controller.delete);

    router.get('/:id/export', auth(CareplanAuth.export), controller.export);
    router.post('/import-file', auth(CareplanAuth.import), controller.importFromFile);

    app.use('/api/v1/careplans', router);
};
