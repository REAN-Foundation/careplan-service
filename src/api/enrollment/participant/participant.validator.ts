import * as joi from 'joi';
import { ErrorHandler } from '../../../common/error.handler';

///////////////////////////////////////////////////////////////////////////////////////////////

export class ParticipantValidator {

    static validateCreateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                Prefix                 : joi.string().max(16).optional(),
                FirstName              : joi.string().max(64).required(),
                LastName               : joi.string().max(64).optional().allow(null),
                CountryCode            : joi.string().max(10).required(),
                Phone                  : joi.string().max(16).min(6).required(),
                Email                  : joi.string().max(256).optional().allow(null),
                ParticipantReferenceId : joi.string().max(256).optional(),
                Gender                 : joi.string().valid("Male", "Female", "Other").required(),
                BirthDate              : joi.string().optional(),
                Country                : joi.string().max(64).optional().allow(null)
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    static validateSearchRequest = async (query) => {
        try {
            const schema = joi.object({
                participantReferenceId : joi.string().max(256).optional(),
                prefix                 : joi.string().max(16).optional(),
                firstName              : joi.string().max(64).optional(),
                lastName               : joi.string().max(64).optional(),
                phone                  : joi.string().max(16).min(6).optional(),
                email                  : joi.string().max(256).optional(),
                gender                 : joi.string().valid("Male", "Female", "Other").optional(),
                country                : joi.string().max(64).optional(),
                addedByUserId          : joi.string().guid({
                    version : ['uuidv4']
                }).optional(),
                lastUpdatedByUserId : joi.string().guid({
                    version : ['uuidv4']
                }).optional()
            });
            return await schema.validateAsync(query);

        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    static validateUpdateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                FirstName              : joi.string().max(64).optional(),
                LastName               : joi.string().max(64).optional(),
                CountryCode            : joi.string().max(10).optional(),
                Phone                  : joi.string().max(16).min(6).optional(),
                Email                  : joi.string().max(256).optional(),
                ParticipantReferenceId : joi.string().max(256).optional(),
                Gender                 : joi.string().valid("Male", "Female", "Other").optional(),
                Country                : joi.string().max(64).optional(),
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

}
