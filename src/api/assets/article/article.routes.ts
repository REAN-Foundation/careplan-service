import express from 'express';
import {
    ArticleController
} from './article.controller';
import {
    Loader
} from '../../../startup/loader';
import { ArticleAuth } from './article.auth';
import { auth } from '../../../auth/auth.handler';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {

    const router = express.Router();
    // const authenticator = Loader.Authenticator;
    const controller = new ArticleController();

    router.post('/', auth(ArticleAuth.create), controller.create);
    router.get('/search', auth(ArticleAuth.search), controller.search);
    router.get('/:id', auth(ArticleAuth.getById), controller.getById);
    router.put('/:id', auth(ArticleAuth.update), controller.update);
    router.delete('/:id', auth(ArticleAuth.delete), controller.delete);
        
    // router.post('/', authenticator.authenticateUser, controller.create);
    // router.get('/search', authenticator.authenticateUser, controller.search);
    // router.get('/:id', authenticator.authenticateUser, controller.getById);
    // router.put('/:id', authenticator.authenticateUser, controller.update);
    // router.delete('/:id', authenticator.authenticateUser, controller.delete);

    app.use('/api/v1/assets/articles', router);
};
