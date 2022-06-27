import * as db from '../../database.connector';
import { DataTypes } from 'sequelize';
const sequelize = db.default.sequelize;

////////////////////////////////////////////////////////////////////////

export class UserRoleModel {

    static TableName = 'user_roles';

    static ModelName = 'UserRole';

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
        RoleId : {
            type       : DataTypes.INTEGER,
            allowNull  : false,
            foreignKey : true,
            unique     : false
        },

        CreatedAt : DataTypes.DATE,
        UpdatedAt : DataTypes.DATE,
        DeletedAt : DataTypes.DATE
    };

    static Model: any = sequelize.define(
        UserRoleModel.ModelName,
        UserRoleModel.Schema,
        {
            createdAt       : 'CreatedAt',
            updatedAt       : 'UpdatedAt',
            deletedAt       : 'DeletedAt',
            freezeTableName : true,
            timestamps      : true,
            paranoid        : true,
            tableName       : UserRoleModel.TableName,
        });

    static associate = (models) => {

        //Add associations here...

        models.UserRole.belongsTo(models.User, {
            sourceKey : 'UserId',
            targetKey : 'id',
            as        : 'User'
        });

        models.UserRole.belongsTo(models.Role, {
            sourceKey : 'RoleId',
            targetKey : 'id',
            as        : 'Role'
        });

    };

}
