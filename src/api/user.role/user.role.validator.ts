import * as joi from 'joi';
import {
    ErrorHandler
} from '../../common/error.handler';

///////////////////////////////////////////////////////////////////////////////////////////////

export class UserRoleValidator {

    static validateCreateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                UserId : joi.string().guid({
                    version : ['uuidv4']
                }).optional(),
                RoleId : joi.number().integer().optional()
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    static validateUpdateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                UserId : joi.string().guid({
                    version : ['uuidv4']
                }).optional(),
                RoleId : joi.number().integer().optional()
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    static validateSearchRequest = async (query) => {
        try {
            const schema = joi.object({
                userId : joi.string().guid({
                    version : ['uuidv4']
                }).optional(),
                roleId : joi.number().integer().optional()
            });
            return await schema.validateAsync(query);

        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

}
