import * as joi from 'joi';
import {
    ErrorHandler
} from '../../../common/error.handler';

///////////////////////////////////////////////////////////////////////////////////////////////

export class WordPowerValidator {

    static validateCreateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                AssetCode: joi.string().max(256).optional(),
                Word: joi.string().max(256).optional(),
                Description: joi.string().optional(),
                AdditionalResources: joi.array().items(joi.string()).optional(),
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
                Word: joi.string().max(256).optional(),
                Description: joi.string().optional(),
                AdditionalResources: joi.array().items(joi.string()).optional(),
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
                word: joi.string().max(256).optional(),
                description: joi.string().optional(),
                additionalResources: joi.array().items(joi.string()).optional(),
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