import * as joi from 'joi';
import {
    ErrorHandler
} from '../../../common/error.handler';

///////////////////////////////////////////////////////////////////////////////////////////////

export class MessageValidator {

    static validateCreateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                AssetCode   : joi.string().max(256).optional().allow(null),
                Name        : joi.string().optional(),
                Description : joi.string().optional().allow(null, ''),
                MessageType : joi.string().valid("Educational", "Status", "Unknown").optional(),
                Tags        : joi.array().items(joi.string()).optional(),
                Url         : joi.string().optional().allow(null, ''),
                Version     : joi.string().max(128).optional(),
                OwnerUserId : joi.string().guid({
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
                AssetCode   : joi.string().max(256).optional(),
                Name        : joi.string().optional(),
                Description : joi.string().optional().allow(null, ''),
                MessageType : joi.string().valid("Educational", "Status", "Unknown").optional(),
                Tags        : joi.array().items(joi.string()).optional(),
                Url         : joi.string().optional().allow(null, ''),
                Version     : joi.string().max(128).optional()
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    static validateSearchRequest = async (query) => {
        try {
            const schema = joi.object({
                assetCode    : joi.string().max(256).optional(),
                name         : joi.string().optional(),
                description  : joi.string().optional(),
                category     : joi.string().max(128).optional(),
                messageType  : joi.string().valid("Educational", "Status", "Unknown").optional(),
                tags         : joi.array().items(joi.string()).optional(),
                version      : joi.string().max(128).optional(),
                order        : joi.string().max(128).optional(),
                orderBy      : joi.string().max(128).optional(),
                itemsPerPage : joi.number().max(128).optional(),
                pageIndex    : joi.number().max(128).optional(),
                
            });
            return await schema.validateAsync(query);

        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

}
