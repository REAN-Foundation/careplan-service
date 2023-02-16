import express from 'express';
import {
    ResponseHandler
} from '../../../common/response.handler';
import {
    WordPowerControllerDelegate
} from './word.power.controller.delegate';
import {
    BaseController
} from '../../base.controller';

///////////////////////////////////////////////////////////////////////////////////////

export class WordPowerController extends BaseController {

    //#region member variables and constructors

    _delegate: WordPowerControllerDelegate = null;

    constructor() {
        super();
        this._delegate = new WordPowerControllerDelegate();
    }

    //#endregion

    create = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('WordPower.Create', request, response);
            if (request.currentUser) {
                request.body.OwnerUserId = request.currentUser.UserId;
            }
            const record = await this._delegate.create(request.body);
            const message = 'Word power added successfully!';
            ResponseHandler.success(request, response, message, 201, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getById = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('WordPower.GetById', request, response);
            const record = await this._delegate.getById(request.params.id);
            const message = 'Word power retrieved successfully!';
            ResponseHandler.success(request, response, message, 200, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    search = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('WordPower.Search', request, response);
            const searchResults = await this._delegate.search(request.query);
            const message = 'Word power records retrieved successfully!';
            ResponseHandler.success(request, response, message, 200, searchResults);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    update = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('WordPower.Update', request, response);
            const updatedRecord = await this._delegate.update(request.params.id, request.body);
            const message = 'Word power updated successfully!';
            ResponseHandler.success(request, response, message, 200, updatedRecord);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    delete = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('WordPower.Delete', request, response);
            const result = await this._delegate.delete(request.params.id);
            const message = 'Word power deleted successfully!';
            ResponseHandler.success(request, response, message, 200, result);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

}
