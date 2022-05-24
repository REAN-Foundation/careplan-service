import express from 'express';
import {
    ResponseHandler
} from '../../../common/response.handler';
import {
    UserSelectedGoalControllerDelegate
} from './user.selected.goal.controller.delegate';
import {
    BaseController
} from '../../base.controller';

///////////////////////////////////////////////////////////////////////////////////////

export class UserSelectedGoalController extends BaseController {

    //#region member variables and constructors

    _delegate: UserSelectedGoalControllerDelegate = null;

    constructor() {
        super();
        this._delegate = new UserSelectedGoalControllerDelegate();
    }

    //#endregion

    create = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('UserSelectedGoal.Create', request, response);
            const record = await this._delegate.create(request.body);
            const message = 'User selected goal added successfully!';
            ResponseHandler.success(request, response, message, 201, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    }

    getById = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('UserSelectedGoal.GetById', request, response);
            const record = await this._delegate.getById(request.params.id);
            const message = 'User selected goal retrieved successfully!';
            ResponseHandler.success(request, response, message, 200, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    }

    search = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('UserSelectedGoal.Search', request, response);
            const searchResults = await this._delegate.search(request.query);
            const message = 'User selected goal records retrieved successfully!';
            ResponseHandler.success(request, response, message, 200, searchResults);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    }

    update = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('UserSelectedGoal.Update', request, response);
            const updatedRecord = await this._delegate.update(request.params.id, request.body);
            const message = 'User selected goal updated successfully!';
            ResponseHandler.success(request, response, message, 200, updatedRecord);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    }

    delete = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('UserSelectedGoal.Delete', request, response);
            const result = await this._delegate.delete(request.params.id);
            const message = 'User selected goal deleted successfully!';
            ResponseHandler.success(request, response, message, 200, result);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

}
