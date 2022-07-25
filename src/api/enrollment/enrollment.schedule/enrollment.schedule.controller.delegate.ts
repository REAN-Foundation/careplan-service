import {
    EnrollmentScheduleService
} from '../../../database/repository.services/enrollment/enrollment.schedule.service';
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
    EnrollmentScheduleValidator as validator
} from './enrollment.schedule.validator';
import {
    uuid
} from '../../../domain.types/miscellaneous/system.types';
import {
    EnrollmentScheduleUpdateModel,
    EnrollmentScheduleSearchFilters,
    EnrollmentScheduleSearchResults
} from '../../../domain.types/enrollment/enrollment.schedule.domain.types';

///////////////////////////////////////////////////////////////////////////////////////

export class EnrollmentScheduleControllerDelegate {

    //#region member variables and constructors

    _service: EnrollmentScheduleService = null;

    constructor() {
        this._service = new EnrollmentScheduleService();
    }

    //#endregion

    getById = async (id: uuid) => {
        const record = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('Enrollment schedule with id ' + id.toString() + ' cannot be found!');
        }
        return this.getEnrichedDto(record);
    }

    search = async (query: any) => {
        await validator.validateSearchRequest(query);
        var filters: EnrollmentScheduleSearchFilters = this.getSearchFilters(query);
        var searchResults: EnrollmentScheduleSearchResults = await this._service.search(filters);
        var items = searchResults.Items.map(x => this.getSearchDto(x));
        searchResults.Items = items;
        return searchResults;
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////

    //#region Privates

    getSearchFilters = (query) => {

        var filters = {};

        var assetId = query.assetId ? query.assetId : null;
        if (assetId != null) {
            filters['AssetId'] = assetId;
        }
        var assetType = query.assetType ? query.assetType : null;
        if (assetType != null) {
            filters['AssetType'] = assetType;
        }
        var careplanId = query.careplanId ? query.careplanId : null;
        if (careplanId != null) {
            filters['CareplanId'] = careplanId;
        }
        var timeSlot = query.timeSlot ? query.timeSlot : null;
        if (timeSlot != null) {
            filters['TimeSlot'] = timeSlot;
        }

        return filters;
    }

    getEnrichedDto = (record) => {
        if (record == null) {
            return null;
        }
        return {
            id                 : record.id,
            EnrollmentId       : record.EnrollmentId,
            UserId             : record.UserId,
            CareplanScheduleId : record.CareplanScheduleId,
            AssetId            : record.AssetId,
            AssetType          : record.AssetType,
            CareplanId         : record.CareplanId,
            TimeSlot           : record.TimeSlot,
            ScheduledDate      : record.ScheduledDate
        };
    }

    getSearchDto = (record) => {
        if (record == null) {
            return null;
        }
        return {
            id                 : record.id,
            EnrollmentId       : record.EnrollmentId,
            ParticipantId      : record.ParticipantId,
            CareplanScheduleId : record.CareplanScheduleId,
            AssetId            : record.AssetId,
            AssetType          : record.AssetType,
            CareplanId         : record.CareplanId,
            TimeSlot           : record.TimeSlot,
            ScheduledDate      : record.ScheduledDate
        };
    }

    //#endregion

}
///////////////////////////////////////////////////////////////////////////////////////////////
