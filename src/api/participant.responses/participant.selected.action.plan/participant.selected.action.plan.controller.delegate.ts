import {
    ParticipantSelectedActionPlanService
} from '../../../database/repository.services/participant.responses/participant.selected.action.plan.service';
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
    ParticipantSelectedActionPlanValidator as validator
} from './participant.selected.action.plan.validator';
import {
    uuid
} from '../../../domain.types/miscellaneous/system.types';
import {
    ParticipantSelectedActionPlanCreateModel,
    ParticipantSelectedActionPlanUpdateModel,
    ParticipantSelectedActionPlanSearchFilters,
    ParticipantSelectedActionPlanSearchResults
} from '../../../domain.types/participant.responses/participant.selected.action.plan.domain.types';

///////////////////////////////////////////////////////////////////////////////////////

export class ParticipantSelectedActionPlanControllerDelegate {

    //#region member variables and constructors

    _service: ParticipantSelectedActionPlanService = null;

    constructor() {
        this._service = new ParticipantSelectedActionPlanService();
    }

    //#endregion

    create = async (requestBody: any) => {
        await validator.validateCreateRequest(requestBody);
        var createModel: ParticipantSelectedActionPlanCreateModel = this.getCreateModel(requestBody);
        const record = await this._service.create(createModel);
        if (record === null) {
            throw new ApiError('Unable to create participant selected action plan!', 400);
        }
        return this.getEnrichedDto(record);
    };

    getById = async (id: uuid) => {
        const record = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('User selected action plan with id ' + id.toString() + ' cannot be found!');
        }
        return this.getEnrichedDto(record);
    };

    search = async (query: any) => {
        await validator.validateSearchRequest(query);
        var filters: ParticipantSelectedActionPlanSearchFilters = this.getSearchFilters(query);
        var searchResults: ParticipantSelectedActionPlanSearchResults = await this._service.search(filters);
        var items = searchResults.Items.map(x => this.getSearchDto(x));
        searchResults.Items = items;
        return searchResults;
    };

    update = async (id: uuid, requestBody: any) => {
        await validator.validateUpdateRequest(requestBody);
        const record = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('Participant selected action plan with id ' + id.toString() + ' cannot be found!');
        }
        const updateModel: ParticipantSelectedActionPlanUpdateModel = this.getUpdateModel(requestBody);
        const updated = await this._service.update(id, updateModel);
        if (updated == null) {
            throw new ApiError('Unable to update participant selected action plan!', 400);
        }
        return this.getEnrichedDto(updated);
    };

    delete = async (id: uuid) => {
        const record = await this._service.getById(id);
        if (record == null) {
            ErrorHandler.throwNotFoundError('Participant selected action plan with id ' + id.toString() + ' cannot be found!');
        }
        const participantSelectedActionPlanDeleted: boolean = await this._service.delete(id);
        return {
            Deleted : participantSelectedActionPlanDeleted
        };
    };

    ///////////////////////////////////////////////////////////////////////////////////////////////

    //#region Privates

    getSearchFilters = (query) => {

        var filters = {};

        var enrollmentId = query.enrollmentId ? query.enrollmentId : null;
        if (enrollmentId != null) {
            filters['EnrollmentId'] = enrollmentId;
        }
        var participantId = query.participantId ? query.participantId : null;
        if (participantId != null) {
            filters['ParticipantId'] = participantId;
        }
        var selectedGoalId = query.selectedGoalId ? query.selectedGoalId : null;
        if (selectedGoalId != null) {
            filters['SelectedGoalId'] = selectedGoalId;
        }
        var name = query.name ? query.name : null;
        if (name != null) {
            filters['Name'] = name;
        }
        var description = query.description ? query.description : null;
        if (description != null) {
            filters['Description'] = description;
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
        var assetCode = query.assetCode ? query.assetCode : null;
        if (assetCode != null) {
            filters['AssetCode'] = assetCode;
        }
        var additionalDetails = query.additionalDetails ? query.additionalDetails : null;
        if (additionalDetails != null) {
            filters['AdditionalDetails'] = additionalDetails;
        }
        var startDate = query.startDate ? query.startDate : null;
        if (startDate != null) {
            filters['StartDate'] = startDate;
        }
        var endDate = query.endDate ? query.endDate : null;
        if (endDate != null) {
            filters['EndDate'] = endDate;
        }
        var progressStatus = query.progressStatus ? query.progressStatus : null;
        if (progressStatus != null) {
            filters['ProgressStatus'] = progressStatus;
        }

        return filters;
    };

    getUpdateModel = (requestBody): ParticipantSelectedActionPlanUpdateModel => {

        const updateModel: ParticipantSelectedActionPlanUpdateModel = {};

        if (Helper.hasProperty(requestBody, 'Name')) {
            updateModel.Name = requestBody.Name;
        }
        if (Helper.hasProperty(requestBody, 'Description')) {
            updateModel.Description = requestBody.Description;
        }
        if (Helper.hasProperty(requestBody, 'EnrollmentId')) {
            updateModel.EnrollmentId = requestBody.EnrollmentId;
        }
        if (Helper.hasProperty(requestBody, 'ParticipantId')) {
            updateModel.ParticipantId = requestBody.ParticipantId;
        }
        if (Helper.hasProperty(requestBody, 'SelectedGoalId')) {
            updateModel.SelectedGoalId = requestBody.SelectedGoalId;
        }
        if (Helper.hasProperty(requestBody, 'CareplanId')) {
            updateModel.CareplanId = requestBody.CareplanId;
        }
        if (Helper.hasProperty(requestBody, 'AssetId')) {
            updateModel.AssetId = requestBody.AssetId;
        }
        if (Helper.hasProperty(requestBody, 'AssetType')) {
            updateModel.AssetType = requestBody.AssetType;
        }
        if (Helper.hasProperty(requestBody, 'AssetCode')) {
            updateModel.AssetCode = requestBody.AssetCode;
        }
        if (Helper.hasProperty(requestBody, 'AdditionalDetails')) {
            updateModel.AdditionalDetails = requestBody.AdditionalDetails;
        }
        if (Helper.hasProperty(requestBody, 'StartDate')) {
            updateModel.StartDate = requestBody.StartDate;
        }
        if (Helper.hasProperty(requestBody, 'EndDate')) {
            updateModel.EndDate = requestBody.EndDate;
        }

        return updateModel;
    };

    getCreateModel = (requestBody): ParticipantSelectedActionPlanCreateModel => {
        return {
            Name              : requestBody.Name ? requestBody.Name : null,
            Description       : requestBody.Description ? requestBody.Description : null,
            EnrollmentId      : requestBody.EnrollmentId ? requestBody.EnrollmentId : null,
            ParticipantId     : requestBody.ParticipantId ? requestBody.ParticipantId : null,
            SelectedGoalId    : requestBody.SelectedGoalId ? requestBody.SelectedGoalId : null,
            CareplanId        : requestBody.CareplanId ? requestBody.CareplanId : null,
            AssetId           : requestBody.AssetId ? requestBody.AssetId : null,
            AssetType         : requestBody.AssetType ? requestBody.AssetType : null,
            AssetCode         : requestBody.AssetCode ? requestBody.AssetCode : null,
            AdditionalDetails : requestBody.AdditionalDetails ? requestBody.AdditionalDetails : null,
            StartDate         : requestBody.StartDate ? requestBody.StartDate : null,
            EndDate           : requestBody.EndDate ? requestBody.EndDate : null
        };
    };

    getEnrichedDto = (record) => {
        if (record == null) {
            return null;
        }
        return {
            id                : record.id,
            Name              : record.Name,
            Description       : record.Description,
            EnrollmentId      : record.EnrollmentId,
            ParticipantId     : record.ParticipantId,
            SelectedGoalId    : record.SelectedGoalId,
            CareplanId        : record.CareplanId,
            AssetId           : record.AssetId,
            AssetType         : record.AssetType,
            AssetCode         : record.AssetCode,
            AdditionalDetails : record.AdditionalDetails,
            StartDate         : record.StartDate,
            EndDate           : record.EndDate,
            ProgressStatus    : record.ProgressStatus
        };
    };

    getSearchDto = (record) => {
        if (record == null) {
            return null;
        }
        return {
            id                : record.id,
            Name              : record.Name,
            Description       : record.Description,
            EnrollmentId      : record.EnrollmentId,
            ParticipantId     : record.ParticipantId,
            SelectedGoalId    : record.SelectedGoalId,
            CareplanId        : record.CareplanId,
            AssetId           : record.AssetId,
            AssetType         : record.AssetType,
            AssetCode         : record.AssetCode,
            AdditionalDetails : record.AdditionalDetails,
            StartDate         : record.StartDate,
            EndDate           : record.EndDate,
            ProgressStatus    : record.ProgressStatus
        };
    };

    //#endregion

}
///////////////////////////////////////////////////////////////////////////////////////////////
