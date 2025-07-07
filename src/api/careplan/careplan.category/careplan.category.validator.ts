import * as joi from 'joi';
import { ErrorHandler } from '../../../common/error.handler';

///////////////////////////////////////////////////////////////////////////////////////////////

export class CareplanCategoryValidator {

    static validateCreateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                Type        : joi.string().max(256).required(),
                Description : joi.string().max(512).optional(),
                TenantId    : joi
                    .string()
                    .guid({ version: ['uuidv4'] })
                    .optional(),
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    static validateSearchRequest = async (query) => {
        try {
            const schema = joi.object({
                type        : joi.string().max(256).optional(),
                description : joi.string().max(512).optional(),
                tenantId    : joi
                    .string()
                    .guid({ version: ['uuidv4'] })
                    .optional(),
                pageIndex    : joi.number().min(0).optional(),
                itemsPerPage : joi.number().min(1).optional(),
                orderBy      : joi.string().max(256).optional(),
                order        : joi
                    .string()
                    .valid('ascending', 'descending')
                    .optional()
                    .error(() => new Error("order param: 'ascending' and 'descending' are the only valid values.")),
            });
            return await schema.validateAsync(query);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    static validateUpdateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                Type        : joi.string().max(256).optional(),
                Description : joi.string().max(512).optional(),
                TenantId    : joi
                    .string()
                    .guid({ version: ['uuidv4'] })
                    .optional(),
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

}
///////////////////////////////////////////////////////////////////////////////////////////////
