import express from 'express';
import { UserController } from './user.controller';
import { Loader } from '../../startup/loader';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {

    const router = express.Router();
    const authenticator = Loader.Authenticator;
    const controller = new UserController();

    router.post('', controller.create);
    router.put('/:id', authenticator.authenticateUser, controller.update);
    router.delete('/:id', authenticator.authenticateUser, controller.delete);

    router.post('/login-password', controller.loginWithPassword);
    router.post('/login-otp', controller.loginWithOtp);
    router.post('/generate-otp', controller.sendOtp);
    router.post('/change-password', authenticator.authenticateUser, controller.changePassword);
    router.post('/logout', authenticator.authenticateUser, controller.logout);

    router.get('/search', authenticator.authenticateUser, controller.search);
    router.get('/:id', authenticator.authenticateUser, controller.getById);

    app.use('/api/v1/users', router);
};
