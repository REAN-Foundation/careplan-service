import {
    ParticipantSelectedPriorityService
} from '../../../database/repository.services/participant.responses/participant.selected.priority.service';
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
    ParticipantSelectedPriorityValidator as validator
} from './participant.selected.priority.validator';
import {
    uuid
} from '../../../domain.types/miscellaneous/system.types';
import {
    ParticipantSelectedPriorityCreateModel,
    ParticipantSelectedPriorityUpdateModel,
    ParticipantSelectedPrioritySearchFilters,
    ParticipantSelectedPrioritySearchResults
} from '../../../domain.types/participant.responses/participant.selected.priority.domain.types';

///////////////////////////////////////////////////////////////////////////////////////

export class ParticipantSelectedPriorityControllerDelegate {

    //#region member variables and constructors

    _service: ParticipantSelectedPriorityService = null;

    constructor() {
        this._service = new ParticipantSelectedPriorityService();
    }

    //#endregion

    create = async (requestBody: any) => {
        await validator.validateCreateRequest(requestBody);
        var createModel: ParticipantSelectedPriorityCreateModel = this.getCreateModel(requestBody);
        const record = await this._service.create(createModel);
        if (record === null) {
            throw new ApiError('Unable to create participant selected priority!', 400);
        }
        return this.getEnrichedDto(record);
    };

    getById = async (id: uuid) => {
        const record = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('Participant selected priority with id ' + id.toString() + ' cannot be found!');
        }
        return this.getEnrichedDto(record);
    };

    search = async (query: any) => {
        await validator.validateSearchRequest(query);
        var filters: ParticipantSelectedPrioritySearchFilters = this.getSearchFilters(query);
        var searchResults: ParticipantSelectedPrioritySearchResults = await this._service.search(filters);
        var items = searchResults.Items.map(x => this.getSearchDto(x));
        searchResults.Items = items;
        return searchResults;
    };

    update = async (id: uuid, requestBody: any) => {
        await validator.validateUpdateRequest(requestBody);
        const record = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('Participant selected priority with id ' + id.toString() + ' cannot be found!');
        }
        const updateModel: ParticipantSelectedPriorityUpdateModel = this.getUpdateModel(requestBody);
        const updated = await this._service.update(id, updateModel);
        if (updated == null) {
            throw new ApiError('Unable to update participant selected priority!', 400);
        }
        return this.getEnrichedDto(updated);
    };

    delete = async (id: uuid) => {
        const record = await this._service.getById(id);
        if (record == null) {
            ErrorHandler.throwNotFoundError('Participant selected priority with id ' + id.toString() + ' cannot be found!');
        }
        const participantSelectedPriorityDeleted: boolean = await this._service.delete(id);
        return {
            Deleted : participantSelectedPriorityDeleted
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
        var startDate = query.startDate ? query.startDate : null;
        if (startDate != null) {
            filters['StartDate'] = startDate;
        }

        return filters;
    };

    getUpdateModel = (requestBody): ParticipantSelectedPriorityUpdateModel => {

        const updateModel: ParticipantSelectedPriorityUpdateModel = {};

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
        if (Helper.hasProperty(requestBody, 'StartDate')) {
            updateModel.StartDate = requestBody.StartDate;
        }

        return updateModel;
    };

    getCreateModel = (requestBody): ParticipantSelectedPriorityCreateModel => {
        return {
            Name          : requestBody.Name ? requestBody.Name : null,
            Description   : requestBody.Description ? requestBody.Description : null,
            EnrollmentId  : requestBody.EnrollmentId ? requestBody.EnrollmentId : null,
            ParticipantId : requestBody.ParticipantId ? requestBody.ParticipantId : null,
            CareplanId    : requestBody.CareplanId ? requestBody.CareplanId : null,
            AssetId       : requestBody.AssetId ? requestBody.AssetId : null,
            AssetType     : requestBody.AssetType ? requestBody.AssetType : null,
            AssetCode     : requestBody.AssetCode ? requestBody.AssetCode : null,
            StartDate     : requestBody.StartDate ? requestBody.StartDate : null
        };
    };

    getEnrichedDto = (record) => {
        if (record == null) {
            return null;
        }
        return {
            id            : record.id,
            Name          : record.Name,
            Description   : record.Description,
            EnrollmentId  : record.EnrollmentId,
            ParticipantId : record.ParticipantId,
            CareplanId    : record.CareplanId,
            AssetId       : record.AssetId,
            AssetType     : record.AssetType,
            AssetCode     : record.AssetCode,
            StartDate     : record.StartDate
        };
    };

    getSearchDto = (record) => {
        if (record == null) {
            return null;
        }
        return {
            id            : record.id,
            Name          : record.Name,
            Description   : record.Description,
            EnrollmentId  : record.EnrollmentId,
            ParticipantId : record.ParticipantId,
            CareplanId    : record.CareplanId,
            AssetId       : record.AssetId,
            AssetType     : record.AssetType,
            AssetCode     : record.AssetCode,
            StartDate     : record.StartDate
        };
    };

    //#endregion

}
///////////////////////////////////////////////////////////////////////////////////////////////
