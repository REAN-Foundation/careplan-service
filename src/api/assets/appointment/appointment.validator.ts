import * as joi from 'joi';
import {
    ErrorHandler
} from '../../../common/error.handler';

///////////////////////////////////////////////////////////////////////////////////////////////

export class AppointmentValidator {

    static validateCreateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                AssetCode       : joi.string().max(256).optional(),
                Name            : joi.string().max(256).optional(),
                Description     : joi.string().optional().allow(null, ''),
                AppointmentType : joi.string().valid("Doctor", "Lab", "Physiotherapy", "Other").optional(),
                Tags            : joi.array().items(joi.string()).optional(),
                Version         : joi.string().max(128).optional(),
                OwnerUserId     : joi.string().guid({
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
                AssetCode       : joi.string().max(256).optional(),
                Name            : joi.string().max(256).optional(),
                Description     : joi.string().optional().allow(null, ''),
                AppointmentType : joi.string().valid("Doctor", "Lab", "Physiotherapy", "Other").optional(),
                Tags            : joi.array().items(joi.string()).optional(),
                Version         : joi.string().max(128).optional()
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    static validateSearchRequest = async (query) => {
        try {
            const schema = joi.object({
                assetCode       : joi.string().max(256).optional(),
                name            : joi.string().max(256).optional(),
                description     : joi.string().optional(),
                appointmentType : joi.string().valid("Doctor", "Lab", "Physiotherapy", "Other").optional(),
                assetCategory   : joi.string().max(128).optional(),
                tags            : joi.array().items(joi.string()).optional(),
                version         : joi.string().max(128).optional(),
                order           : joi.string().max(128).optional(),
                orderBy         : joi.string().max(128).optional(),
                itemsPerPage    : joi.number().max(128).optional(),
                pageIndex       : joi.number().max(128).optional(),
              
            });
            return await schema.validateAsync(query);

        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

}
