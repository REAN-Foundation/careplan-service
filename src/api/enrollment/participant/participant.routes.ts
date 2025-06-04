import express from 'express';
import { ParticipantController } from './participant.controller';
import { Loader } from '../../../startup/loader';
import { ParticipantAuth } from './participant.auth';
import { auth } from '../../../auth/auth.handler';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {

    const router = express.Router();
    // const authenticator = Loader.Authenticator;
    const controller = new ParticipantController();

    router.post('/', auth(ParticipantAuth.create), controller.create);
    router.get('/search', auth(ParticipantAuth.search), controller.search);
    router.get('/:id', auth(ParticipantAuth.getById), controller.getById);
    router.put('/:id', auth(ParticipantAuth.update), controller.update);
    router.delete('/:id', auth(ParticipantAuth.delete), controller.delete);

    // router.post('', authenticator.authenticateClient, controller.create);
    // router.put('/:id', authenticator.authenticateClient, controller.update);
    // router.delete('/:id', authenticator.authenticateClient, controller.delete);
    // router.get('/search', authenticator.authenticateClientOrUser, controller.search);
    // router.get('/:id', authenticator.authenticateClientOrUser, controller.getById);

    app.use('/api/v1/participants', router);
};
