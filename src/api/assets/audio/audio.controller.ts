import express from 'express';
import {
    ResponseHandler
} from '../../../common/response.handler';
import {
    AudioControllerDelegate
} from './audio.controller.delegate';
import {
    BaseController
} from '../../base.controller';

///////////////////////////////////////////////////////////////////////////////////////

export class AudioController extends BaseController {

    //#region member variables and constructors

    _delegate: AudioControllerDelegate = null;

    constructor() {
        super();
        this._delegate = new AudioControllerDelegate();
    }

    //#endregion

    create = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('Audio.Create', request, response);
            if (request.currentUser) {
                request.body.OwnerUserId = request.currentUser.UserId;
            }
            const record = await this._delegate.create(request.body);
            const message = 'Audio added successfully!';
            ResponseHandler.success(request, response, message, 201, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getById = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('Audio.GetById', request, response);
            const record = await this._delegate.getById(request.params.id);
            const message = 'Audio retrieved successfully!';
            ResponseHandler.success(request, response, message, 200, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    search = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('Audio.Search', request, response);
            const searchResults = await this._delegate.search(request.query);
            const message = 'Audio records retrieved successfully!';
            ResponseHandler.success(request, response, message, 200, searchResults);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    update = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('Audio.Update', request, response);
            const updatedRecord = await this._delegate.update(request.params.id, request.body);
            const message = 'Audio updated successfully!';
            ResponseHandler.success(request, response, message, 200, updatedRecord);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    delete = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('Audio.Delete', request, response);
            const result = await this._delegate.delete(request.params.id);
            const message = 'Audio deleted successfully!';
            ResponseHandler.success(request, response, message, 200, result);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

}
