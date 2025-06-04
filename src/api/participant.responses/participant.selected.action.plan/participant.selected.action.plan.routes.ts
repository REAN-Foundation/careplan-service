import express from 'express';
import {
    ParticipantSelectedActionPlanController
} from './participant.selected.action.plan.controller';
import {
    Loader
} from '../../../startup/loader';
import { ParticipantSelectedActionPlanAuth } from './participant.selected.action.plan.auth';
import { auth } from '../../../auth/auth.handler';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {

    const router = express.Router();
    // const authenticator = Loader.Authenticator;
    const controller = new ParticipantSelectedActionPlanController();

    router.post('/', auth(ParticipantSelectedActionPlanAuth.create), controller.create);
    router.get('/search', auth(ParticipantSelectedActionPlanAuth.search), controller.search);
    router.get('/:id', auth(ParticipantSelectedActionPlanAuth.getById), controller.getById);
    router.put('/:id', auth(ParticipantSelectedActionPlanAuth.update), controller.update);
    router.delete('/:id', auth(ParticipantSelectedActionPlanAuth.delete), controller.delete);

    // router.post('/', authenticator.authenticateClient, controller.create);
    // router.get('/search', authenticator.authenticateClient, controller.search);
    // router.get('/:id', authenticator.authenticateClient, controller.getById);
    // router.put('/:id', authenticator.authenticateClient, controller.update);
    // router.delete('/:id', authenticator.authenticateClient, controller.delete);

    app.use('/api/v1/participant-selected-action-plans', router);
};
