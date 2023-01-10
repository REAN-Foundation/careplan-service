import {
    ParticipantActivityResponseService
} from '../../../database/repository.services/participant.responses/participant.activity.response.service';
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
    ParticipantActivityResponseValidator as validator
} from './participant.activity.response.validator';
import {
    uuid
} from '../../../domain.types/miscellaneous/system.types';
import {
    ParticipantActivityResponseCreateModel,
    ParticipantActivityResponseUpdateModel,
    ParticipantActivityResponseSearchFilters,
    ParticipantActivityResponseSearchResults
} from '../../../domain.types/participant.responses/participant.activity.response.domain.types';
import { EnrollmentTaskService } from '../../../database/repository.services/enrollment/enrollment.task.service';

///////////////////////////////////////////////////////////////////////////////////////

export class ParticipantActivityResponseControllerDelegate {

    //#region member variables and constructors

    _service: ParticipantActivityResponseService = null;

    _enrollmentTaskService: EnrollmentTaskService = null;

    constructor() {
        this._service = new ParticipantActivityResponseService();
        this._enrollmentTaskService = new EnrollmentTaskService();
    }

    //#endregion

    create = async (requestBody: any) => {
        await validator.validateCreateRequest(requestBody);
        const enrollmentTask = await this._enrollmentTaskService.getById(requestBody.EnrollmentTaskId);
        var createModel: ParticipantActivityResponseCreateModel = this.getCreateModel(requestBody, enrollmentTask);
        const record = await this._service.create(createModel);
        if (record === null) {
            throw new ApiError('Unable to create participant activity response!', 400);
        }
        return this.getEnrichedDto(record);
    };

    getById = async (id: uuid) => {
        const record = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('Participant activity response with id ' + id.toString() + ' cannot be found!');
        }
        return this.getEnrichedDto(record);
    };

    search = async (query: any) => {
        await validator.validateSearchRequest(query);
        var filters: ParticipantActivityResponseSearchFilters = this.getSearchFilters(query);
        var searchResults: ParticipantActivityResponseSearchResults = await this._service.search(filters);
        var items = searchResults.Items.map(x => this.getSearchDto(x));
        searchResults.Items = items;
        return searchResults;
    };

    update = async (id: uuid, requestBody: any) => {
        await validator.validateUpdateRequest(requestBody);
        const record = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('Participant activity response with id ' + id.toString() + ' cannot be found!');
        }
        const updateModel: ParticipantActivityResponseUpdateModel = this.getUpdateModel(requestBody);
        const updated = await this._service.update(id, updateModel);
        if (updated == null) {
            throw new ApiError('Unable to update participant activity response!', 400);
        }
        return this.getEnrichedDto(updated);
    };

    delete = async (id: uuid) => {
        const record = await this._service.getById(id);
        if (record == null) {
            ErrorHandler.throwNotFoundError('Participant activity response with id ' + id.toString() + ' cannot be found!');
        }
        const participantActivityResponseDeleted: boolean = await this._service.delete(id);
        return {
            Deleted : participantActivityResponseDeleted
        };
    };

    ///////////////////////////////////////////////////////////////////////////////////////////////

    //#region Privates

    getSearchFilters = (query) => {

        var filters = {};

        var participantId = query.participantId ? query.participantId : null;
        if (participantId != null) {
            filters['ParticipantId'] = participantId;
        }
        var careplanId = query.careplanId ? query.careplanId : null;
        if (careplanId != null) {
            filters['CareplanId'] = careplanId;
        }
        var assetId = query.assetId ? query.assetId : null;
        if (assetId != null) {
            filters['AssetId'] = assetId;
        }
        var assetType = query.assetType ? query.assetType : null;
        if (assetType != null) {
            filters['AssetType'] = assetType;
        }
        var response = query.response ? query.response : null;
        if (response != null) {
            filters['Response'] = response;
        }
        var timeResponded = query.timeResponded ? query.timeResponded : null;
        if (timeResponded != null) {
            filters['TimeResponded'] = timeResponded;
        }
        var progressStatus = query.progressStatus ? query.progressStatus : null;
        if (progressStatus != null) {
            filters['ProgressStatus'] = progressStatus;
        }

        return filters;
    };

    getUpdateModel = (requestBody): ParticipantActivityResponseUpdateModel => {

        const updateModel: ParticipantActivityResponseUpdateModel = {};

        if (Helper.hasProperty(requestBody, 'ParticipantId')) {
            updateModel.ParticipantId = requestBody.ParticipantId;
        }
        if (Helper.hasProperty(requestBody, 'EnrollmentTaskId')) {
            updateModel.EnrollmentTaskId = requestBody.EnrollmentTaskId;
        }
        if (Helper.hasProperty(requestBody, 'Response')) {
            updateModel.Response = JSON.stringify(requestBody.Response);
        }
        if (Helper.hasProperty(requestBody, 'ProgressStatus')) {
            updateModel.ProgressStatus = requestBody.ProgressStatus;
        }

        return updateModel;
    };

    getCreateModel = (requestBody, enrollmentTask): ParticipantActivityResponseCreateModel => {
        return {
            ParticipantId      : requestBody.ParticipantId ? requestBody.ParticipantId : null,
            EnrollmentTaskId   : requestBody.EnrollmentTaskId ? requestBody.EnrollmentTaskId : null,
            CareplanActivityId : enrollmentTask.CareplanActivityId ? enrollmentTask.CareplanActivityId : null,
            CareplanId         : enrollmentTask.CareplanId ? enrollmentTask.CareplanId : null ,
            AssetId            : enrollmentTask.AssetId ? enrollmentTask.AssetId : null,
            AssetType          : enrollmentTask.AssetType ? enrollmentTask.AssetType : null,
            Response           : requestBody.Response ? JSON.stringify(requestBody.Response) : JSON.stringify([]),
            TimeResponded      : new Date(),
            ProgressStatus     : requestBody.ProgressStatus ? requestBody.ProgressStatus : 'Completed'
        };
    };

    getEnrichedDto = (record) => {
        if (record == null) {
            return null;
        }
        return {
            id                 : record.id,
            ParticipantId      : record.ParticipantId,
            EnrollmentTaskId   : record.EnrollmentTaskId,
            CareplanActivityId : record.CareplanActivityId,
            CareplanId         : record.CareplanId,
            AssetId            : record.AssetId,
            AssetType          : record.AssetType,
            Response           : record.Response,
            TimeResponded      : record.TimeResponded,
            ProgressStatus     : record.ProgressStatus
        };
    };

    getSearchDto = (record) => {
        if (record == null) {
            return null;
        }
        return {
            id                 : record.id,
            ParticipantId      : record.ParticipantId,
            EnrollmentTaskId   : record.EnrollmentTaskId,
            CareplanActivityId : record.CareplanActivityId,
            CareplanId         : record.CareplanId,
            AssetId            : record.AssetId,
            AssetType          : record.AssetType,
            Response           : record.Response,
            TimeResponded      : record.TimeResponded,
            ProgressStatus     : record.ProgressStatus
        };
    };

    //#endregion

}
///////////////////////////////////////////////////////////////////////////////////////////////
