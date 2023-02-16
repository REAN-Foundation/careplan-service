import express from 'express';
import {
    ResponseHandler
} from '../../../common/response.handler';
import {
    VideoControllerDelegate
} from './video.controller.delegate';
import {
    BaseController
} from '../../base.controller';

///////////////////////////////////////////////////////////////////////////////////////

export class VideoController extends BaseController {

    //#region member variables and constructors

    _delegate: VideoControllerDelegate = null;

    constructor() {
        super();
        this._delegate = new VideoControllerDelegate();
    }

    //#endregion

    create = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('Video.Create', request, response);
            if (request.currentUser) {
                request.body.OwnerUserId = request.currentUser.UserId;
            }
            const record = await this._delegate.create(request.body);
            const message = 'Video added successfully!';
            ResponseHandler.success(request, response, message, 201, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getById = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('Video.GetById', request, response);
            const record = await this._delegate.getById(request.params.id);
            const message = 'Video retrieved successfully!';
            ResponseHandler.success(request, response, message, 200, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    search = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('Video.Search', request, response);
            const searchResults = await this._delegate.search(request.query);
            const message = 'Video records retrieved successfully!';
            ResponseHandler.success(request, response, message, 200, searchResults);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    update = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('Video.Update', request, response);
            const updatedRecord = await this._delegate.update(request.params.id, request.body);
            const message = 'Video updated successfully!';
            ResponseHandler.success(request, response, message, 200, updatedRecord);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    delete = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('Video.Delete', request, response);
            const result = await this._delegate.delete(request.params.id);
            const message = 'Video deleted successfully!';
            ResponseHandler.success(request, response, message, 200, result);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

}
