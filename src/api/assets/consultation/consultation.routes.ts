import express from 'express';
import {
    ConsultationController
} from './consultation.controller';
import {
    Loader
} from '../../../startup/loader';
import { ConsultationAuth } from './consultation.auth';
import { auth } from '../../../auth/auth.handler';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {

    const router = express.Router();
    // const authenticator = Loader.Authenticator;
    const controller = new ConsultationController();

    router.post('/', auth(ConsultationAuth.create), controller.create);
    router.get('/search', auth(ConsultationAuth.search), controller.search);
    router.get('/:id', auth(ConsultationAuth.getById), controller.getById);
    router.put('/:id', auth(ConsultationAuth.update), controller.update);
    router.delete('/:id', auth(ConsultationAuth.delete), controller.delete);
        
    // router.post('/', authenticator.authenticateUser, controller.create);
    // router.get('/search', authenticator.authenticateUser, controller.search);
    // router.get('/:id', authenticator.authenticateUser, controller.getById);
    // router.put('/:id', authenticator.authenticateUser, controller.update);
    // router.delete('/:id', authenticator.authenticateUser, controller.delete);

    app.use('/api/v1/assets/consultations', router);
};
