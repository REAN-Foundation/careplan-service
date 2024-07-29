import * as db from '../../database.connector';
import { DataTypes } from 'sequelize';
const sequelize = db.default.sequelize;
import { GenderList } from '../../../domain.types/miscellaneous/system.types';

////////////////////////////////////////////////////////////////////////

export class UserModel {

    static TableName = 'users';

    static ModelName = 'User';

    static Schema = {
        id : {
            type         : DataTypes.UUID,
            allowNull    : false,
            defaultValue : DataTypes.UUIDV4,
            primaryKey   : true
        },
        RoleId : {
            type       : DataTypes.INTEGER,
            allowNull  : false,
            foreignKey : true,
            unique     : false
        },
        UserName : {
            type      : DataTypes.STRING(32),
            allowNull : false
        },
        Prefix : {
            type         : DataTypes.STRING(16),
            allowNull    : false,
            defaultValue : 'Mr'
        },
        FirstName : {
            type      : DataTypes.STRING(64),
            allowNull : false
        },
        LastName : {
            type      : DataTypes.STRING(64),
            allowNull : false
        },
        CountryCode : {
            type         : DataTypes.STRING(10),
            allowNull    : false,
            defaultValue : '+91'
        },
        Phone : {
            type      : DataTypes.STRING(16),
            allowNull : true
        },
        Email : {
            type      : DataTypes.STRING(256),
            allowNull : true
        },
        Gender : {
            type         : DataTypes.ENUM({ values: GenderList }),
            allowNull    : false,
            defaultValue : 'Male'
        },
        BirthDate : {
            type      : DataTypes.DATE,
            allowNull : true
        },
        Password : {
            type      : DataTypes.STRING(512),
            allowNull : true
        },

        CreatedAt : DataTypes.DATE,
        UpdatedAt : DataTypes.DATE,
        DeletedAt : DataTypes.DATE
    };

    static Model: any = sequelize.define(
        UserModel.ModelName,
        UserModel.Schema,
        {
            createdAt       : 'CreatedAt',
            updatedAt       : 'UpdatedAt',
            deletedAt       : 'DeletedAt',
            freezeTableName : true,
            timestamps      : true,
            paranoid        : true,
            tableName       : UserModel.TableName,
        });

    static associate = (models) => {

        //Add associations here...

        models.User.belongsTo(models.Role, {
            sourceKey : 'RoleId',
            targetKey : 'id',
            as        : 'Role'
        });

    };

}
