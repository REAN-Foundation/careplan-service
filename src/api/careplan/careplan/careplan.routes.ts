import express from 'express';
import { CarePlanController } from './careplan.controller';
import { Loader } from '../../../startup/loader';
import { multerFileUploadMiddleware } from '../../../startup/file.upload.middleware';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {

    const router = express.Router();
    const authenticator = Loader.Authenticator;
    const controller = new CarePlanController();
    multerFileUploadMiddleware(router);
    
    router.post('/', authenticator.authenticateUser, controller.create);
    router.get('/search', authenticator.authenticateClientOrUser, controller.search);
    router.get('/:id', authenticator.authenticateClientOrUser, controller.getById);
    router.put('/:id', authenticator.authenticateUser, controller.update);
    router.delete('/:id', authenticator.authenticateUser, controller.delete);

    router.get('/:id/export', authenticator.authenticateClientOrUser, controller.export);
    router.post('/import-file', authenticator.authenticateUser, controller.importFromFile);
   
    app.use('/api/v1/careplans', router);
};
