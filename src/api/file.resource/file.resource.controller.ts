import express from 'express';
import {
    ResponseHandler
} from '../../common/response.handler';
import {
    FileResourceControllerDelegate
} from './file.resource.controller.delegate';
import {
    BaseController
} from '../base.controller';

///////////////////////////////////////////////////////////////////////////////////////

export class FileResourceController extends BaseController {

    //#region member variables and constructors

    _delegate: FileResourceControllerDelegate = null;

    constructor() {
        super();
        this._delegate = new FileResourceControllerDelegate();
    }

    //#endregion

    create = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('FileResource.Create', request, response);
            const record = await this._delegate.create(request.body);
            const message = 'File resource added successfully!';
            ResponseHandler.success(request, response, message, 201, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    }

    getById = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('FileResource.GetById', request, response);
            const record = await this._delegate.getById(request.params.id);
            const message = 'File resource retrieved successfully!';
            ResponseHandler.success(request, response, message, 200, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    }

    search = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('FileResource.Search', request, response);
            const searchResults = await this._delegate.search(request.query);
            const message = 'File resource records retrieved successfully!';
            ResponseHandler.success(request, response, message, 200, searchResults);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    }

    update = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('FileResource.Update', request, response);
            const updatedRecord = await this._delegate.update(request.params.id, request.body);
            const message = 'File resource updated successfully!';
            ResponseHandler.success(request, response, message, 200, updatedRecord);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    }

    delete = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('FileResource.Delete', request, response);
            const result = await this._delegate.delete(request.params.id);
            const message = 'File resource deleted successfully!';
            ResponseHandler.success(request, response, message, 200, result);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

}