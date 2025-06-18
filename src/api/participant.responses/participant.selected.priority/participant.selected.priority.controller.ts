import express from 'express';
import {
    ResponseHandler
} from '../../../common/response.handler';
import {
    ParticipantSelectedPriorityControllerDelegate
} from './participant.selected.priority.controller.delegate';
import {
    BaseController
} from '../../base.controller';

///////////////////////////////////////////////////////////////////////////////////////

export class ParticipantSelectedPriorityController extends BaseController {

    //#region member variables and constructors

    _delegate: ParticipantSelectedPriorityControllerDelegate = null;

    constructor() {
        super();
        this._delegate = new ParticipantSelectedPriorityControllerDelegate();
    }

    //#endregion

    create = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            const record = await this._delegate.create(request.body);
            const message = 'Participant selected priority added successfully!';
            ResponseHandler.success(request, response, message, 201, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getById = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            const record = await this._delegate.getById(request.params.id);
            const message = 'Participant selected priority retrieved successfully!';
            ResponseHandler.success(request, response, message, 200, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    search = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            const searchResults = await this._delegate.search(request.query);
            const message = 'Participant selected priority records retrieved successfully!';
            ResponseHandler.success(request, response, message, 200, searchResults);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    update = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            const updatedRecord = await this._delegate.update(request.params.id, request.body);
            const message = 'Participant selected priority updated successfully!';
            ResponseHandler.success(request, response, message, 200, updatedRecord);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    delete = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            const result = await this._delegate.delete(request.params.id);
            const message = 'Participant selected priority deleted successfully!';
            ResponseHandler.success(request, response, message, 200, result);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

}
