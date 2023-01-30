import * as joi from 'joi';
import {
    ErrorHandler
} from '../../../common/error.handler';

///////////////////////////////////////////////////////////////////////////////////////////////

export class ExerciseValidator {

    static validateCreateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                AssetCode              : joi.string().max(256).optional(),
                Name                   : joi.string().max(256).optional(),
                Description            : joi.string().optional().allow(null, ''),
                ExerciseType           : joi.string().valid("Strength", "Aerobic", "Balance", "Reflexes", "Flexibility").optional(),
                IntensityLevel         : joi.string().valid("None", "Minimal", "Moderate", "Somewhat hard", "Hard", "Harder", "Very hard", "Extremely hard", "Maximum effort").optional(),
                RecommendedDurationMin : joi.number().integer().optional(),
                Tags                   : joi.array().items(joi.string()).optional(),
                Version                : joi.string().max(128).optional(),
                OwnerUserId            : joi.string().guid({
                    version : ['uuidv4']
                }).optional(),
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    static validateUpdateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                AssetCode              : joi.string().max(256).optional(),
                Name                   : joi.string().max(256).optional(),
                Description            : joi.string().optional().allow(null, ''),
                ExerciseType           : joi.string().valid("Strength", "Aerobic", "Balance", "Reflexes", "Flexibility").optional(),
                IntensityLevel         : joi.string().valid("None", "Minimal", "Moderate", "Somewhat hard", "Hard", "Harder", "Very hard", "Extremely hard", "Maximum effort").optional(),
                RecommendedDurationMin : joi.number().integer().optional(),
                Tags                   : joi.array().items(joi.string()).optional(),
                Version                : joi.string().max(128).optional()
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    static validateSearchRequest = async (query) => {
        try {
            const schema = joi.object({
                assetCode              : joi.string().max(256).optional(),
                name                   : joi.string().max(256).optional(),
                description            : joi.string().optional(),
                exerciseType           : joi.string().valid("Strength", "Aerobic", "Balance", "Reflexes", "Flexibility").optional(),
                intensityLevel         : joi.string().valid("None", "Minimal", "Moderate", "Somewhat hard", "Hard", "Harder", "Very hard", "Extremely hard", "Maximum effort").optional(),
                recommendedDurationMin : joi.number().integer().optional(),
                assetCategory          : joi.string().max(128).optional(),
                tags                   : joi.array().items(joi.string()).optional(),
                version                : joi.string().max(128).optional(),
                order                  : joi.string().max(128).optional(),
                orderBy                : joi.string().max(128).optional(),
                itemsPerPage           : joi.number().max(128).optional(),
                pageIndex              : joi.number().max(128).optional(),
                
            });
            return await schema.validateAsync(query);

        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

}
