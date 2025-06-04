import express from 'express';
import {
    MedicationController
} from './medication.controller';
import {
    Loader
} from '../../../startup/loader';
import { MedicationAuth } from './medication.auth';
import { auth } from '../../../auth/auth.handler';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {

    const router = express.Router();
    // const authenticator = Loader.Authenticator;
    const controller = new MedicationController();

    router.post('/', auth(MedicationAuth.create), controller.create);
    router.get('/search', auth(MedicationAuth.search), controller.search);
    router.get('/:id', auth(MedicationAuth.getById), controller.getById);
    router.put('/:id', auth(MedicationAuth.update), controller.update);
    router.delete('/:id', auth(MedicationAuth.delete), controller.delete);
    // router.post('/', authenticator.authenticateUser, controller.create);
    // router.get('/search', authenticator.authenticateUser, controller.search);
    // router.get('/:id', authenticator.authenticateUser, controller.getById);
    // router.put('/:id', authenticator.authenticateUser, controller.update);
    // router.delete('/:id', authenticator.authenticateUser, controller.delete);

    app.use('/api/v1/assets/medications', router);
};
