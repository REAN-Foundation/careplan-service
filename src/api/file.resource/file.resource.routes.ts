import express from 'express';
import { FileResourceController } from './file.resource.controller';
import { Loader } from '../../startup/loader';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {

    const router = express.Router();
    const authenticator = Loader.Authenticator;
    const controller = new FileResourceController();

    router.post('/upload', authenticator.authenticateUser, controller.upload);
    router.get('/download/:id', controller.download);
    router.get('/:id', authenticator.authenticateUser, controller.getById);
    router.delete('/:id', authenticator.authenticateUser, controller.delete);

    // router.post('/', authenticator.authenticateUser, controller.create);
    // router.get('/search', authenticator.authenticateUser, controller.search);
    // router.get('/:id', authenticator.authenticateUser, controller.getById);
    // router.put('/:id', authenticator.authenticateUser, controller.update);

    app.use('/api/v1/file-resources', router);
};
