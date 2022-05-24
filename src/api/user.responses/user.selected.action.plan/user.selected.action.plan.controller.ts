import express from 'express';
import {
    ResponseHandler
} from '../../../common/response.handler';
import {
    UserSelectedActionPlanControllerDelegate
} from './user.selected.action.plan.controller.delegate';
import {
    BaseController
} from '../../base.controller';

///////////////////////////////////////////////////////////////////////////////////////

export class UserSelectedActionPlanController extends BaseController {

    //#region member variables and constructors

    _delegate: UserSelectedActionPlanControllerDelegate = null;

    constructor() {
        super();
        this._delegate = new UserSelectedActionPlanControllerDelegate();
    }

    //#endregion

    create = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('UserSelectedActionPlan.Create', request, response);
            const record = await this._delegate.create(request.body);
            const message = 'User selected action plan added successfully!';
            ResponseHandler.success(request, response, message, 201, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    }

    getById = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('UserSelectedActionPlan.GetById', request, response);
            const record = await this._delegate.getById(request.params.id);
            const message = 'User selected action plan retrieved successfully!';
            ResponseHandler.success(request, response, message, 200, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    }

    search = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('UserSelectedActionPlan.Search', request, response);
            const searchResults = await this._delegate.search(request.query);
            const message = 'User selected action plan records retrieved successfully!';
            ResponseHandler.success(request, response, message, 200, searchResults);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    }

    update = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('UserSelectedActionPlan.Update', request, response);
            const updatedRecord = await this._delegate.update(request.params.id, request.body);
            const message = 'User selected action plan updated successfully!';
            ResponseHandler.success(request, response, message, 200, updatedRecord);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    }

    delete = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('UserSelectedActionPlan.Delete', request, response);
            const result = await this._delegate.delete(request.params.id);
            const message = 'User selected action plan deleted successfully!';
            ResponseHandler.success(request, response, message, 200, result);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

}
