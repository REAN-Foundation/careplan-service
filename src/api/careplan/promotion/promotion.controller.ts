import express from 'express';
import { ResponseHandler } from '../../../common/response.handler';
import { BaseController } from '../../base.controller';
import { PromotionControllerDelegate } from './promotion.controller.delegate';

///////////////////////////////////////////////////////////////////////////////////////

export class PromotionController extends BaseController {

    //#region member variables and constructors

    _delegate: PromotionControllerDelegate = null;

    constructor() {
        super();
        this._delegate = new PromotionControllerDelegate();
    }

    //#endregion

    promoteFrom = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            const result = await this._delegate.promoteFrom(request);
            const message = 'Careplan promotion initiated successfully!';
            ResponseHandler.success(request, response, message, 200, result);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    promoteTo = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            const result = await this._delegate.promoteTo(request.body);
            const message = `Careplan ${result.action} successfully!`;
            ResponseHandler.success(request, response, message, 200, result);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

}
