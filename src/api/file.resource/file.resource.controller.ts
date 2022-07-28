import express from 'express';
import { ResponseHandler } from '../../common/response.handler';
import { FileResourceControllerDelegate } from './file.resource.controller.delegate';
import { BaseController } from '../base.controller';
import { Loader } from '../../startup/loader';
import { ErrorHandler } from '../../common/error.handler';

///////////////////////////////////////////////////////////////////////////////////////

export class FileResourceController extends BaseController {

    //#region member variables and constructors

    _delegate: FileResourceControllerDelegate = null;

    constructor() {
        super();
        this._delegate = Loader.Container.resolve(FileResourceControllerDelegate);
    }

    //#endregion

    upload = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('FileResource.Upload', request, response);
            const record = await this._delegate.upload(request);
            const message = 'File resource uploaded successfully!';
            ResponseHandler.success(request, response, message, 201, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    }

    download = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            const record = await this._delegate.getById(request.params.id);
            if (!record.Public) {
                var verified = await Loader.Authenticator.verifyUser(request);
                if (!verified) {
                    ErrorHandler.throwUnauthorizedUserError('User is not authorized to download the resource!');
                }
                await this.authorize('FileResource.Download', request, response);
            }
            var disposition = request.query.disposition as string;
            if (!disposition) {
                disposition = 'inline';
            }
            const downloadStream = await this._delegate.download(request.params.id, disposition, response);
            downloadStream.pipe(response);
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
