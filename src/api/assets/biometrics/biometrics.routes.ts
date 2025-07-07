import express from 'express';
import {
    BiometricsController
} from './biometrics.controller';
import { BiometricsAuth } from './biometrics.auth';
import { auth } from '../../../auth/auth.handler';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {

    const router = express.Router();
    const controller = new BiometricsController();

    router.post('/', auth(BiometricsAuth.create), controller.create);
    router.get('/search', auth(BiometricsAuth.search), controller.search);
    router.get('/:id', auth(BiometricsAuth.getById), controller.getById);
    router.put('/:id', auth(BiometricsAuth.update), controller.update);
    router.delete('/:id', auth(BiometricsAuth.delete), controller.delete);
    
    app.use('/api/v1/assets/biometrics', router);
};
