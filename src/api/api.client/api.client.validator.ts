import * as joi from 'joi';
import {
    ErrorHandler
} from '../../common/error.handler';

///////////////////////////////////////////////////////////////////////////////////////////////

export class ApiClientValidator {

    static validateCreateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                ClientName          : joi.string().max(256).optional(),
                ClientCode          : joi.string().max(256).optional(),
                ClientInterfaceType : joi.string().valid("Mobile App", "Web App", "Desktop App", "Other").optional(),
                IsPrivileged        : joi.boolean().optional(),
                CountryCode         : joi.string().optional(),
                Phone               : joi.string().optional(),
                Email               : joi.string().email().optional(),
                Password            : joi.string().optional(),
                ApiKey              : joi.string().optional(),
                ValidFrom           : joi.date().iso().optional(),
                ValidTill           : joi.date().iso().optional()
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    }

    static validateUpdateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                ClientName          : joi.string().max(256).optional(),
                ClientCode          : joi.string().max(256).optional(),
                ClientInterfaceType : joi.string().valid("Mobile App", "Web App", "Desktop App", "Other").optional(),
                IsPrivileged        : joi.boolean().optional(),
                CountryCode         : joi.string().optional(),
                Phone               : joi.string().optional(),
                Email               : joi.string().email().optional(),
                Password            : joi.string().optional(),
                ApiKey              : joi.string().optional(),
                ValidFrom           : joi.date().iso().optional(),
                ValidTill           : joi.date().iso().optional()
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    }

    static validateSearchRequest = async (query) => {
        try {
            const schema = joi.object({
                clientName          : joi.string().max(256).optional(),
                clientCode          : joi.string().max(256).optional(),
                clientInterfaceType : joi.string().valid("Mobile App", "Web App", "Desktop App", "Other").optional(),
                isPrivileged        : joi.boolean().optional(),
                countryCode         : joi.string().optional(),
                phone               : joi.string().optional(),
                email               : joi.string().email().optional(),
                validFrom           : joi.date().iso().optional(),
                validTill           : joi.date().iso().optional()
            });
            return await schema.validateAsync(query);

        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    }

}
