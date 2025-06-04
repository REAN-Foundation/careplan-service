import express from 'express';
import {
    ExerciseController
} from './exercise.controller';
import {
    Loader
} from '../../../startup/loader';
import { ExerciseAuth } from './exercise.auth';
import { auth } from '../../../auth/auth.handler';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {

    const router = express.Router();
    // const authenticator = Loader.Authenticator;
    const controller = new ExerciseController();

    router.post('/', auth(ExerciseAuth.create), controller.create);
    router.get('/search', auth(ExerciseAuth.search), controller.search);
    router.get('/:id', auth(ExerciseAuth.getById), controller.getById);
    router.put('/:id', auth(ExerciseAuth.update), controller.update);
    router.delete('/:id', auth(ExerciseAuth.delete), controller.delete);
    
    // router.post('/', authenticator.authenticateUser, controller.create);
    // router.get('/search', authenticator.authenticateUser, controller.search);
    // router.get('/:id', authenticator.authenticateUser, controller.getById);
    // router.put('/:id', authenticator.authenticateUser, controller.update);
    // router.delete('/:id', authenticator.authenticateUser, controller.delete);

    app.use('/api/v1/assets/exercises', router);
};
