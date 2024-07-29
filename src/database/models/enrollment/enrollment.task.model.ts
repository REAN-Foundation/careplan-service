import * as db from '../../database.connector';
import { DataTypes } from 'sequelize';
const sequelize = db.default.sequelize;
import { AssetTypeList } from '../../../domain.types/assets/asset.types';
import { TimeSlotList } from '../../../domain.types/assets/asset.types';

////////////////////////////////////////////////////////////////////////

export class EnrollmentTaskModel {

    static TableName = 'enrollment_tasks';

    static ModelName = 'EnrollmentTask';

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
        ParticipantId : {
            type       : DataTypes.UUID,
            allowNull  : false,
            foreignKey : true,
            unique     : false
        },
        CareplanActivityId : {
            type       : DataTypes.UUID,
            allowNull  : false,
            foreignKey : true,
            unique     : false
        },
        AssetId : {
            type      : DataTypes.UUID,
            allowNull : false
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
        TimeSlot : {
            type         : DataTypes.ENUM({ values: TimeSlotList }),
            allowNull    : false,
            defaultValue : 'Unspecified'
        },
        ScheduledDate : {
            type      : DataTypes.DATE,
            allowNull : false
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
        EnrollmentTaskModel.ModelName,
        EnrollmentTaskModel.Schema,
        {
            createdAt       : 'CreatedAt',
            updatedAt       : 'UpdatedAt',
            deletedAt       : 'DeletedAt',
            freezeTableName : true,
            timestamps      : true,
            paranoid        : true,
            tableName       : EnrollmentTaskModel.TableName,
        });

    static associate = (models) => {

        //Add associations here...

        models.EnrollmentTask.belongsTo(models.Enrollment, {
            sourceKey : 'EnrollmentId',
            targetKey : 'id',
            as        : 'Enrollment'
        });

        models.EnrollmentTask.belongsTo(models.Participant, {
            sourceKey : 'ParticipantId',
            targetKey : 'id',
            as        : 'Participant'
        });

        models.EnrollmentTask.belongsTo(models.CareplanActivity, {
            sourceKey : 'CareplanActivityId',
            targetKey : 'id',
            as        : 'CareplanActivity'
        });

        models.EnrollmentTask.belongsTo(models.Careplan, {
            sourceKey : 'CareplanId',
            targetKey : 'id',
            as        : 'Careplan'
        });

    };

}
