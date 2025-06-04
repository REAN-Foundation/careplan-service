import express from 'express';
import {
    ParticipantSelectedPriorityController
} from './participant.selected.priority.controller';
import {
    Loader
} from '../../../startup/loader';
import { auth } from '../../../auth/auth.handler';
import { ParticipantSelectedPriorityAuth } from './participant.selected.priority.auth';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {

    const router = express.Router();
    // const authenticator = Loader.Authenticator;
    const controller = new ParticipantSelectedPriorityController();

    router.post('/', auth(ParticipantSelectedPriorityAuth.create), controller.create);
    router.get('/search', auth(ParticipantSelectedPriorityAuth.search), controller.search);
    router.get('/:id', auth(ParticipantSelectedPriorityAuth.getById), controller.getById);
    router.put('/:id', auth(ParticipantSelectedPriorityAuth.update), controller.update);
    router.delete('/:id', auth(ParticipantSelectedPriorityAuth.delete), controller.delete);
    
    // router.post('/', authenticator.authenticateClient, controller.create);
    // router.get('/search', authenticator.authenticateClient, controller.search);
    // router.get('/:id', authenticator.authenticateClient, controller.getById);
    // router.put('/:id', authenticator.authenticateClient, controller.update);
    // router.delete('/:id', authenticator.authenticateClient, controller.delete);

    app.use('/api/v1/participant-selected-priorities', router);
};
