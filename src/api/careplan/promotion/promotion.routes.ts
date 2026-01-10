import express from 'express';
import { PromotionController } from './promotion.controller';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {

    const router = express.Router();
    const controller = new PromotionController();

    // No authentication - directly call the controller
    router.post('/promotion-from', controller.promoteFrom);

    app.use('/api/v1/promotion', router);
};
