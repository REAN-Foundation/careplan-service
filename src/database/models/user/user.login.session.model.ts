import * as db from '../../database.connector';
import { DataTypes } from 'sequelize';
const sequelize = db.default.sequelize;

////////////////////////////////////////////////////////////////////////

export class UserLoginSessionModel {

    static TableName = 'user_login_sessions';

    static ModelName = 'UserLoginSession';

    static Schema = {
        id : {
            type         : DataTypes.UUID,
            allowNull    : false,
            defaultValue : DataTypes.UUIDV4,
            primaryKey   : true
        },
        UserId : {
            type       : DataTypes.UUID,
            allowNull  : false,
            foreignKey : true,
            unique     : false
        },
        IsActive : {
            type         : DataTypes.BOOLEAN,
            allowNull    : false,
            defaultValue : true
        },
        StartedAt : {
            type      : DataTypes.DATE,
            allowNull : false
        },
        ValidTill : {
            type      : DataTypes.DATE,
            allowNull : false
        },

        CreatedAt : DataTypes.DATE,
        UpdatedAt : DataTypes.DATE,
        DeletedAt : DataTypes.DATE
    };

    static Model: any = sequelize.define(
        UserLoginSessionModel.ModelName,
        UserLoginSessionModel.Schema,
        {
            createdAt       : 'CreatedAt',
            updatedAt       : 'UpdatedAt',
            deletedAt       : 'DeletedAt',
            freezeTableName : true,
            timestamps      : true,
            paranoid        : true,
            tableName       : UserLoginSessionModel.TableName,
        });

    static associate = (models) => {

        //Add associations here...

        models.UserLoginSession.belongsTo(models.User, {
            sourceKey : 'UserId',
            targetKey : 'id',
            as        : 'User'
        });

    };

}
