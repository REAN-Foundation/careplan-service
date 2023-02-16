import express from 'express';
import {
    ResponseHandler
} from '../../../common/response.handler';
import {
    PriorityControllerDelegate
} from './priority.controller.delegate';
import {
    BaseController
} from '../../base.controller';

///////////////////////////////////////////////////////////////////////////////////////

export class PriorityController extends BaseController {

    //#region member variables and constructors

    _delegate: PriorityControllerDelegate = null;

    constructor() {
        super();
        this._delegate = new PriorityControllerDelegate();
    }

    //#endregion

    create = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('Priority.Create', request, response);
            if (request.currentUser) {
                request.body.OwnerUserId = request.currentUser.UserId;
            }
            const record = await this._delegate.create(request.body);
            const message = 'Priority added successfully!';
            ResponseHandler.success(request, response, message, 201, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getById = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('Priority.GetById', request, response);
            const record = await this._delegate.getById(request.params.id);
            const message = 'Priority retrieved successfully!';
            ResponseHandler.success(request, response, message, 200, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    search = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('Priority.Search', request, response);
            const searchResults = await this._delegate.search(request.query);
            const message = 'Priority records retrieved successfully!';
            ResponseHandler.success(request, response, message, 200, searchResults);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    update = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('Priority.Update', request, response);
            const updatedRecord = await this._delegate.update(request.params.id, request.body);
            const message = 'Priority updated successfully!';
            ResponseHandler.success(request, response, message, 200, updatedRecord);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    delete = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('Priority.Delete', request, response);
            const result = await this._delegate.delete(request.params.id);
            const message = 'Priority deleted successfully!';
            ResponseHandler.success(request, response, message, 200, result);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

}
