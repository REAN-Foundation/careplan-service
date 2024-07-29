import express from 'express';
import {
    ResponseHandler
} from '../../../common/response.handler';
import {
    CareplanActivityControllerDelegate
} from './careplan.activity.controller.delegate';
import {
    BaseController
} from '../../base.controller';

///////////////////////////////////////////////////////////////////////////////////////

export class CareplanActivityController extends BaseController {

    //#region member variables and constructors

    _delegate: CareplanActivityControllerDelegate = null;

    constructor() {
        super();
        this._delegate = new CareplanActivityControllerDelegate();
    }

    //#endregion

    create = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('CareplanActivity.Create', request, response);
            const record = await this._delegate.create(request.body);
            const message = 'Careplan activity added successfully!';
            ResponseHandler.success(request, response, message, 201, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getById = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('CareplanActivity.GetById', request, response);
            const record = await this._delegate.getById(request.params.id);
            const message = 'Careplan activity retrieved successfully!';
            ResponseHandler.success(request, response, message, 200, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    search = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('CareplanActivity.Search', request, response);
            const searchResults = await this._delegate.search(request.query);
            const message = 'Careplan activity records retrieved successfully!';
            ResponseHandler.success(request, response, message, 200, searchResults);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    update = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('CareplanActivity.Update', request, response);
            const updatedRecord = await this._delegate.update(request.params.id, request.body);
            const message = 'Careplan activity updated successfully!';
            ResponseHandler.success(request, response, message, 200, updatedRecord);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    delete = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('CareplanActivity.Delete', request, response);
            const result = await this._delegate.delete(request.params.id);
            const message = 'Careplan activity deleted successfully!';
            ResponseHandler.success(request, response, message, 200, result);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

}
