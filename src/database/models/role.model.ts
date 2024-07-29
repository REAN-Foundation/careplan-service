import * as db from '../database.connector';
import { DataTypes } from 'sequelize';
const sequelize = db.default.sequelize;

////////////////////////////////////////////////////////////////////////

export class RoleModel {

    static TableName = 'roles';

    static ModelName = 'Role';

    static Schema = {
        id : {
            type          : DataTypes.INTEGER,
            allowNull     : false,
            autoIncrement : true,
            primaryKey    : true
        },

        RoleName : {
            type      : DataTypes.STRING(32),
            allowNull : false
        },

        Description : {
            type      : DataTypes.STRING(256),
            allowNull : true
        },

        CreatedAt : DataTypes.DATE,
        UpdatedAt : DataTypes.DATE,
        DeletedAt : DataTypes.DATE
    };

    static Model: any = sequelize.define(
        RoleModel.ModelName,
        RoleModel.Schema,
        {
            createdAt       : 'CreatedAt',
            updatedAt       : 'UpdatedAt',
            deletedAt       : 'DeletedAt',
            freezeTableName : true,
            timestamps      : true,
            paranoid        : true,
            tableName       : RoleModel.TableName,
        });

    static associate = (models) => {
        //Add associations here...
        models.Role.hasMany(models.RolePrivilege);
    };

}
