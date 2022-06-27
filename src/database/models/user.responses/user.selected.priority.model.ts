import * as db from '../../database.connector';
import { DataTypes } from 'sequelize';
const sequelize = db.default.sequelize;

////////////////////////////////////////////////////////////////////////

export class UserSelectedPriorityModel {

    static TableName = 'user_selected_priorities';

    static ModelName = 'UserSelectedPriority';

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
        UserId : {
            type       : DataTypes.UUID,
            allowNull  : false,
            foreignKey : true,
            unique     : false
        },
        CareplanId : {
            type       : DataTypes.INTEGER,
            allowNull  : false,
            foreignKey : true,
            unique     : false
        },
        AssetId : {
            type      : DataTypes.INTEGER,
            allowNull : false
        },
        AssetType : {
            type         : DataTypes.STRING(128),
            allowNull    : false,
            defaultValue : 'Priority'
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
        UserSelectedPriorityModel.ModelName,
        UserSelectedPriorityModel.Schema,
        {
            createdAt       : 'CreatedAt',
            updatedAt       : 'UpdatedAt',
            deletedAt       : 'DeletedAt',
            freezeTableName : true,
            timestamps      : true,
            paranoid        : true,
            tableName       : UserSelectedPriorityModel.TableName,
        });

    static associate = (models) => {

        //Add associations here...

        models.UserSelectedPriority.belongsTo(models.User, {
            sourceKey : 'UserId',
            targetKey : 'id',
            as        : 'User'
        });

        models.UserSelectedPriority.belongsTo(models.Careplan, {
            sourceKey : 'CareplanId',
            targetKey : 'id',
            as        : 'Careplan'
        });

    };

}
