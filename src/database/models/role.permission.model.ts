import * as db from '../database.connector';
import { DataTypes } from 'sequelize';
const sequelize = db.default.sequelize;

////////////////////////////////////////////////////////////////////////

export class RolePermissionModel {

    static TableName = 'role_permissions';

    static ModelName = 'RolePermission';

    static Schema = {
        id : {
            type         : DataTypes.UUID,
            allowNull    : false,
            defaultValue : DataTypes.UUIDV4,
            primaryKey   : true
        },

        RoleId : {
            type      : DataTypes.INTEGER,
            allowNull : false,
        },

        RoleName : {
            type      : DataTypes.STRING(32),
            allowNull : true
        },
    
        Privilege : {
            type      : DataTypes.STRING(256),
            allowNull : true
        },

        Scope : {
            type      : DataTypes.STRING(256),
            allowNull : false
        },

        Enabled : {
            type         : DataTypes.BOOLEAN,
            allowNull    : false,
            defaultValue : false
        },
        
        CreatedAt : DataTypes.DATE,
        UpdatedAt : DataTypes.DATE,
        DeletedAt : DataTypes.DATE
    };

    static Model: any = sequelize.define(
        RolePermissionModel.ModelName,
        RolePermissionModel.Schema,
        {
            createdAt       : 'CreatedAt',
            updatedAt       : 'UpdatedAt',
            deletedAt       : 'DeletedAt',
            freezeTableName : true,
            timestamps      : true,
            paranoid        : true,
            tableName       : RolePermissionModel.TableName,
        });

    static associate = () => {

        //Add associations here...

    };
}
