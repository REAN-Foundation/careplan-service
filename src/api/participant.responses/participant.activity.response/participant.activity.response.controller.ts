import express from 'express';
import {
    ResponseHandler
} from '../../../common/response.handler';
import {
    ParticipantActivityResponseControllerDelegate
} from './participant.activity.response.controller.delegate';
import {
    BaseController
} from '../../base.controller';

///////////////////////////////////////////////////////////////////////////////////////

export class ParticipantActivityResponseController extends BaseController {

    //#region member variables and constructors

    _delegate: ParticipantActivityResponseControllerDelegate = null;

    constructor() {
        super();
        this._delegate = new ParticipantActivityResponseControllerDelegate();
    }

    //#endregion

    create = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('ParticipantActivityResponse.Create', request, response, false);
            const record = await this._delegate.create(request.body);
            const message = 'Participant activity response added successfully!';
            ResponseHandler.success(request, response, message, 201, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getById = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('ParticipantActivityResponse.GetById', request, response, false);
            const record = await this._delegate.getById(request.params.id);
            const message = 'Participant activity response retrieved successfully!';
            ResponseHandler.success(request, response, message, 200, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    search = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('ParticipantActivityResponse.Search', request, response, false);
            const searchResults = await this._delegate.search(request.query);
            const message = 'Participant activity response records retrieved successfully!';
            ResponseHandler.success(request, response, message, 200, searchResults);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    update = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('ParticipantActivityResponse.Update', request, response, false);
            const updatedRecord = await this._delegate.update(request.params.id, request.body);
            const message = 'Participant activity response updated successfully!';
            ResponseHandler.success(request, response, message, 200, updatedRecord);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    delete = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('ParticipantActivityResponse.Delete', request, response, false);
            const result = await this._delegate.delete(request.params.id);
            const message = 'Participant activity response deleted successfully!';
            ResponseHandler.success(request, response, message, 200, result);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

}
