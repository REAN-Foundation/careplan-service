import express from 'express';
import {
    AudioController
} from './audio.controller';
import { AudioAuth } from './audio.auth';
import { auth } from '../../../auth/auth.handler';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {

    const router = express.Router();
    const controller = new AudioController();

    router.post('/', auth(AudioAuth.create), controller.create);
    router.get('/search', auth(AudioAuth.search), controller.search);
    router.get('/:id', auth(AudioAuth.getById), controller.getById);
    router.put('/:id', auth(AudioAuth.update), controller.update);
    router.delete('/:id', auth(AudioAuth.delete), controller.delete);

    app.use('/api/v1/assets/audio', router);
};
