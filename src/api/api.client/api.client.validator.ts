import * as joi from 'joi';
import { ApiClientVerificationDomainModel } from '../../domain.types/api.client.domain.types';
import { ErrorHandler } from '../../common/error.handler';
import { Helper } from '../../common/helper';
import { TimeHelper } from '../../common/time.helper';
import { DurationType } from '../../domain.types/miscellaneous/time.types';

///////////////////////////////////////////////////////////////////////////////////////////////

export class ApiClientValidator {

    static validateCreateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                ClientName          : joi.string().max(256).optional(),
                FirstName           : joi.string().max(256).optional(),
                LastName            : joi.string().max(256).optional(),
                ClientCode          : joi.string().max(256).optional(),
                ClientInterfaceType : joi.string().valid('Mobile App', 'Web App', 'Desktop App', 'Other').optional(),
                IsPrivileged        : joi.boolean().optional(),
                CountryCode         : joi.string().required(),
                Phone               : joi.string().required(),
                Email               : joi.string().email().required(),
                Password            : joi.string().optional(),
                ApiKey              : joi.string().optional(),
                ValidFrom           : joi.date().iso().optional(),
                ValidTill           : joi.date().iso().optional(),
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    static validateUpdateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                ClientName          : joi.string().max(256).optional(),
                FirstName           : joi.string().max(256).optional(),
                LastName            : joi.string().max(256).optional(),
                ClientCode          : joi.string().max(256).optional(),
                ClientInterfaceType : joi.string().valid('Mobile App', 'Web App', 'Desktop App', 'Other').optional(),
                IsPrivileged        : joi.boolean().optional(),
                CountryCode         : joi.string().optional(),
                Phone               : joi.string().optional(),
                Email               : joi.string().email().optional(),
                Password            : joi.string().optional(),
                ApiKey              : joi.string().optional(),
                ValidFrom           : joi.date().iso().optional(),
                ValidTill           : joi.date().iso().optional(),
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    static validateSearchRequest = async (query) => {
        try {
            const schema = joi.object({
                clientName          : joi.string().max(256).optional(),
                firstName           : joi.string().max(256).optional(),
                lastName            : joi.string().max(256).optional(),
                clientCode          : joi.string().max(256).optional(),
                clientInterfaceType : joi.string().valid('Mobile App', 'Web App', 'Desktop App', 'Other').optional(),
                isPrivileged        : joi.boolean().optional(),
                countryCode         : joi.string().optional(),
                phone               : joi.string().optional(),
                email               : joi.string().optional(),
                validFrom           : joi.date().iso().optional(),
                validTill           : joi.date().iso().optional(),
                pageIndex           : joi.number().min(0).optional(),
                itemsPerPage        : joi.number().min(1).optional(),
                orderBy             : joi.string().max(256).optional(),
                order               : joi.string().valid('ascending', 'descending')
                    .optional()
                    .error(()=> new Error("order param: 'ascending' and 'descending' are the only valid values.")),
            });
            return await schema.validateAsync(query);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    static getOrRenewApiKey = async (request: any): Promise<ApiClientVerificationDomainModel> => {
        const authHeader = request.headers['authorization'].toString();
        let tokens = authHeader.split(' ');
        if (tokens.length < 2) {
            throw new Error('Invalid authorization header.');
        }
        if (tokens[0].toLowerCase() !== 'basic') {
            throw new Error('Invalid auth header formatting. Should be basic authorization.');
        }
        const load = Helper.decodeFromBase64(tokens[1]);
        tokens = load.split(':');
        if (tokens.length < 2) {
            throw new Error('Basic auth formatting error.');
        }
        const clientCode = tokens[0].trim();
        const password = tokens[1].trim();

        const schema = joi.object({
            ValidFrom : joi.date().optional(),
            ValidTill : joi.date().optional(),
        });
        await schema.validateAsync(request.body);

        return ApiClientValidator.getVerificationDomainModel(request.body, clientCode, password);
    };

    static getVerificationDomainModel = async (
        body: any,
        clientCode: string,
        password: string
    ): Promise<ApiClientVerificationDomainModel> => {
        let model: ApiClientVerificationDomainModel = null;
        model = {
            ClientCode : clientCode,
            Password   : password,
            ValidFrom  : body.ValidFrom ?? new Date(),
            ValidTill  : body.ValidTill ?? TimeHelper.addDuration(new Date(), 180, DurationType.Day),
        };

        return model;
    };

}
