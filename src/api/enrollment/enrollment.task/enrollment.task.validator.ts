import * as joi from 'joi';
import {
    ErrorHandler
} from '../../../common/error.handler';
import { Status, StatusList } from '../../../domain.types/enrollment/enrollment.task.domain.types';
import { AssetTypeList, TimeSlotList } from '../../../domain.types/assets/asset.types';

///////////////////////////////////////////////////////////////////////////////////////////////

export class EnrollmentTaskValidator {

    static validateCreateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                AssetType              : joi.string().valid(...AssetTypeList).optional(),
                IsRegistrationActivity : joi.boolean().optional(),
                Status                 : joi.string().valid(...StatusList).optional(),
                CompletedAt            : joi.date().iso().allow(null).optional(),
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
                AssetType              : joi.string().valid(...AssetTypeList).optional(),
                TimeSlot               : joi.string().valid(...TimeSlotList).optional(),
                ScheduledDate          : joi.date().iso().optional(),
                IsRegistrationActivity : joi.boolean().optional(),
                Status                 : joi.string().valid(...StatusList).optional(),
                CompletedAt            : joi.date().iso().allow(null).optional(),
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
                participantId : joi.string().guid({
                    version : ['uuidv4']
                }).optional(),
                assetType  : joi.string().valid(...AssetTypeList).optional(),
                careplanId : joi.string().guid({
                    version : ['uuidv4']
                }).optional(),
                enrollmentId : joi.string().guid({
                    version : ['uuidv4']
                }).optional(),
                scheduledDate          : joi.date().iso().optional(),
                timeSlot               : joi.string().valid(...TimeSlotList).optional(),
                isRegistrationActivity : joi.boolean().optional(),
                orderBy                : joi.string().valid("ScheduledDate", "CreatedAt", "AssetType"),
                pageIndex              : joi.number().min(0).optional(),
                itemsPerPage           : joi.number().min(1).optional(),
                order                  : joi.string().valid('ascending', 'descending').optional()
                    .error(()=> new Error("order param: 'ascending' and 'descending' are the only valid values.")),
            });
            return await schema.validateAsync(query);

        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

}
