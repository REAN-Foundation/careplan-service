import express from 'express';
import {
    ResponseHandler
} from '../../../common/response.handler';
import {
    ReflectionControllerDelegate
} from './reflection.controller.delegate';
import {
    BaseController
} from '../../base.controller';

///////////////////////////////////////////////////////////////////////////////////////

export class ReflectionController extends BaseController {

    //#region member variables and constructors

    _delegate: ReflectionControllerDelegate = null;

    constructor() {
        super();
        this._delegate = new ReflectionControllerDelegate();
    }

    //#endregion

    create = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('Reflection.Create', request, response);
            if (request.currentUser) {
                request.body.OwnerUserId = request.currentUser.UserId;
            }
            const record = await this._delegate.create(request.body);
            const message = 'Reflection added successfully!';
            ResponseHandler.success(request, response, message, 201, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getById = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('Reflection.GetById', request, response);
            const record = await this._delegate.getById(request.params.id);
            const message = 'Reflection retrieved successfully!';
            ResponseHandler.success(request, response, message, 200, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    search = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('Reflection.Search', request, response);
            const searchResults = await this._delegate.search(request.query);
            const message = 'Reflection records retrieved successfully!';
            ResponseHandler.success(request, response, message, 200, searchResults);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    update = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('Reflection.Update', request, response);
            const updatedRecord = await this._delegate.update(request.params.id, request.body);
            const message = 'Reflection updated successfully!';
            ResponseHandler.success(request, response, message, 200, updatedRecord);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    delete = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('Reflection.Delete', request, response);
            const result = await this._delegate.delete(request.params.id);
            const message = 'Reflection deleted successfully!';
            ResponseHandler.success(request, response, message, 200, result);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

}
