import * as joi from 'joi';
import {
    ErrorHandler
} from '../../../common/error.handler';

///////////////////////////////////////////////////////////////////////////////////////////////

export class UserActivityResponseValidator {

    static validateCreateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                UserId: joi.string().guid({
                    version: ['uuidv4']
                }).optional(),
                EnrollmentScheduleId: joi.string().guid({
                    version: ['uuidv4']
                }).optional(),
                Response: joi.string().optional()
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    }

    static validateUpdateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                UserId: joi.string().guid({
                    version: ['uuidv4']
                }).optional(),
                EnrollmentScheduleId: joi.string().guid({
                    version: ['uuidv4']
                }).optional(),
                Response: joi.string().optional()
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    }

    static validateSearchRequest = async (query) => {
        try {
            const schema = joi.object({
                careplanId: joi.number().integer().optional(),
                assetId: joi.number().integer().optional(),
                assetType: joi.string().valid("Action plan", "Animation", "Appointment", "Article", "Assessment", "Audio", "Biometrics", "Challenge", "Checkup", "Consultation", "Exercise", "Goal", "Infographics", "Medication", "Meditation", "Message", "Nutrition", "Physiotherapy", "Priority", "Reflection", "Reminder", "Video", "Web link", "Web newsfeed", "Word power").optional(),
                response: joi.string().optional(),
                timeResponded: joi.date().iso().optional(),
                progressStatus: joi.string().valid("Pending", "In-progress", "Completed", "Cancelled", "Delayed", "Unknown").optional()
            });
            return await schema.validateAsync(query);

        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    }

}