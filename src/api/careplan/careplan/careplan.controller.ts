import express from 'express';
import { ResponseHandler } from '../../../common/response.handler';
import { CareplanControllerDelegate } from './careplan.controller.delegate';
import { BaseController } from '../../base.controller';

///////////////////////////////////////////////////////////////////////////////////////

export class CarePlanController extends BaseController{

    //#region member variables and constructors

    _delegate: CareplanControllerDelegate = null;

    constructor() {
        super();
        this._delegate = new CareplanControllerDelegate();
    }

    //#endregion

    create = async (request: express.Request, response: express.Response): Promise <void> => {
        try {
            await this.authorize('Careplan.Create', request, response);
            const record = await this._delegate.create(request.body);
            const message = 'Care plan added successfully!';
            ResponseHandler.success(request, response, message, 201, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getById = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('Careplan.GetById', request, response, request.authorizeRequest);
            const record = await this._delegate.getById(request.params.id);
            const message = 'Care plan retrieved successfully!';
            ResponseHandler.success(request, response, message, 200, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    search = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('Careplan.Search', request, response, request.authorizeRequest);
            const searchResults = await this._delegate.search(request.query);
            const message = 'Care plan records retrieved successfully!';
            ResponseHandler.success(request, response, message, 200, searchResults);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    update = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('Careplan.Update', request, response);
            const updatedRecord = await this._delegate.update(request.params.id, request.body);
            const message = 'Care plan updated successfully!';
            ResponseHandler.success(request, response, message, 200, updatedRecord);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    delete = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('Careplan.Delete', request, response);
            const result = await this._delegate.delete(request.params.id);
            const message = 'Care plan deleted successfully!';
            ResponseHandler.success(request, response, message, 200, result);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

}
