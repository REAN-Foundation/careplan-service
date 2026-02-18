import express from 'express';
import { PromotionController } from './promotion.controller';
import { PromotionAuth } from './promotion.auth';
import { auth } from '../../../auth/auth.handler';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {

    const router = express.Router();
    const controller = new PromotionController();

    router.post('/:id/promotion-from', auth(PromotionAuth.promotionFrom), controller.promoteFrom);
    router.post('/promotion-to', controller.promoteTo);

    app.use('/api/v1/promotion', router);
};
