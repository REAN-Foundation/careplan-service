import express from 'express';
import {
    ResponseHandler
} from '../../../common/response.handler';
import {
    EnrollmentControllerDelegate
} from './enrollment.controller.delegate';
import {
    BaseController
} from '../../base.controller';

///////////////////////////////////////////////////////////////////////////////////////

export class EnrollmentController extends BaseController {

    //#region member variables and constructors

    _delegate: EnrollmentControllerDelegate = null;

    constructor() {
        super();

        this._delegate = new EnrollmentControllerDelegate();
    }

    //#endregion

    create = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('Enrollment.Create', request, response, false);
            const record = await this._delegate.create(request.body);
            const message = 'Enrollment added successfully!';
            ResponseHandler.success(request, response, message, 201, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getById = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('Enrollment.GetById', request, response, false);
            const record = await this._delegate.getById(request.params.id);
            const message = 'Enrollment retrieved successfully!';
            ResponseHandler.success(request, response, message, 200, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    search = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('Enrollment.Search', request, response, false);
            const searchResults = await this._delegate.search(request.query);
            const message = 'Enrollment records retrieved successfully!';
            ResponseHandler.success(request, response, message, 200, searchResults);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getEnrollmentStats = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('Enrollment.GetEnrollmentStats', request, response, false);
            const record = await this._delegate.getEnrollmentStats(request.params.participantId);
            const message = 'Enrollment stats retrieved successfully!';
            ResponseHandler.success(request, response, message, 200, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    }

    update = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('Enrollment.Update', request, response, false);
            const updatedRecord = await this._delegate.update(request.params.id, request.body);
            const message = 'Enrollment updated successfully!';
            ResponseHandler.success(request, response, message, 200, updatedRecord);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    delete = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('Enrollment.Delete', request, response, false);
            const result = await this._delegate.delete(request.params.id);
            const message = 'Enrollment deleted successfully!';
            ResponseHandler.success(request, response, message, 200, result);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

}
