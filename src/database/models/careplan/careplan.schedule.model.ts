import { AssetTypeList, TimeSlotList } from '../../../domain.types/assets/asset.types';
import * as db from '../../database.connector';
import { DataTypes } from 'sequelize';
const sequelize = db.default.sequelize;

////////////////////////////////////////////////////////////////////////

export class CareplanScheduleModel {

    static TableName = 'careplan_schedules';

    static ModelName = 'CareplanSchedule';

    static Schema = {
        id : {
            type         : DataTypes.UUID,
            allowNull    : false,
            defaultValue : DataTypes.UUIDV4,
            primaryKey   : true
        },
        AssetId : {
            type      : DataTypes.INTEGER,
            allowNull : false
        },
        AssetType : {
            type      : DataTypes.ENUM({ values: AssetTypeList }),
            allowNull : false
        },
        CareplanId : {
            type       : DataTypes.INTEGER,
            allowNull  : false,
            foreignKey : true,
            unique     : false
        },
        Day : {
            type      : DataTypes.INTEGER,
            allowNull : false
        },
        TimeSlot : {
            type         : DataTypes.ENUM({ values: TimeSlotList }),
            allowNull    : false,
            defaultValue : 'Unspecified'
        },

        CreatedAt : DataTypes.DATE,
        UpdatedAt : DataTypes.DATE,
        DeletedAt : DataTypes.DATE
    };

    static Model: any = sequelize.define(
        CareplanScheduleModel.ModelName,
        CareplanScheduleModel.Schema,
        {
            createdAt       : 'CreatedAt',
            updatedAt       : 'UpdatedAt',
            deletedAt       : 'DeletedAt',
            freezeTableName : true,
            timestamps      : true,
            paranoid        : true,
            tableName       : CareplanScheduleModel.TableName,
        });

    static associate = (models) => {

        //Add associations here...

        models.CareplanSchedule.belongsTo(models.Careplan, {
            sourceKey : 'CareplanId',
            targetKey : 'id',
            as        : 'Careplan'
        });

    };

}
