import * as db from '../../database.connector';
import { DataTypes } from 'sequelize';
const sequelize = db.default.sequelize;

////////////////////////////////////////////////////////////////////////

export class ParticipantSelectedPriorityModel {

    static TableName = 'selected_priorities';

    static ModelName = 'ParticipantSelectedPriority';

    static Schema = {
        id : {
            type         : DataTypes.UUID,
            allowNull    : false,
            defaultValue : DataTypes.UUIDV4,
            primaryKey   : true
        },
        Name : {
            type      : DataTypes.STRING(256),
            allowNull : false
        },
        Description : {
            type      : DataTypes.TEXT,
            allowNull : false
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
        CareplanId : {
            type       : DataTypes.UUID,
            allowNull  : false,
            foreignKey : true,
            unique     : false
        },
        AssetId : {
            type      : DataTypes.UUID,
            allowNull : true
        },
        AssetType : {
            type         : DataTypes.STRING(128),
            allowNull    : true,
            defaultValue : 'Priority'
        },
        AssetCode : {
            type      : DataTypes.STRING(128),
            allowNull : true,
        },
        StartDate : {
            type      : DataTypes.DATE,
            allowNull : false
        },

        CreatedAt : DataTypes.DATE,
        UpdatedAt : DataTypes.DATE,
        DeletedAt : DataTypes.DATE
    };

    static Model: any = sequelize.define(
        ParticipantSelectedPriorityModel.ModelName,
        ParticipantSelectedPriorityModel.Schema,
        {
            createdAt       : 'CreatedAt',
            updatedAt       : 'UpdatedAt',
            deletedAt       : 'DeletedAt',
            freezeTableName : true,
            timestamps      : true,
            paranoid        : true,
            tableName       : ParticipantSelectedPriorityModel.TableName,
        });

    static associate = (models) => {

        //Add associations here...

        models.ParticipantSelectedPriority.belongsTo(models.Enrollment, {
            sourceKey : 'EnrollmentId',
            targetKey : 'id',
            as        : 'Enrollment'
        });
        models.ParticipantSelectedPriority.belongsTo(models.Participant, {
            sourceKey : 'ParticipantId',
            targetKey : 'id',
            as        : 'Participant'
        });
        models.ParticipantSelectedPriority.belongsTo(models.Careplan, {
            sourceKey : 'CareplanId',
            targetKey : 'id',
            as        : 'Careplan'
        });

    };

}
