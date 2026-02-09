import express from 'express';
import AWS from 'aws-sdk';
import { ResponseHandler } from '../../../common/response.handler';
import { BaseController } from '../../base.controller';

///////////////////////////////////////////////////////////////////////////////////////

export class PromotionController extends BaseController {

    constructor() {
        super();
    }

    promoteFrom = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            const { TargetEnvironment } = request.body;

            if (!TargetEnvironment || typeof TargetEnvironment !== 'string') {
                throw new Error('TargetEnvironment is required and must be a string');
            }

            const lambda = new AWS.Lambda({
                region : process.env.AWS_REGION || 'us-east-1',
            });

            const params: AWS.Lambda.InvocationRequest = {
                FunctionName   : process.env.PROMOTION_LAMBDA_FUNCTION_NAME || 'promotion-lambda',
                InvocationType : 'RequestResponse',
                Payload        : JSON.stringify({
                    TargetEnvironment : TargetEnvironment
                }),
            };

            const result = await lambda.invoke(params).promise();

            const message = 'Lambda function invoked successfully!';
            ResponseHandler.success(request, response, message, 200, {
                StatusCode : result.StatusCode,
                Payload    : result.Payload ? JSON.parse(result.Payload as string) : null,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

}
