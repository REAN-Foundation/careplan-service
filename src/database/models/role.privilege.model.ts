import * as db from '../database.connector';
import { DataTypes } from 'sequelize';
const sequelize = db.default.sequelize;

////////////////////////////////////////////////////////////////////////

export class RolePrivilegeModel {

    static TableName = 'role_privileges';

    static ModelName = 'RolePrivilege';

    static Schema = {
        id : {
            type          : DataTypes.INTEGER,
            allowNull     : false,
            autoIncrement : true,
            primaryKey    : true
        },

        RoleId : {
            type       : DataTypes.INTEGER,
            allowNull  : false,
            foreignKey : true
        },

        RoleName : {
            type      : DataTypes.STRING(32),
            allowNull : true
        },
    
        Privilege : {
            type      : DataTypes.STRING(256),
            allowNull : true
        },

        CreatedAt : DataTypes.DATE,
        UpdatedAt : DataTypes.DATE,
        DeletedAt : DataTypes.DATE
    };

    static Model: any = sequelize.define(
        RolePrivilegeModel.ModelName,
        RolePrivilegeModel.Schema,
        {
            createdAt       : 'CreatedAt',
            updatedAt       : 'UpdatedAt',
            deletedAt       : 'DeletedAt',
            freezeTableName : true,
            timestamps      : true,
            paranoid        : true,
            tableName       : RolePrivilegeModel.TableName,
        });

    static associate = (models) => {
    //Add associations here...
        models.RolePrivilege.belongsTo(models.Role, {
            sourceKey : 'RoleId',
            targetKey : 'id'
        });
    };

}
