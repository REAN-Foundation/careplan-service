/* eslint-disable key-spacing */
import {
    EnrollmentService
} from '../../../database/repository.services/enrollment/enrollment.service';
import {
    EnrollmentTaskService
} from '../../../database/repository.services/enrollment/enrollment.task.service';
import {
    ErrorHandler
} from '../../../common/error.handler';
import {
    Helper
} from '../../../common/helper';
import {
    ApiError
} from '../../../common/api.error';
import {
    EnrollmentValidator as validator
} from './enrollment.validator';
import {
    uuid
} from '../../../domain.types/miscellaneous/system.types';
import {
    CareplanActivityControllerDelegate
} from '../../careplan/careplan.activity/careplan.activity.controller.delegate';
import {
    EnrollmentCreateModel,
    EnrollmentUpdateModel,
    EnrollmentSearchFilters,
    EnrollmentSearchResults
} from '../../../domain.types/enrollment/enrollment.domain.types';
import { EnrollmentTaskCreateModel } from '../../../domain.types/enrollment/enrollment.task.domain.types';
import { TimeHelper } from '../../../common/time.helper';
import { DurationType } from '../../../domain.types/miscellaneous/time.types';
import { Logger } from '../../../common/logger';

///////////////////////////////////////////////////////////////////////////////////////

export class EnrollmentControllerDelegate {

    //#region member variables and constructors

    _service: EnrollmentService = null;

    _careplanActivityDelegate: CareplanActivityControllerDelegate = null;

    _scheduleService: EnrollmentTaskService = null;

    constructor() {
        this._service = new EnrollmentService();
        this._careplanActivityDelegate = new CareplanActivityControllerDelegate();
        this._scheduleService = new EnrollmentTaskService();
    }

    //#endregion

    create = async (requestBody: any) => {
        await validator.validateCreateRequest(requestBody);
        var createModel: EnrollmentCreateModel = this.getCreateModel(requestBody);
        const record = await this._service.create(createModel);
        if (record === null) {
            throw new ApiError('Unable to create enrollment!', 400);
        }

        const careplanActivity = await this._careplanActivityDelegate.search({ careplanId : record.CareplanId });
        const scheduleDate = TimeHelper.addDuration(
            record.StartDate,
            careplanActivity.Items[0].Day - 1,
            DurationType.Day
        );

        var enrollmentTaskModel: EnrollmentTaskCreateModel = {

            EnrollmentId       : record.id,
            ParticipantId      : record.ParticipantId,
            CareplanId         : record.CareplanId,
            CareplanActivityId : careplanActivity.Items[0].id,
            AssetId            : careplanActivity.Items[0].AssetId,
            AssetType          : careplanActivity.Items[0].AssetType,
            TimeSlot           : careplanActivity.Items[0].TimeSlot,
            ScheduledDate      : scheduleDate
        };

        try {
            const enrollmentTaskRecord = await this._scheduleService.create(enrollmentTaskModel);
            Logger.instance().log(JSON.stringify(enrollmentTaskRecord, null, 2));
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to create enrollment schedule!', error);
        }

        return this.getEnrichedDto(record);
    }

    getById = async (id: uuid) => {
        const record = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('Enrollment with id ' + id.toString() + ' cannot be found!');
        }
        return this.getEnrichedDto(record);
    }

    search = async (query: any) => {
        await validator.validateSearchRequest(query);
        var filters: EnrollmentSearchFilters = this.getSearchFilters(query);
        var searchResults: EnrollmentSearchResults = await this._service.search(filters);
        var items = searchResults.Items.map(x => this.getSearchDto(x));
        searchResults.Items = items;
        return searchResults;
    }

    update = async (id: uuid, requestBody: any) => {
        await validator.validateUpdateRequest(requestBody);
        const record = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('Enrollment with id ' + id.toString() + ' cannot be found!');
        }
        const updateModel: EnrollmentUpdateModel = this.getUpdateModel(requestBody);
        const updated = await this._service.update(id, updateModel);
        if (updated == null) {
            throw new ApiError('Unable to update enrollment!', 400);
        }
        return this.getEnrichedDto(updated);
    }

    delete = async (id: uuid) => {
        const record = await this._service.getById(id);
        if (record == null) {
            ErrorHandler.throwNotFoundError('Enrollment with id ' + id.toString() + ' cannot be found!');
        }
        const enrollmentDeleted: boolean = await this._service.delete(id);
        return {
            Deleted : enrollmentDeleted
        };
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////

    //#region Privates

    getSearchFilters = (query) => {

        var filters = {};

        var careplanId = query.careplanId ? query.careplanId : null;
        if (careplanId != null) {
            filters['CareplanId'] = careplanId;
        }
        var progressStatus = query.progressStatus ? query.progressStatus : null;
        if (progressStatus != null) {
            filters['ProgressStatus'] = progressStatus;
        }

        return filters;
    }

    getUpdateModel = (requestBody): EnrollmentUpdateModel => {

        const updateModel: EnrollmentUpdateModel = {};

        if (Helper.hasProperty(requestBody, 'CareplanId')) {
            updateModel.CareplanId = requestBody.CareplanId;
        }
        if (Helper.hasProperty(requestBody, 'ParticipantId')) {
            updateModel.ParticipantId = requestBody.ParticipantId;
        }
        if (Helper.hasProperty(requestBody, 'StartDate')) {
            updateModel.StartDate = requestBody.StartDate;
        }
        if (Helper.hasProperty(requestBody, 'EndDate')) {
            updateModel.EndDate = requestBody.EndDate;
        }
        if (Helper.hasProperty(requestBody, 'EnrollmentDate')) {
            updateModel.EnrollmentDate = requestBody.EnrollmentDate;
        }

        return updateModel;
    }

    getCreateModel = (requestBody): EnrollmentCreateModel => {
        return {
            CareplanId     : requestBody.CareplanId ? requestBody.CareplanId : null,
            ParticipantId  : requestBody.ParticipantId ? requestBody.ParticipantId : null,
            StartDate      : requestBody.StartDate ? requestBody.StartDate : null,
            EndDate        : requestBody.EndDate ? requestBody.EndDate : null,
            EnrollmentDate : requestBody.EnrollmentDate ? requestBody.EnrollmentDate : null
        };
    }

    getEnrichedDto = (record) => {
        if (record == null) {
            return null;
        }
        return {
            id             : record.id,
            CareplanId     : record.CareplanId,
            ParticipantId  : record.ParticipantId,
            StartDate      : record.StartDate,
            EndDate        : record.EndDate,
            EnrollmentDate : record.EnrollmentDate,
            ProgressStatus : record.ProgressStatus
        };
    }

    getSearchDto = (record) => {
        if (record == null) {
            return null;
        }
        return {
            id             : record.id,
            CareplanId     : record.CareplanId,
            ParticipantId  : record.ParticipantId,
            StartDate      : record.StartDate,
            EndDate        : record.EndDate,
            EnrollmentDate : record.EnrollmentDate,
            ProgressStatus : record.ProgressStatus
        };
    }

    //#endregion

}
///////////////////////////////////////////////////////////////////////////////////////////////
