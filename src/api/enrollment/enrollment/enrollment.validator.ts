import * as joi from 'joi';
import {
    ErrorHandler
} from '../../../common/error.handler';

///////////////////////////////////////////////////////////////////////////////////////////////

export class EnrollmentValidator {

    static validateCreateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                CareplanId    : joi.number().integer().optional(),
                ParticipantId : joi.string().guid({
                    version : ['uuidv4']
                }).optional(),
                StartDate      : joi.date().iso().optional(),
                EndDate        : joi.date().iso().optional(),
                EnrollmentDate : joi.date().iso().optional()
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    }

    static validateUpdateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                CareplanId    : joi.number().integer().optional(),
                ParticipantId : joi.string().guid({
                    version : ['uuidv4']
                }).optional(),
                StartDate      : joi.date().iso().optional(),
                EndDate        : joi.date().iso().optional(),
                EnrollmentDate : joi.date().iso().optional()
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    }

    static validateSearchRequest = async (query) => {
        try {
            const schema = joi.object({
                careplanId     : joi.number().integer().optional(),
                progressStatus : joi.string().valid("Pending", "In-progress", "Completed", "Cancelled", "Delayed", "Unknown").optional()
            });
            return await schema.validateAsync(query);

        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    }

}
