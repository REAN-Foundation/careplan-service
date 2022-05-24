import * as joi from 'joi';
import {
    ErrorHandler
} from '../../../common/error.handler';

///////////////////////////////////////////////////////////////////////////////////////////////

export class UserSelectedPriorityValidator {

    static validateCreateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                Name: joi.string().max(256).optional(),
                Description: joi.string().optional(),
                UserId: joi.string().guid({
                    version: ['uuidv4']
                }).optional(),
                CareplanId: joi.number().integer().optional(),
                StartDate: joi.date().iso().optional()
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    }

    static validateUpdateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                Name: joi.string().max(256).optional(),
                Description: joi.string().optional(),
                UserId: joi.string().guid({
                    version: ['uuidv4']
                }).optional(),
                CareplanId: joi.number().integer().optional(),
                StartDate: joi.date().iso().optional()
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    }

    static validateSearchRequest = async (query) => {
        try {
            const schema = joi.object({
                name: joi.string().max(256).optional(),
                description: joi.string().optional(),
                careplanId: joi.number().integer().optional(),
                assetId: joi.number().integer().optional(),
                assetType: joi.string().max(128).optional(),
                startDate: joi.date().iso().optional()
            });
            return await schema.validateAsync(query);

        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    }

}