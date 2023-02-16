import * as joi from 'joi';
import { ErrorHandler } from '../../../common/error.handler';

///////////////////////////////////////////////////////////////////////////////////////////////

export class CareplanCategoryValidator {

    static validateCreateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                Type        : joi.string().max(256).required(),
                Description : joi.string().max(512).optional()
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
                description : joi.string().max(512).optional()
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
                Description : joi.string().max(512).optional()
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

}
///////////////////////////////////////////////////////////////////////////////////////////////
