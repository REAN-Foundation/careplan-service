import express from 'express';
import { ParticipantController } from './participant.controller';
import { Loader } from '../../../startup/loader';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {

    const router = express.Router();
    const authenticator = Loader.Authenticator;
    const controller = new ParticipantController();

    router.post('', authenticator.authenticateClient, controller.create);
    router.put('/:id', authenticator.authenticateClient, controller.update);
    router.delete('/:id', authenticator.authenticateClient, controller.delete);
    router.get('/search', authenticator.authenticateClientOrUser, controller.search);
    router.get('/:id', authenticator.authenticateClientOrUser, controller.getById);

    app.use('/api/v1/participants', router);
};
