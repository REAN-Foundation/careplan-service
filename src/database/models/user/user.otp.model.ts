import * as db from '../../database.connector';
import { DataTypes } from 'sequelize';
const sequelize = db.default.sequelize;

////////////////////////////////////////////////////////////////////////

export class UserOtpModel {

    static TableName = 'user_otp';

    static ModelName = 'UserOtp';

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
        Otp : {
            type      : DataTypes.STRING(10),
            allowNull : false,
        },
        Purpose : {
            type         : DataTypes.ENUM("Login", "Verification"),
            allowNull    : false,
            defaultValue : 'Login'
        },
        Channel : {
            type         : DataTypes.ENUM("Mobile", "Email"),
            allowNull    : false,
            defaultValue : 'Mobile'
        },
        Validated : {
            type         : DataTypes.BOOLEAN,
            allowNull    : false,
            defaultValue : false
        },
        ValidFrom : {
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
        UserOtpModel.ModelName,
        UserOtpModel.Schema,
        {
            createdAt       : 'CreatedAt',
            updatedAt       : 'UpdatedAt',
            deletedAt       : 'DeletedAt',
            freezeTableName : true,
            timestamps      : true,
            paranoid        : true,
            tableName       : UserOtpModel.TableName,
        });

    static associate = (models) => {

        //Add associations here...

        models.UserOtp.belongsTo(models.User, {
            sourceKey : 'UserId',
            targetKey : 'id',
            as        : 'User'
        });

    };

}
