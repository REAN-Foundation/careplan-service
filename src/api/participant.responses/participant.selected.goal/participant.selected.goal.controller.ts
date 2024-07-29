import express from 'express';
import {
    ResponseHandler
} from '../../../common/response.handler';
import {
    ParticipantSelectedGoalControllerDelegate
} from './participant.selected.goal.controller.delegate';
import {
    BaseController
} from '../../base.controller';

///////////////////////////////////////////////////////////////////////////////////////

export class ParticipantSelectedGoalController extends BaseController {

    //#region member variables and constructors

    _delegate: ParticipantSelectedGoalControllerDelegate = null;

    constructor() {
        super();
        this._delegate = new ParticipantSelectedGoalControllerDelegate();
    }

    //#endregion

    create = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('ParticipantSelectedGoal.Create', request, response, false);
            const record = await this._delegate.create(request.body);
            const message = 'Participant selected goal added successfully!';
            ResponseHandler.success(request, response, message, 201, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getById = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('ParticipantSelectedGoal.GetById', request, response, false);
            const record = await this._delegate.getById(request.params.id);
            const message = 'Participant selected goal retrieved successfully!';
            ResponseHandler.success(request, response, message, 200, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    search = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('ParticipantSelectedGoal.Search', request, response, false);
            const searchResults = await this._delegate.search(request.query);
            const message = 'Participant selected goal records retrieved successfully!';
            ResponseHandler.success(request, response, message, 200, searchResults);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    update = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('ParticipantSelectedGoal.Update', request, response, false);
            const updatedRecord = await this._delegate.update(request.params.id, request.body);
            const message = 'Participant selected goal updated successfully!';
            ResponseHandler.success(request, response, message, 200, updatedRecord);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    delete = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('ParticipantSelectedGoal.Delete', request, response, false);
            const result = await this._delegate.delete(request.params.id);
            const message = 'Participant selected goal deleted successfully!';
            ResponseHandler.success(request, response, message, 200, result);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

}
