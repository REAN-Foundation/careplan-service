import express from 'express';
import { FileResourceController } from './file.resource.controller';
import { expressFileUploadMiddleware } from '../../startup/file.upload.middleware';
import { FileResourceAuth } from './file.resource.auth';
import { auth } from '../../auth/auth.handler';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {

    const router = express.Router();
    const controller = new FileResourceController();
    expressFileUploadMiddleware(router);

    router.post('/upload', auth(FileResourceAuth.upload), controller.upload);
    router.get('/download/:id', auth(FileResourceAuth.download), controller.download);
    router.get('/:id', auth(FileResourceAuth.getById), controller.getById);
    router.delete('/:id', auth(FileResourceAuth.delete), controller.delete);

    app.use('/api/v1/file-resources', router);
};
