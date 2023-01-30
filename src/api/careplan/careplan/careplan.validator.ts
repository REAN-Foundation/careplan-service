import * as joi from 'joi';
import { ErrorHandler } from '../../../common/error.handler';

///////////////////////////////////////////////////////////////////////////////////////////////

export class CareplanValidator {

    static validateCreateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                Code       : joi.string().max(256).optional(),
                CategoryId : joi.string().guid({
                    version : ['uuidv4']
                }).optional(),
                Name        : joi.string().max(256).required(),
                Description : joi.string().optional(),
                Version     : joi.string().max(32).optional(),
                Tags        : joi.array().items(joi.string()).optional(),
                OwnerUserId : joi.string().guid({
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
                code       : joi.string().max(256).optional(),
                categoryId : joi.string().guid({
                    version : ['uuidv4']
                }).optional(),
                name        : joi.string().max(256).optional(),
                version     : joi.string().max(32).optional(),
                tags        : joi.array().items(joi.string()).optional(),
                ownerUserId : joi.string().guid({
                    version : ['uuidv4']
                }).optional(),
                isActive     : joi.boolean().optional(),
                pageIndex    : joi.number().min(0).optional(),
                itemsPerPage : joi.number().min(1).optional(),
                orderBy      : joi.string().max(256).optional(),
                order        : joi.string().valid('ascending', 'descending').optional()
                    .error(()=> new Error("order param: 'ascending' and 'descending' are the only valid values.")),
            });
            return await schema.validateAsync(query);

        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    static validateUpdateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                Code       : joi.string().max(256).optional(),
                CategoryId : joi.string().guid({
                    version : ['uuidv4']
                }).optional(),
                Name        : joi.string().max(256).optional(),
                Description : joi.string().optional(),
                Version     : joi.string().max(32).optional(),
                Tags        : joi.array().items(joi.string()).optional(),
                OwnerUserId : joi.string().guid({
                    version : ['uuidv4']
                }).optional(),
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

}
///////////////////////////////////////////////////////////////////////////////////////////////
