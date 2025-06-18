import express from 'express';
import {
    ChallengeController
} from './challenge.controller';
import { ChallengeAuth } from './challenge.auth';
import { auth } from '../../../auth/auth.handler';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {

    const router = express.Router();
    const controller = new ChallengeController();

    router.post('/', auth(ChallengeAuth.create), controller.create);
    router.get('/search', auth(ChallengeAuth.search), controller.search);
    router.get('/:id', auth(ChallengeAuth.getById), controller.getById);
    router.put('/:id', auth(ChallengeAuth.update), controller.update);
    router.delete('/:id', auth(ChallengeAuth.delete), controller.delete);

    app.use('/api/v1/assets/challenges', router);
};
