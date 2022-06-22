import express from 'express';
// import {
//     TypesController
// } from './types.controller';
import {
    Loader
} from '../../startup/loader';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {

    const router = express.Router();
    const authenticator = Loader.Authenticator;
    // const controller = new TypesController();

    // router.get('/', authenticator.authenticateUser, controller.create);

    app.use('/api/v1/types', router);
};
