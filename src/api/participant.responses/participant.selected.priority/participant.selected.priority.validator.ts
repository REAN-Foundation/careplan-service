import * as joi from 'joi';
import {
    ErrorHandler
} from '../../../common/error.handler';

///////////////////////////////////////////////////////////////////////////////////////////////

export class ParticipantSelectedPriorityValidator {

    static validateCreateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                Name         : joi.string().max(256).optional(),
                Description  : joi.string().optional(),
                EnrollmentId : joi.string().guid({
                    version : ['uuidv4']
                }).optional(),
                ParticipantId : joi.string().guid({
                    version : ['uuidv4']
                }).optional(),
                CareplanId : joi.number().integer().optional(),
                AssetId    : joi.number().integer().optional(),
                AssetType  : joi.string().max(128).optional(),
                AssetCode  : joi.string().max(128).optional(),
                StartDate  : joi.date().iso().optional()
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    }

    static validateUpdateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                Name         : joi.string().max(256).optional(),
                Description  : joi.string().optional(),
                EnrollmentId : joi.string().guid({
                    version : ['uuidv4']
                }).optional(),
                ParticipantId : joi.string().guid({
                    version : ['uuidv4']
                }).optional(),
                CareplanId : joi.number().integer().optional(),
                AssetId    : joi.number().integer().optional(),
                AssetType  : joi.string().max(128).optional(),
                AssetCode  : joi.string().max(128).optional(),
                StartDate  : joi.date().iso().optional()
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    }

    static validateSearchRequest = async (query) => {
        try {
            const schema = joi.object({
                participantId : joi.string().guid({ version: ['uuidv4'] }).optional(),
                enrollmentId  : joi.string().guid({ version: ['uuidv4'] }).optional(),
                name          : joi.string().max(256).optional(),
                description   : joi.string().optional(),
                careplanId    : joi.number().integer().optional(),
                assetId       : joi.number().integer().optional(),
                assetType     : joi.string().max(128).optional(),
                assetCode     : joi.string().max(128).optional(),
                startDate     : joi.date().iso().optional()
            });
            return await schema.validateAsync(query);

        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    }

}
