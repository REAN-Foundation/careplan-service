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
import { uuid } from '../../../domain.types/miscellaneous/system.types';
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
import { ParticipantService } from '../../../database/repository.services/enrollment/participant.service';
import { CareplanService } from '../../../database/repository.services/careplan/careplan.service';
import { CareplanActivityService } from '../../../database/repository.services/careplan/careplan.activity.service';
import { ParticipantActivityResponseService } from '../../../database/repository.services/participant.responses/participant.activity.response.service';

///////////////////////////////////////////////////////////////////////////////////////

export class EnrollmentControllerDelegate {

    //#region member variables and constructors

    _service: EnrollmentService = null;

    _careplanActivityService: CareplanActivityService = null;

    _enrollmentTaskService: EnrollmentTaskService = null;

    _participantService: ParticipantService = null;

    _careplanService: CareplanService = null;

    _participantActivityResponseService: ParticipantActivityResponseService = null;

    constructor() {
        this._service = new EnrollmentService();
        this._careplanActivityService = new CareplanActivityService();
        this._enrollmentTaskService = new EnrollmentTaskService();
        this._participantService = new ParticipantService();
        this._careplanService = new CareplanService();
        this._participantActivityResponseService = new ParticipantActivityResponseService();
    }

    //#endregion

    create = async (requestBody: any) => {

        await validator.validateCreateRequest(requestBody);

        var participantId = requestBody.ParticipantId;
        const participant = await this._participantService.getById(participantId);
        if (!participant) {
            ErrorHandler.throwNotFoundError(`Participant not found!`);
        }

        var planCode = requestBody.PlanCode;
        const careplanId = await this._careplanService.exists(planCode);
        if (!careplanId) {
            ErrorHandler.throwNotFoundError(`Careplan not found!`);
        }
        requestBody.CareplanId = careplanId;

        var createModel: EnrollmentCreateModel = this.getCreateModel(requestBody);
        let record = await this._service.create(createModel);
        if (record === null) {
            throw new ApiError('Unable to create enrollment!', 400);
        }

        const date = await Helper.formatDate(new Date());
        const displayId = await Helper.generateDisplayId(date);
        record = await this._service.update(record.id, { DisplayId: displayId });
        if (record == null) {
            ErrorHandler.throwInternalServerError('Unable to update displayId!');
        }

        await this.generateRegistrationTasks(record);
        await this.generateScheduledTasks(record);

        return this.getEnrichedDto(record);
    };

    getById = async (id: uuid) => {
        const record = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('Enrollment with id ' + id.toString() + ' cannot be found!');
        }
        return this.getEnrichedDto(record);
    };

    search = async (query: any) => {
        await validator.validateSearchRequest(query);
        var filters: EnrollmentSearchFilters = this.getSearchFilters(query);
        var searchResults: EnrollmentSearchResults = await this._service.search(filters);
        var items = searchResults.Items.map(x => this.getSearchDto(x));
        searchResults.Items = items;
        return searchResults;
    };

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
    };

    delete = async (id: uuid) => {
        const record = await this._service.getById(id);
        if (record == null) {
            ErrorHandler.throwNotFoundError('Enrollment with id ' + id.toString() + ' cannot be found!');
        }
        const enrollmentDeleted: boolean = await this._service.delete(id);
        return {
            Deleted : enrollmentDeleted
        };
    };

    getEnrollmentStats = async (participantId : uuid) => {
        const record = await this._service.getEnrollmentStats(participantId);
        if (record === null) {
            ErrorHandler.throwNotFoundError('Enrollment stats with id ' + participantId.toString() + ' cannot be found!');
        }
        return this.getEnrichedDtoForStat(record);
    };
    ///////////////////////////////////////////////////////////////////////////////////////////////

    //#region Privates

    generateRegistrationTasks = async(record) => {

        try {

            const registrationActivities =
                await this._careplanActivityService.getRegistrationActivities(record.CareplanId);

            const enrollmentDate = record.StartDate;
            var count = 0;
            const timeOffset = 15; //seconds

            for await (var act of registrationActivities) {

                count++;
                const dt = TimeHelper.addDuration(enrollmentDate, 435 + act.Day * timeOffset, DurationType.Minute);

                var createModel: EnrollmentTaskCreateModel = {
                    EnrollmentId       : record.id,
                    ParticipantId      : record.ParticipantId,
                    CareplanId         : record.CareplanId,
                    CareplanActivityId : act.id,
                    AssetId            : act.AssetId,
                    AssetType          : act.AssetType,
                    TimeSlot           : act.TimeSlot,
                    IsRegistrationActivity : true,
                    ScheduledDate      : dt
                };

                const activity = await this._enrollmentTaskService.create(createModel);
                Logger.instance().log(`Registration activity: ${count} \n${JSON.stringify(activity, null, 2)}`);
            }

        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to create enrollment registration tasks!', error);
        }

    };

    generateScheduledTasks = async(record) => {

        try {

            const scheduledActivities =
                await this._careplanActivityService.getScheduledActivities(record.CareplanId);

            const startDate = record.StartDate;

            const calculatedOffset =
                (record.WeekOffset ? (record.WeekOffset * 7) : 0) + (record.DayOffset ? record.DayOffset : 0);

            const filtered = scheduledActivities.filter( (x) => x.Day >= calculatedOffset);

            for await (var act of filtered) {

                var daysToAdd =  act.Day - calculatedOffset;
                if (daysToAdd < 0) {
                    daysToAdd = 0;
                }
                let addDate = daysToAdd / 3;
                if (daysToAdd % 3 !== 0) {
                    addDate = addDate + 1;
                }
                let dt = TimeHelper.addDuration(startDate, parseInt(addDate.toString()) - 1, DurationType.Day);

                if (daysToAdd % 3 === 0) {
                    dt = TimeHelper.addDuration(dt, 435 + 3 * 15, DurationType.Minute);
                } else {
                    dt = TimeHelper.addDuration(dt, 435 + (daysToAdd % 3) * 15, DurationType.Minute);
                }

                var createModel: EnrollmentTaskCreateModel = {
                    EnrollmentId       : record.id,
                    ParticipantId      : record.ParticipantId,
                    CareplanId         : record.CareplanId,
                    CareplanActivityId : act.id,
                    AssetId            : act.AssetId,
                    AssetType          : act.AssetType,
                    TimeSlot           : act.TimeSlot,
                    IsRegistrationActivity : false,
                    ScheduledDate      : dt
                };

                const activity = await this._enrollmentTaskService.create(createModel);
                Logger.instance().log(`Scheduled activity for day: ${act.Day} \n${JSON.stringify(activity, null, 2)}`);
            }

        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to create enrollment scheduled tasks!', error);
        }
    };

    getSearchFilters = (query) => {

        var filters = {};

        var careplanId = query.careplanId ? query.careplanId : null;
        if (careplanId != null) {
            filters['CareplanId'] = careplanId;
        }
        var careplanName = query.careplanName ? query.careplanName : null;
        if (careplanName != null) {
            filters['careplanName'] = careplanName;
        }
        var carePlan = query.carePlan ? query.carePlan : null;
        if (carePlan != null) {
            filters['CarePlan'] = carePlan;
        }
        var participantId = query.participantId ? query.participantId : null;
        if (participantId != null) {
            filters['ParticipantId'] = participantId;
        }
        var progressStatus = query.progressStatus ? query.progressStatus : null;
        if (progressStatus != null) {
            filters['ProgressStatus'] = progressStatus;
        }
        var displayId = query.displayId ? query.displayId : null;
        if (displayId != null) {
            filters['DisplayId'] = displayId;
        }
        var startDate = query.startDate ? query.startDate : null;
        if (startDate != null) {
            filters['StartDate'] = startDate;
        }

        var endDate = query.endDate ? query.endDate : null;
        if (endDate != null) {
            filters['EndDate'] = endDate;
        }
        return filters;
    };

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
        if (Helper.hasProperty(requestBody, 'WeekOffset')) {
            updateModel.WeekOffset = requestBody.WeekOffset;
        }
        if (Helper.hasProperty(requestBody, 'DayOffset')) {
            updateModel.DayOffset = requestBody.DayOffset;
        }

        return updateModel;
    };

    getCreateModel = (requestBody): EnrollmentCreateModel => {
        return {
            CareplanId     : requestBody.CareplanId ? requestBody.CareplanId : null,
            PlanCode       : requestBody.PlanCode ? requestBody.PlanCode : null,
            ParticipantId  : requestBody.ParticipantId ? requestBody.ParticipantId : null,
            StartDate      : requestBody.StartDate ? requestBody.StartDate : new Date(),
            EndDate        : requestBody.EndDate ? requestBody.EndDate : null,
            WeekOffset     : requestBody.WeekOffset ? requestBody.WeekOffset : 0,
            DayOffset      : requestBody.DayOffset ? requestBody.DayOffset : 0,
            EnrollmentDate : requestBody.EnrollmentDate ? requestBody.EnrollmentDate : new Date()
        };
    };

    getEnrichedDto = (record) => {
        if (record == null) {
            return null;
        }
        return {
            id             : record.id,
            DisplayId      : record.DisplayId,
            CareplanId     : record.CareplanId,
            CareplanName   : record.CareplanName,
            ParticipantId  : record.ParticipantId,
            Asset          : record.Asset,
            StartDate      : record.StartDate,
            EndDate        : record.EndDate,
            EnrollmentDate : record.EnrollmentDate,
            WeekOffset     : record.WeekOffset,
            DayOffset      : record.DayOffset,
            ProgressStatus : record.ProgressStatus,
            Careplan       : record.Careplan,
            Participant    : record.Participant,
            Category       : record.Careplan.Catrgory,

        };
    };

    getSearchDto = (record) => {
        if (record == null) {
            return null;
        }
        return {
            id             : record.id,
            CareplanId     : record.CareplanId,
            CareplanName     : record.CareplanName,
            PlanCode       : record.PlanCode,
            ParticipantId  : record.ParticipantId,
            DisplayId      : record.DisplayId,
            Asset          : record.Asset,
            StartDate      : record.StartDate,
            EndDate        : record.EndDate,
            EnrollmentDate : record.EnrollmentDate,
            WeekOffset     : record.WeekOffset,
            DayOffset      : record.DayOffset,
            ProgressStatus : record.ProgressStatus,
            Careplan       : record.Careplan,
            Participant    : record.Participant,

        };
    };

    getEnrichedDtoForStat = (record) => {
        if (record == null) {
            return null;
        }
        return {
           
            TolalTask    : record.TolalTask ,
            FinishedTask : record.FinishedTask,
            DelayedTask  : record.DelayedTask,
            UnservedTask : record.UnservedTask,
            CurrentWeek  : record.CurrentWeek,
            TotalWeek    : record.TotalWeek
            
        };
    };

    //#endregion

}
///////////////////////////////////////////////////////////////////////////////////////////////
