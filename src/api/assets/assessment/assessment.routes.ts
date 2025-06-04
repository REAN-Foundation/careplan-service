import express from 'express';
import {
    AssessmentController
} from './assessment.controller';
import {
    Loader
} from '../../../startup/loader';
import { AssessmentAuth } from './assessment.auth';
import { auth } from '../../../auth/auth.handler';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {

    const router = express.Router();
    // const authenticator = Loader.Authenticator;
    const controller = new AssessmentController();

    router.post('/', auth(AssessmentAuth.create), controller.create);
    router.get('/search', auth(AssessmentAuth.search), controller.search);
    router.get('/:id', auth(AssessmentAuth.getById), controller.getById);
    router.put('/:id', auth(AssessmentAuth.update), controller.update);
    router.delete('/:id', auth(AssessmentAuth.delete), controller.delete);
    
    // router.post('/', authenticator.authenticateUser, controller.create);
    // router.get('/search', authenticator.authenticateUser, controller.search);
    // router.get('/:id', authenticator.authenticateUser, controller.getById);
    // router.put('/:id', authenticator.authenticateUser, controller.update);
    // router.delete('/:id', authenticator.authenticateUser, controller.delete);

    app.use('/api/v1/assets/assessments', router);
};
