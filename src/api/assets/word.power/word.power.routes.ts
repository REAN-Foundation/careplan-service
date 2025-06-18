import express from 'express';
import {
    WordPowerController
} from './word.power.controller';
import { WordPowerAuth } from './word.power.auth';
import { auth } from '../../../auth/auth.handler';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {

    const router = express.Router();
    const controller = new WordPowerController();

    router.post('/', auth(WordPowerAuth.create), controller.create);
    router.get('/search', auth(WordPowerAuth.search), controller.search);
    router.get('/:id', auth(WordPowerAuth.getById), controller.getById);
    router.put('/:id', auth(WordPowerAuth.update), controller.update);
    router.delete('/:id', auth(WordPowerAuth.delete), controller.delete);

    app.use('/api/v1/assets/word-power', router);
};
