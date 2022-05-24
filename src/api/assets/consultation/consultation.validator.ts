import * as joi from 'joi';
import {
    ErrorHandler
} from '../../../common/error.handler';

///////////////////////////////////////////////////////////////////////////////////////////////

export class ConsultationValidator {

    static validateCreateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                AssetCode: joi.string().max(256).optional(),
                Name: joi.string().max(256).optional(),
                Description: joi.string().optional(),
                ConsultationType: joi.string().valid("Tele-consultation", "Visit-consultation", "Other").optional(),
                Tags: joi.array().items(joi.string()).optional(),
                Version: joi.string().max(128).optional()
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    }

    static validateUpdateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                AssetCode: joi.string().max(256).optional(),
                Name: joi.string().max(256).optional(),
                Description: joi.string().optional(),
                ConsultationType: joi.string().valid("Tele-consultation", "Visit-consultation", "Other").optional(),
                Tags: joi.array().items(joi.string()).optional(),
                Version: joi.string().max(128).optional()
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    }

    static validateSearchRequest = async (query) => {
        try {
            const schema = joi.object({
                assetCode: joi.string().max(256).optional(),
                name: joi.string().max(256).optional(),
                description: joi.string().optional(),
                consultationType: joi.string().valid("Tele-consultation", "Visit-consultation", "Other").optional(),
                assetCategory: joi.string().max(128).optional(),
                tags: joi.array().items(joi.string()).optional(),
                version: joi.string().max(128).optional()
            });
            return await schema.validateAsync(query);

        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    }

}