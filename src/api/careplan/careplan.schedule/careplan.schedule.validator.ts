import * as joi from 'joi';
import {
    ErrorHandler
} from '../../../common/error.handler';

///////////////////////////////////////////////////////////////////////////////////////////////

export class CareplanScheduleValidator {

    static validateCreateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                AssetId: joi.number().integer().optional(),
                AssetType: joi.string().valid("Action plan", "Animation", "Appointment", "Article", "Assessment", "Audio", "Biometrics", "Challenge", "Checkup", "Consultation", "Exercise", "Goal", "Infographics", "Medication", "Meditation", "Message", "Nutrition", "Physiotherapy", "Priority", "Reflection", "Reminder", "Video", "Web link", "Web newsfeed", "Word power").optional(),
                CareplanId: joi.number().integer().optional(),
                Day: joi.number().integer().optional(),
                TimeSlot: joi.string().valid("Early morning", "Morning", "Afternoon", "Late afternoon", "Evening", "Night", "Late night", "Unspecified", "Whole day").optional()
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    }

    static validateUpdateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                AssetId: joi.number().integer().optional(),
                AssetType: joi.string().valid("Action plan", "Animation", "Appointment", "Article", "Assessment", "Audio", "Biometrics", "Challenge", "Checkup", "Consultation", "Exercise", "Goal", "Infographics", "Medication", "Meditation", "Message", "Nutrition", "Physiotherapy", "Priority", "Reflection", "Reminder", "Video", "Web link", "Web newsfeed", "Word power").optional(),
                CareplanId: joi.number().integer().optional(),
                Day: joi.number().integer().optional(),
                TimeSlot: joi.string().valid("Early morning", "Morning", "Afternoon", "Late afternoon", "Evening", "Night", "Late night", "Unspecified", "Whole day").optional()
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    }

    static validateSearchRequest = async (query) => {
        try {
            const schema = joi.object({
                assetId: joi.number().integer().optional(),
                assetType: joi.string().valid("Action plan", "Animation", "Appointment", "Article", "Assessment", "Audio", "Biometrics", "Challenge", "Checkup", "Consultation", "Exercise", "Goal", "Infographics", "Medication", "Meditation", "Message", "Nutrition", "Physiotherapy", "Priority", "Reflection", "Reminder", "Video", "Web link", "Web newsfeed", "Word power").optional(),
                careplanId: joi.number().integer().optional(),
                day: joi.number().integer().optional(),
                timeSlot: joi.string().valid("Early morning", "Morning", "Afternoon", "Late afternoon", "Evening", "Night", "Late night", "Unspecified", "Whole day").optional()
            });
            return await schema.validateAsync(query);

        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    }

}