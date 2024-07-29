import { AssetTypeList, TimeSlotList } from '../../../domain.types/assets/asset.types';
import * as db from '../../database.connector';
import { DataTypes } from 'sequelize';
const sequelize = db.default.sequelize;

////////////////////////////////////////////////////////////////////////

export class CareplanActivityModel {

    static TableName = 'careplan_activities';

    static ModelName = 'CareplanActivity';

    static Schema = {
        id : {
            type         : DataTypes.UUID,
            allowNull    : false,
            defaultValue : DataTypes.UUIDV4,
            primaryKey   : true
        },
        AssetId : {
            type      : DataTypes.UUID,
            allowNull : true
        },
        AssetType : {
            type      : DataTypes.ENUM({ values: AssetTypeList }),
            allowNull : false
        },
        CareplanId : {
            type       : DataTypes.UUID,
            allowNull  : false,
            foreignKey : true,
            unique     : false
        },
        Day : {
            type      : DataTypes.INTEGER,
            allowNull : true
        },
        TimeSlot : {
            type         : DataTypes.ENUM({ values: TimeSlotList }),
            allowNull    : false,
            defaultValue : 'Unspecified'
        },
        IsRegistrationActivity : {
            type         : DataTypes.BOOLEAN,
            allowNull    : false,
            defaultValue : false
        },

        CreatedAt : DataTypes.DATE,
        UpdatedAt : DataTypes.DATE,
        DeletedAt : DataTypes.DATE
    };

    static Model: any = sequelize.define(
        CareplanActivityModel.ModelName,
        CareplanActivityModel.Schema,
        {
            createdAt       : 'CreatedAt',
            updatedAt       : 'UpdatedAt',
            deletedAt       : 'DeletedAt',
            freezeTableName : true,
            timestamps      : true,
            paranoid        : true,
            tableName       : CareplanActivityModel.TableName,
        });

    static associate = (models) => {

        //Add associations here...

        models.CareplanActivity.belongsTo(models.Careplan, {
            sourceKey : 'CareplanId',
            targetKey : 'id',
            as        : 'Careplan'
        });

    };

}
