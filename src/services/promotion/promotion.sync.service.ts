
import { TargetApiClient } from './target.api.client';
import {
    SyncResult,
    CareplanExport,
    AssetExport,
    ActivityExport,
    TargetActivity
} from '../../domain.types/promotion/promotion.types';
import { ErrorHandler } from '../../common/error.handler';
import { Logger } from '../../common/logger';

////////////////////////////////////////////////////////////////////////////////////////////////////////

export class PromotionSyncService {

    async syncCareplan(
        client: TargetApiClient,
        sourceData: CareplanExport,
        targetCareplanId: string
    ): Promise<SyncResult> {

        try {
            const result: SyncResult = {
                AssetsCreated     : 0,
                AssetsUpdated     : 0,
                AssetsDeleted     : 0,
                ActivitiesCreated : 0,
                ActivitiesUpdated : 0,
                ActivitiesDeleted : 0
            };

            await client.updateCareplan(targetCareplanId, {
                Name        : sourceData.Name,
                Description : sourceData.Description,
                Version     : sourceData.Version,
                Tags        : sourceData.Tags,
            });

            const targetActivities = await client.searchActivitiesByCareplan(targetCareplanId);

            const sourceAssetMap = new Map<string, AssetExport>();
            for (const asset of sourceData.Assets) {
                sourceAssetMap.set(asset.AssetCode, asset);
            }

            const sourceActivityMap = new Map<string, ActivityExport>();
            for (const activity of sourceData.CareplanActivities) {
                sourceActivityMap.set(activity.AssetCode, activity);
            }

            const targetMap = new Map<string, TargetActivity>();
            for (const activity of targetActivities) {
                const asset = await client.getAssetById(activity.AssetType, activity.AssetId);
                if (asset && asset.AssetCode) {
                    targetMap.set(asset.AssetCode, {
                        id        : activity.id,
                        AssetId   : activity.AssetId,
                        AssetType : activity.AssetType,
                        AssetCode : asset.AssetCode,
                        Day       : activity.Day,
                        TimeSlot  : activity.TimeSlot
                    });
                }
            }

            for (const [assetCode, sourceAsset] of sourceAssetMap) {
                if (!targetMap.has(assetCode)) {
                    const activityData = sourceActivityMap.get(assetCode);
                    if (activityData) {
                        await this.createAssetAndActivity(
                            client,
                            targetCareplanId,
                            sourceAsset,
                            activityData
                        );
                        result.AssetsCreated++;
                        result.ActivitiesCreated++;
                    }
                }
            }

            for (const [assetCode, sourceAsset] of sourceAssetMap) {
                if (targetMap.has(assetCode)) {
                    const targetInfo = targetMap.get(assetCode)!;
                    const activityData = sourceActivityMap.get(assetCode);
                    if (activityData) {
                        await this.updateAssetAndActivity(
                            client,
                            sourceAsset,
                            activityData,
                            targetInfo
                        );
                        result.AssetsUpdated++;
                        result.ActivitiesUpdated++;
                    }
                }
            }

            for (const [assetCode, targetInfo] of targetMap) {
                if (!sourceAssetMap.has(assetCode)) {
                    await client.deleteActivity(targetInfo.id);
                    result.ActivitiesDeleted++;
                    result.AssetsDeleted++;
                }
            }

            return result;
        } catch (error) {
            Logger.instance().error('Error syncing careplan to target', 500, error);
            ErrorHandler.throwInternalServerError(`Error syncing careplan to target: ${error.message}`);
        }
    }

    private async createAssetAndActivity(
        client: TargetApiClient,
        careplanId: string,
        sourceAsset: AssetExport,
        activityData: ActivityExport
    ): Promise<void> {
        try {
            const createdAsset = await client.createAsset(sourceAsset.AssetType, sourceAsset);

            const model = {
                CareplanId             : careplanId,
                AssetId                : createdAsset.id,
                AssetType              : sourceAsset.AssetType,
                Day                    : activityData.Day,
                TimeSlot               : activityData.TimeSlot,
                IsRegistrationActivity : activityData.IsRegistrationActivity
            };

            if (activityData.Sequence) {
                model['Sequence'] = activityData.Sequence;
            }
            await client.createActivity(model);
        } catch (error) {
            Logger.instance().error('Error creating asset and activity in target', 500, error);
            ErrorHandler.throwInternalServerError(`Error creating asset and activity in target: ${error.message}`);
        }
    }

    private async updateAssetAndActivity(
        client: TargetApiClient,
        sourceAsset: AssetExport,
        activityData: ActivityExport,
        targetInfo: TargetActivity
    ): Promise<void> {
        try {
            await client.updateAsset(sourceAsset.AssetType, targetInfo.AssetId, sourceAsset);

            const model = {
                Day                    : activityData.Day,
                TimeSlot               : activityData.TimeSlot,
                IsRegistrationActivity : activityData.IsRegistrationActivity
            };
            if (activityData.Sequence) {
                model['Sequence'] = activityData.Sequence;
            }
            await client.updateActivity(targetInfo.id, model);
        } catch (error) {
            Logger.instance().error('Error updating asset and activity in target', 500, error);
            ErrorHandler.throwInternalServerError(`Error updating asset and activity in target: ${error.message}`);
        }
    }

}

////////////////////////////////////////////////////////////////////////////////////////////////////////
