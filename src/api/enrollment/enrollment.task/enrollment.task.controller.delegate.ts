import {
    EnrollmentTaskService
} from '../../../database/repository.services/enrollment/enrollment.task.service';
import {
    ErrorHandler
} from '../../../common/error.handler';
import {
    EnrollmentTaskValidator as validator
} from './enrollment.task.validator';
import {
    uuid
} from '../../../domain.types/miscellaneous/system.types';
import {
    EnrollmentTaskSearchFilters,
    EnrollmentTaskSearchResults
} from '../../../domain.types/enrollment/enrollment.task.domain.types';

///////////////////////////////////////////////////////////////////////////////////////

export class EnrollmentTaskControllerDelegate {

    //#region member variables and constructors

    _service: EnrollmentTaskService = null;

    constructor() {
        this._service = new EnrollmentTaskService();
    }

    //#endregion

    getById = async (id: uuid) => {
        const record = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('Enrollment schedule with id ' + id.toString() + ' cannot be found!');
        }
        return this.getEnrichedDto(record);
    };

    search = async (query: any) => {
        await validator.validateSearchRequest(query);
        var filters: EnrollmentTaskSearchFilters = this.getSearchFilters(query);
        var searchResults: EnrollmentTaskSearchResults = await this._service.search(filters);
        var items = searchResults.Items.map(x => this.getSearchDto(x));
        items.sort((a, b) => {
            return a.CareplanActivityDay - b.CareplanActivityDay;
        });
        searchResults.Items = items;
        return searchResults;
    };

    ///////////////////////////////////////////////////////////////////////////////////////////////

    //#region Privates

    getSearchFilters = (query) => {

        var filters = {};

        var participantId = query.participantId ? query.participantId : null;
        if (participantId != null) {
            filters['ParticipantId'] = participantId;
        }
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
        var isRegistrationActivity = query.isRegistrationActivity ? query.isRegistrationActivity : null;
        if (isRegistrationActivity != null) {
            filters['IsRegistrationActivity'] = isRegistrationActivity;
        }
        var enrollmentId = query.enrollmentId ? query.enrollmentId : null;
        if (enrollmentId != null) {
            filters['EnrollmentId'] = enrollmentId;
        }
        var scheduledDate = query.scheduledDate ? query.scheduledDate : null;
        if (scheduledDate != null) {
            filters['ScheduledDate'] = scheduledDate;
        }
        var orderBy = query.orderBy ? query.orderBy : null;
        if (orderBy != null) {
            filters['OrderBy'] = orderBy;
        }
        var itemsPerPage = query.itemsPerPage ? query.itemsPerPage : 120;
        if (itemsPerPage != null) {
            filters['ItemsPerPage'] = parseInt(itemsPerPage);
        }
        var order = query.order ? query.order : null;
        if (order != null) {
            filters['Order'] = order;
        }
        var pageIndex = query.pageIndex ? query.pageIndex : null;
        if (pageIndex != null) {
            filters['PageIndex'] = parseInt(pageIndex);
        }
        return filters;
    };

    getEnrichedDto = (record) => {
        if (record == null) {
            return null;
        }
        return {
            id                     : record.id,
            ParticipantId          : record.ParticipantId,
            EnrollmentId           : record.EnrollmentId,
            UserId                 : record.UserId,
            CareplanActivityId     : record.CareplanActivityId,
            AssetId                : record.AssetId,
            AssetType              : record.AssetType,
            Asset                  : record.Asset,
            CareplanId             : record.CareplanId,
            TimeSlot               : record.TimeSlot,
            ScheduledDate          : record.ScheduledDate,
            IsRegistrationActivity : record.IsRegistrationActivity
        };
    };

    getSearchDto = (record) => {
        if (record == null) {
            return null;
        }
        return {
            id                     : record.id,
            EnrollmentId           : record.EnrollmentId,
            ParticipantId          : record.ParticipantId,
            CareplanActivityId     : record.CareplanActivityId,
            CareplanActivityDay    : record.CareplanActivity.Day,
            AssetId                : record.AssetId,
            AssetType              : record.AssetType,
            Asset                  : record.Asset,
            CareplanId             : record.CareplanId,
            TimeSlot               : record.TimeSlot,
            ScheduledDate          : record.ScheduledDate,
            IsRegistrationActivity : record.IsRegistrationActivity,
            CreatedAt              : record.CreatedAt,
        };
    };

    //#endregion

}
///////////////////////////////////////////////////////////////////////////////////////////////
