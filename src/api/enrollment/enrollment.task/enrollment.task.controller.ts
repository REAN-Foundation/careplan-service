import express from 'express';
import {
    ResponseHandler
} from '../../../common/response.handler';
import {
    EnrollmentTaskControllerDelegate
} from './enrollment.task.controller.delegate';
import {
    BaseController
} from '../../base.controller';

///////////////////////////////////////////////////////////////////////////////////////

export class EnrollmentTaskController extends BaseController {

    //#region member variables and constructors

    _delegate: EnrollmentTaskControllerDelegate = null;

    constructor() {
        super();
        this._delegate = new EnrollmentTaskControllerDelegate();
    }

    //#endregion

    getById = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('EnrollmentTask.GetById', request, response, false);
            const record = await this._delegate.getById(request.params.id);
            const message = 'Enrollment schedule retrieved successfully!';
            ResponseHandler.success(request, response, message, 200, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    search = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('EnrollmentTask.Search', request, response, false);
            const searchResults = await this._delegate.search(request.query);
            const message = 'Enrollment schedule records retrieved successfully!';
            ResponseHandler.success(request, response, message, 200, searchResults);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

}
