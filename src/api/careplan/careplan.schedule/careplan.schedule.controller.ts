import express from 'express';
import {
    ResponseHandler
} from '../../../common/response.handler';
import {
    CareplanScheduleControllerDelegate
} from './careplan.schedule.controller.delegate';
import {
    BaseController
} from '../../base.controller';

///////////////////////////////////////////////////////////////////////////////////////

export class CareplanScheduleController extends BaseController {

    //#region member variables and constructors

    _delegate: CareplanScheduleControllerDelegate = null;

    constructor() {
        super();
        this._delegate = new CareplanScheduleControllerDelegate();
    }

    //#endregion

    create = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('CareplanSchedule.Create', request, response);
            const record = await this._delegate.create(request.body);
            const message = 'Careplan schedule added successfully!';
            ResponseHandler.success(request, response, message, 201, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    }

    getById = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('CareplanSchedule.GetById', request, response);
            const record = await this._delegate.getById(request.params.id);
            const message = 'Careplan schedule retrieved successfully!';
            ResponseHandler.success(request, response, message, 200, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    }

    search = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('CareplanSchedule.Search', request, response);
            const searchResults = await this._delegate.search(request.query);
            const message = 'Careplan schedule records retrieved successfully!';
            ResponseHandler.success(request, response, message, 200, searchResults);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    }

    update = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('CareplanSchedule.Update', request, response);
            const updatedRecord = await this._delegate.update(request.params.id, request.body);
            const message = 'Careplan schedule updated successfully!';
            ResponseHandler.success(request, response, message, 200, updatedRecord);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    }

    delete = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('CareplanSchedule.Delete', request, response);
            const result = await this._delegate.delete(request.params.id);
            const message = 'Careplan schedule deleted successfully!';
            ResponseHandler.success(request, response, message, 200, result);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

}
