import * as joi from 'joi';
import {
    ErrorHandler
} from '../../../common/error.handler';

///////////////////////////////////////////////////////////////////////////////////////////////

export class EnrollmentValidator {

    static validateCreateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                CareplanId : joi.string().guid({
                    version : ['uuidv4']
                }).optional(),
                ParticipantId : joi.string().guid({
                    version : ['uuidv4']
                }).optional(),
                PlanCode       : joi.string().max(64).required(),
                StartDate      : joi.date().iso().optional(),
                EndDate        : joi.date().iso().optional().allow(null),
                WeekOffset     : joi.number().optional(),
                DayOffset      : joi.number().optional(),
                EnrollmentDate : joi.date().iso().optional(),
                IsTest         : joi.boolean().optional(),
                ScheduleType   : joi.string().optional(),
                TenantId       : joi.string().guid({
                    version : ['uuidv4']
                }).optional(),
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    static validateUpdateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                CareplanId : joi.string().guid({
                    version : ['uuidv4']
                }).optional(),
                ParticipantId : joi.string().guid({
                    version : ['uuidv4']
                }).optional(),
                StartDate : joi.date().iso().optional(),
                EndDate   : joi.date().iso().optional(),
                TenantId  : joi.string().guid({
                    version : ['uuidv4']
                }).optional(),
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    static validateSearchRequest = async (query) => {
        try {
            const schema = joi.object({
                careplanId : joi.string().guid({
                    version : ['uuidv4']
                }).optional(),
                displayId : joi.string().optional(),
                startDate : joi.date().iso().optional(),
                endDate   : joi.date().iso().optional(),
                tenantId  : joi.string().guid({
                    version : ['uuidv4']
                }).optional(),
                progressStatus : joi.string().valid("Pending", "In-progress", "Completed", "Cancelled", "Delayed", "Unknown").optional(),
                pageIndex      : joi.number().min(0).optional(),
                itemsPerPage   : joi.number().min(1).optional(),
                orderBy        : joi.string().max(256).optional(),
                order          : joi.string().valid('ascending', 'descending').optional()
                    .error(()=> new Error("order param: 'ascending' and 'descending' are the only valid values.")),
            });
            return await schema.validateAsync(query);

        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

}
