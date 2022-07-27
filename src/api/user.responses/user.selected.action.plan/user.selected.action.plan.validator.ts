import * as joi from 'joi';
import {
    ErrorHandler
} from '../../../common/error.handler';

///////////////////////////////////////////////////////////////////////////////////////////////

export class UserSelectedActionPlanValidator {

    static validateCreateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                Name        : joi.string().max(256).optional(),
                Description : joi.string().optional(),
                UserId      : joi.string().guid({
                    version : ['uuidv4']
                }).optional(),
                CareplanId        : joi.number().integer().optional(),
                AdditionalDetails : joi.string().optional(),
                StartDate         : joi.date().iso().optional(),
                EndDate           : joi.date().iso().optional()
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    }

    static validateUpdateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                Name        : joi.string().max(256).optional(),
                Description : joi.string().optional(),
                UserId      : joi.string().guid({
                    version : ['uuidv4']
                }).optional(),
                CareplanId        : joi.number().integer().optional(),
                AdditionalDetails : joi.string().optional(),
                StartDate         : joi.date().iso().optional(),
                EndDate           : joi.date().iso().optional()
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    }

    static validateSearchRequest = async (query) => {
        try {
            const schema = joi.object({
                name              : joi.string().max(256).optional(),
                description       : joi.string().optional(),
                careplanId        : joi.number().integer().optional(),
                assetId           : joi.number().integer().optional(),
                assetType         : joi.string().max(128).optional(),
                additionalDetails : joi.string().optional(),
                startDate         : joi.date().iso().optional(),
                endDate           : joi.date().iso().optional(),
                progressStatus    : joi.string().valid("Pending", "In-progress", "Completed", "Cancelled", "Delayed", "Unknown").optional()
            });
            return await schema.validateAsync(query);

        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    }

}
