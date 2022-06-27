import * as db from '../../database.connector';
import { DataTypes } from 'sequelize';
const sequelize = db.default.sequelize;
import { AssetTypeList } from '../../../domain.types/assets/asset.types';
import { TimeSlotList } from '../../../domain.types/assets/asset.types';

////////////////////////////////////////////////////////////////////////

export class EnrollmentScheduleModel {

    static TableName = 'enrollment_schedules';

    static ModelName = 'EnrollmentSchedule';

    static Schema = {
        id : {
            type         : DataTypes.UUID,
            allowNull    : false,
            defaultValue : DataTypes.UUIDV4,
            primaryKey   : true
        },
        EnrollmentId : {
            type       : DataTypes.UUID,
            allowNull  : false,
            foreignKey : true,
            unique     : false
        },
        UserId : {
            type       : DataTypes.UUID,
            allowNull  : false,
            foreignKey : true,
            unique     : false
        },
        CareplanScheduleId : {
            type       : DataTypes.UUID,
            allowNull  : false,
            foreignKey : true,
            unique     : false
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
        TimeSlot : {
            type         : DataTypes.ENUM({ values: TimeSlotList }),
            allowNull    : false,
            defaultValue : 'Unspecified'
        },
        ScheduledDate : {
            type      : DataTypes.DATE,
            allowNull : false
        },

        CreatedAt : DataTypes.DATE,
        UpdatedAt : DataTypes.DATE,
        DeletedAt : DataTypes.DATE
    };

    static Model: any = sequelize.define(
        EnrollmentScheduleModel.ModelName,
        EnrollmentScheduleModel.Schema,
        {
            createdAt       : 'CreatedAt',
            updatedAt       : 'UpdatedAt',
            deletedAt       : 'DeletedAt',
            freezeTableName : true,
            timestamps      : true,
            paranoid        : true,
            tableName       : EnrollmentScheduleModel.TableName,
        });

    static associate = (models) => {

        //Add associations here...

        models.EnrollmentSchedule.belongsTo(models.Enrollment, {
            sourceKey : 'EnrollmentId',
            targetKey : 'id',
            as        : 'Enrollment'
        });

        models.EnrollmentSchedule.belongsTo(models.User, {
            sourceKey : 'UserId',
            targetKey : 'id',
            as        : 'User'
        });

        models.EnrollmentSchedule.belongsTo(models.CareplanSchedule, {
            sourceKey : 'CareplanScheduleId',
            targetKey : 'id',
            as        : 'CareplanSchedule'
        });

        models.EnrollmentSchedule.belongsTo(models.Careplan, {
            sourceKey : 'CareplanId',
            targetKey : 'id',
            as        : 'Careplan'
        });

    };

}
