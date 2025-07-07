import express from 'express';
import {
    ParticipantActivityResponseController
} from './participant.activity.response.controller';
import { ParticipantActivityResponseAuth } from './participant.activity.response.auth';
import { auth } from '../../../auth/auth.handler';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {

    const router = express.Router();
    const controller = new ParticipantActivityResponseController();

    router.post('/', auth(ParticipantActivityResponseAuth.create), controller.create);
    router.get('/search', auth(ParticipantActivityResponseAuth.search), controller.search);
    router.get('/:id', auth(ParticipantActivityResponseAuth.getById), controller.getById);
    router.put('/:id', auth(ParticipantActivityResponseAuth.update), controller.update);
    router.delete('/:id', auth(ParticipantActivityResponseAuth.delete), controller.delete);

    app.use('/api/v1/participant-activity-responses', router);
};
