
import { PromotionConfig } from '../../config/promotion.config';
import { TargetApiClient } from './target.api.client';
import { PromotionSyncService } from './promotion.sync.service';
import { CareplanExport } from '../../domain.types/promotion/promotion.types';
import { CareplanService } from '../../database/repository.services/careplan/careplan.service';
import { Logger } from '../../common/logger';
import { ErrorHandler } from '../../common/error.handler';
import { CareplanDto } from '../../domain.types/careplan/careplan.domain.types';

////////////////////////////////////////////////////////////////////////////////////////////////////////

export class PromotionService {

    private syncService: PromotionSyncService;

    private careplanService: CareplanService;

    constructor() {
        this.syncService = new PromotionSyncService();
        this.careplanService = new CareplanService();
    }

    async promote(careplanId: string, tenantName: string): Promise<CareplanDto> {

        Logger.instance().log('Checking if promotion is enabled...');
        const targetConfig = PromotionConfig.getTargetConfig();

        if (!targetConfig) {
            ErrorHandler.throwInternalServerError('Promotion not available. This is the final environment.');
        }

        Logger.instance().log(`Retrieving careplan with ID ${careplanId} from source environment...`);
        const careplan = await this.careplanService.getById(careplanId);

        if (!careplan) {
            ErrorHandler.throwNotFoundError(`Careplan with ID ${careplanId} not found.`);
        }

        Logger.instance().log(`Exporting careplan with ID ${careplanId} for promotion...`);
        const sourceData: CareplanExport = await this.careplanService.exportForPromotion(careplan);

        Logger.instance().log('Creating Target API Client...');
        const client = new TargetApiClient(targetConfig);

        const sourceDataJson = JSON.stringify(sourceData, null, 2);
        Logger.instance().log('Source Careplan Export Data:');
        Logger.instance().log(sourceDataJson);

        await client.authenticate();

        const tenant = await client.getActiveTenants();
        const targetTenant = tenant.find(t => t.Code === tenantName);
        if (!targetTenant) {
            ErrorHandler.throwNotFoundError(`Tenant with name ${tenantName} not found in target environment.`);
        }
        sourceData.TenantId = targetTenant.id;
        Logger.instance().log(`Checking if careplan with Code ${sourceData.Code} exists in target environment...`);
        const targetCareplan = await client.searchCareplanByCode(sourceData.Code);

        try {
            if (!targetCareplan) {
                await this.createCareplanInTarget(client, sourceData);
            } else {
                await this.syncService.syncCareplan(
                    client,
                    sourceData,
                    targetCareplan.id
                );
            }
            return careplan;
        } catch (error) {
            Logger.instance().error('Careplan promotion failed', 500, error);
            ErrorHandler.throwInternalServerError(`Careplan promotion failed: ${error.message}`);
        }
    }

    private async createCareplanInTarget(
        client: TargetApiClient,
        sourceData: CareplanExport
    ): Promise<void> {

        try {
            Logger.instance().log(`Getting or creating category ${sourceData.Category?.Type} in target environment...`);
            let categoryId: string | null = null;
            if (sourceData.Category && sourceData.Category.Type) {
                categoryId = await client.getOrCreateCategory(sourceData.Category);
            }

            Logger.instance().log(`Creating careplan ${sourceData.Code} in target environment...`);
            const createdCareplan = await client.createCareplan({
                Code        : sourceData.Code,
                CategoryId  : categoryId,
                Name        : sourceData.Name,
                Description : sourceData.Description,
                Version     : sourceData.Version,
                Tags        : sourceData.Tags,
                TenantId    : sourceData.TenantId
            });

            const assetIdMap = new Map<string, string>();

            for (const asset of sourceData.Assets) {
                asset['TenantId'] = sourceData.TenantId;
                Logger.instance().log(`Creating asset ${asset.AssetCode} of type ${asset.AssetType} in target environment...`);
                const createdAsset = await client.createAsset(asset.AssetType, asset);
                assetIdMap.set(asset.AssetCode, createdAsset.id);
            }

            for (const activity of sourceData.CareplanActivities) {
                const assetId = assetIdMap.get(activity.AssetCode);
                if (assetId) {
                    const model = {
                        CareplanId             : createdCareplan.id,
                        AssetId                : assetId,
                        AssetType              : activity.AssetType,
                        Day                    : activity.Day,
                        TimeSlot               : activity.TimeSlot,
                        IsRegistrationActivity : activity.IsRegistrationActivity
                    };
                    if (activity.Sequence) {
                        model['Sequence'] = activity.Sequence;
                    }
                    await client.createActivity(model);
                }

            }
        } catch (error) {
            Logger.instance().error('Error creating careplan in target', 500, error);
            ErrorHandler.throwInternalServerError(`Error creating careplan in target: ${error.message}`);
        }

    }

    isPromotionEnabled(): boolean {
        return PromotionConfig.isPromotionEnabled();
    }

}

////////////////////////////////////////////////////////////////////////////////////////////////////////
