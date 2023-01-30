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
                EnrollmentDate : joi.date().iso().optional()
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
                EndDate   : joi.date().iso().optional()
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
                displayId      : joi.string().optional(),
                startDate      : joi.date().iso().optional(),
                endDate        : joi.date().iso().optional(),
                progressStatus : joi.string().valid("Pending", "In-progress", "Completed", "Cancelled", "Delayed", "Unknown").optional()
            });
            return await schema.validateAsync(query);

        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

}
