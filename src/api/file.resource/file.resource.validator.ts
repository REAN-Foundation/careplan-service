import * as joi from 'joi';
import {
    ErrorHandler
} from '../../common/error.handler';

///////////////////////////////////////////////////////////////////////////////////////////////

export class FileResourceValidator {

    static validateCreateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                FileName : joi.string().max(256).optional(),
                UserId   : joi.string().guid({
                    version : ['uuidv4']
                }).optional(),
                IsPublicResource : joi.boolean().optional(),
                Tags             : joi.array().items(joi.string()).optional()
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    }

    static validateUpdateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                FileName : joi.string().max(256).optional(),
                UserId   : joi.string().guid({
                    version : ['uuidv4']
                }).optional(),
                IsPublicResource : joi.boolean().optional(),
                Tags             : joi.array().items(joi.string()).optional()
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    }

    static validateSearchRequest = async (query) => {
        try {
            const schema = joi.object({
                fileName         : joi.string().max(256).optional(),
                isPublicResource : joi.boolean().optional(),
                tags             : joi.array().items(joi.string()).optional(),
                mimeType         : joi.string().max(128).optional()
            });
            return await schema.validateAsync(query);

        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    }

}
