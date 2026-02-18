import * as joi from 'joi';
import { ErrorHandler } from '../../../common/error.handler';
import express from 'express';

///////////////////////////////////////////////////////////////////////////////////////////////

export class PromotionValidator {

    static validatePromoteFromRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                TenantCode        : joi.string().max(256).required(),
                TargetEnvironment : joi.string().valid('dev', 'uat', 'prod').required()
            });

            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

   static validatePromoteToRequest = async (requestBody) => {
       try {
           const categorySchema = joi.object({
               Type        : joi.string().max(256).required(),
               Description : joi.string().allow('', null).optional()
           }).unknown(true);

           const assetSchema = joi.object({
               AssetCode : joi.string().max(256).required(),
               AssetType : joi.string().max(256).required(),
               Name      : joi.string().max(256).required(),
           }).unknown(true);

           const activitySchema = joi.object({
               AssetType              : joi.string().max(256).required(),
               AssetCode              : joi.string().max(256).required(),
               Day                    : joi.number().integer().min(0).required(),
               TimeSlot               : joi.string().max(64).required(),
               Sequence               : joi.number().integer().allow(null).optional(),
               IsRegistrationActivity : joi.boolean().optional()
           });

           const careplanSchema = joi.object({
               Code               : joi.string().max(256).required(),
               Name               : joi.string().max(256).required(),
               Description        : joi.string().allow('', null).optional(),
               Version            : joi.string().max(32).optional(),
               Tags               : joi.array().items(joi.string()).optional(),
               IsActive           : joi.boolean().optional(),
               Category           : categorySchema.optional(),
               Assets             : joi.array().items(assetSchema).optional(),
               CareplanActivities : joi.array().items(activitySchema).optional()
           }).unknown(true);

           const schema = joi.object({
               TargetEnvironment : joi.string().valid('dev', 'uat', 'prod').required(),
               TenantCode        : joi.string().max(256).required(),
               Careplan          : careplanSchema.required()
           });

           return await schema.validateAsync(requestBody);
       } catch (error) {
           ErrorHandler.handleValidationError(error);
       }
   };

       static validateLambdaAuthHeader = (request: express.Request): boolean => {
           const lambdaAuthToken = request.headers['x-lambda-auth'] as string;
           const expectedToken = process.env.LAMBDA_PROMOTION_AUTH_TOKEN;

           if (!expectedToken) {
               throw new Error('Lambda promotion auth token is not configured');
           }

           if (!lambdaAuthToken || lambdaAuthToken !== expectedToken) {
               return false;
           }

           return true;
       };

}

