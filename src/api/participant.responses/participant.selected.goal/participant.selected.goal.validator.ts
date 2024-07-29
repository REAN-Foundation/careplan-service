import * as joi from 'joi';
import {
    ErrorHandler
} from '../../../common/error.handler';

///////////////////////////////////////////////////////////////////////////////////////////////

export class ParticipantSelectedGoalValidator {

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
                SelectedPriorityId : joi.string().guid({
                    version : ['uuidv4']
                }).optional(),
                CareplanId : joi.string().guid({
                    version : ['uuidv4']
                }).optional(),
                AssetId : joi.string().guid({
                    version : ['uuidv4']
                }).optional(),
                AssetType         : joi.string().max(128).optional(),
                AssetCode         : joi.string().max(128).optional(),
                AdditionalDetails : joi.string().optional(),
                StartDate         : joi.date().iso().optional(),
                EndDate           : joi.date().iso().optional()
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

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
                SelectedPriorityId : joi.string().guid({
                    version : ['uuidv4']
                }).optional(),
                CareplanId : joi.string().guid({
                    version : ['uuidv4']
                }).optional(),
                AssetId : joi.string().guid({
                    version : ['uuidv4']
                }).optional(),
                AssetType         : joi.string().max(128).optional(),
                AssetCode         : joi.string().max(128).optional(),
                AdditionalDetails : joi.string().optional(),
                StartDate         : joi.date().iso().optional(),
                EndDate           : joi.date().iso().optional()
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    static validateSearchRequest = async (query) => {
        try {
            const schema = joi.object({
                participantId      : joi.string().guid({ version: ['uuidv4'] }).optional(),
                enrollmentId       : joi.string().guid({ version: ['uuidv4'] }).optional(),
                selectedPriorityId : joi.string().guid({ version: ['uuidv4'] }).optional(),
                name               : joi.string().max(256).optional(),
                description        : joi.string().optional(),
                careplanId         : joi.string().guid({
                    version : ['uuidv4']
                }).optional(),
                assetId : joi.string().guid({
                    version : ['uuidv4']
                }).optional(),
                assetType         : joi.string().max(128).optional(),
                assetCode         : joi.string().max(128).optional(),
                additionalDetails : joi.string().optional(),
                startDate         : joi.date().iso().optional(),
                endDate           : joi.date().iso().optional(),
                progressStatus    : joi.string().valid("Pending", "In-progress", "Completed", "Cancelled", "Delayed", "Unknown").optional()
            });
            return await schema.validateAsync(query);

        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

}
