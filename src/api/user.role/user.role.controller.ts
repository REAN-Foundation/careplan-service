import express from 'express';
import {
    ResponseHandler
} from '../../common/response.handler';
import {
    UserRoleControllerDelegate
} from './user.role.controller.delegate';
import {
    BaseController
} from '../base.controller';

///////////////////////////////////////////////////////////////////////////////////////

export class UserRoleController extends BaseController {

    //#region member variables and constructors

    _delegate: UserRoleControllerDelegate = null;

    constructor() {
        super();
        this._delegate = new UserRoleControllerDelegate();
    }

    //#endregion

    create = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('UserRole.Create', request, response);
            const record = await this._delegate.create(request.body);
            const message = 'User role added successfully!';
            ResponseHandler.success(request, response, message, 201, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getById = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('UserRole.GetById', request, response);
            const record = await this._delegate.getById(request.params.id);
            const message = 'User role retrieved successfully!';
            ResponseHandler.success(request, response, message, 200, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    search = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('UserRole.Search', request, response);
            const searchResults = await this._delegate.search(request.query);
            const message = 'User role records retrieved successfully!';
            ResponseHandler.success(request, response, message, 200, searchResults);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    update = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('UserRole.Update', request, response);
            const updatedRecord = await this._delegate.update(request.params.id, request.body);
            const message = 'User role updated successfully!';
            ResponseHandler.success(request, response, message, 200, updatedRecord);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    delete = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('UserRole.Delete', request, response);
            const result = await this._delegate.delete(request.params.id);
            const message = 'User role deleted successfully!';
            ResponseHandler.success(request, response, message, 200, result);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

}
