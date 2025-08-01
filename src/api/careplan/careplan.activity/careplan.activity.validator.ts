import * as joi from 'joi';
import {
    ErrorHandler
} from '../../../common/error.handler';

///////////////////////////////////////////////////////////////////////////////////////////////

export class CareplanActivityValidator {

    static validateCreateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                AssetId : joi.string().guid({
                    version : ['uuidv4']
                }).optional(),
                AssetType  : joi.string().valid("Action plan", "Animation", "Appointment", "Article", "Assessment", "Audio", "Biometrics", "Challenge", "Checkup", "Consultation", "Exercise", "Goal", "Infographics", "Medication", "Meditation", "Message", "Nutrition", "Physiotherapy", "Priority", "Reflection", "Reminder", "Video", "Web link", "Web newsfeed", "Word power").optional(),
                CareplanId : joi.string().guid({
                    version : ['uuidv4']
                }).optional(),
                Day                    : joi.number().integer().optional(),
                TimeSlot               : joi.string().valid("Early morning", "Morning", "Afternoon", "Late afternoon", "Evening", "Night", "Late night", "Unspecified", "Whole day").optional(),
                IsRegistrationActivity : joi.boolean().optional(),
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    static validateUpdateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                AssetId : joi.string().guid({
                    version : ['uuidv4']
                }).optional(),
                AssetType  : joi.string().valid("Action plan", "Animation", "Appointment", "Article", "Assessment", "Audio", "Biometrics", "Challenge", "Checkup", "Consultation", "Exercise", "Goal", "Infographics", "Medication", "Meditation", "Message", "Nutrition", "Physiotherapy", "Priority", "Reflection", "Reminder", "Video", "Web link", "Web newsfeed", "Word power").optional(),
                CareplanId : joi.string().guid({
                    version : ['uuidv4']
                }).optional(),
                Day                    : joi.number().integer().optional(),
                TimeSlot               : joi.string().valid("Early morning", "Morning", "Afternoon", "Late afternoon", "Evening", "Night", "Late night", "Unspecified", "Whole day").optional(),
                IsRegistrationActivity : joi.boolean().optional(),
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    static validateSearchRequest = async (query) => {
        try {
            const schema = joi.object({
                assetId : joi.string().guid({
                    version : ['uuidv4']
                }).optional(),
                assetType  : joi.string().valid("Action plan", "Animation", "Appointment", "Article", "Assessment", "Audio", "Biometrics", "Challenge", "Checkup", "Consultation", "Exercise", "Goal", "Infographics", "Medication", "Meditation", "Message", "Nutrition", "Physiotherapy", "Priority", "Reflection", "Reminder", "Video", "Web link", "Web newsfeed", "Word power").optional(),
                careplanId : joi.string().guid({
                    version : ['uuidv4']
                }).optional(),
                day                    : joi.number().integer().optional(),
                timeSlot               : joi.string().valid("Early morning", "Morning", "Afternoon", "Late afternoon", "Evening", "Night", "Late night", "Unspecified", "Whole day").optional(),
                isRegistrationActivity : joi.boolean().optional(),
                pageIndex              : joi.number().min(0).optional(),
                itemsPerPage           : joi.number().min(1).optional(),
                orderBy                : joi.string().max(256).optional(),
                order                  : joi.string().valid('ascending', 'descending').optional()
                    .error(()=> new Error("order param: 'ascending' and 'descending' are the only valid values.")),
            });
            return await schema.validateAsync(query);

        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

}
