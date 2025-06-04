import express from 'express';
import { FileResourceController } from './file.resource.controller';
import { Loader } from '../../startup/loader';
import { expressFileUploadMiddleware } from '../../startup/file.upload.middleware';
import { FileResourceAuth } from './file.resource.auth';
import { auth } from '../../auth/auth.handler';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {

    const router = express.Router();
    // const authenticator = Loader.Authenticator;
    const controller = new FileResourceController();
    expressFileUploadMiddleware(router);

    router.post('/upload', auth(FileResourceAuth.upload), controller.upload);
    router.get('/download/:id', auth(FileResourceAuth.download), controller.download);
    router.get('/:id', auth(FileResourceAuth.getById), controller.getById);
    router.delete('/:id', auth(FileResourceAuth.delete), controller.delete);

    // router.post('/upload', authenticator.authenticateUser, controller.upload);
    // router.get('/download/:id', controller.download);
    // router.get('/:id', authenticator.authenticateUser, controller.getById);
    // router.delete('/:id', authenticator.authenticateUser, controller.delete);

    // router.post('/', authenticator.authenticateUser, controller.create);
    // router.get('/search', authenticator.authenticateUser, controller.search);
    // router.get('/:id', authenticator.authenticateUser, controller.getById);
    // router.put('/:id', authenticator.authenticateUser, controller.update);

    app.use('/api/v1/file-resources', router);
};
