import express from 'express';
import {
    ParticipantSelectedGoalController
} from './participant.selected.goal.controller';
import { auth } from '../../../auth/auth.handler';
import { ParticipantSelectedGoalAuth } from './paricipant.selected.goal.auth';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {

    const router = express.Router();
    const controller = new ParticipantSelectedGoalController();

    router.post('/', auth(ParticipantSelectedGoalAuth.create), controller.create);
    router.get('/search', auth(ParticipantSelectedGoalAuth.search), controller.search);
    router.get('/:id', auth(ParticipantSelectedGoalAuth.getById), controller.getById);
    router.put('/:id', auth(ParticipantSelectedGoalAuth.update), controller.update);
    router.delete('/:id', auth(ParticipantSelectedGoalAuth.delete), controller.delete);
    
    app.use('/api/v1/participant-selected-goals', router);
};
