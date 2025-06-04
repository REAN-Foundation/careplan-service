import express from 'express';
import {
    PhysiotherapyController
} from './physiotherapy.controller';
import {
    Loader
} from '../../../startup/loader';
import { PhysiotherapyAuth } from './physiotherapy.auth';
import { auth } from '../../../auth/auth.handler';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {

    const router = express.Router();
    // const authenticator = Loader.Authenticator;
    const controller = new PhysiotherapyController();

    router.post('/', auth(PhysiotherapyAuth.create), controller.create);
    router.get('/search', auth(PhysiotherapyAuth.search), controller.search);
    router.get('/:id', auth(PhysiotherapyAuth.getById), controller.getById);
    router.put('/:id', auth(PhysiotherapyAuth.update), controller.update);
    router.delete('/:id', auth(PhysiotherapyAuth.delete), controller.delete);
        
    // router.post('/', authenticator.authenticateUser, controller.create);
    // router.get('/search', authenticator.authenticateUser, controller.search);
    // router.get('/:id', authenticator.authenticateUser, controller.getById);
    // router.put('/:id', authenticator.authenticateUser, controller.update);
    // router.delete('/:id', authenticator.authenticateUser, controller.delete);

    app.use('/api/v1/assets/physiotherapy', router);
};
