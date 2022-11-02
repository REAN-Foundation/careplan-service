import * as db from '../../database.connector';
import { DataTypes } from 'sequelize';
const sequelize = db.default.sequelize;

////////////////////////////////////////////////////////////////////////

export class CareplanModel {

    static TableName  = 'careplans';
    
    static ModelName  = 'Careplan';

    static Schema = {
        id : {
            type         : DataTypes.UUID,
            allowNull    : false,
            defaultValue : DataTypes.UUIDV4,
            primaryKey   : true
        },
        Code : {
            type      : DataTypes.STRING(256),
            allowNull : false,
            unique    : true,
        },
        CategoryId : {
            type       : DataTypes.UUID,
            allowNull  : false,
            foreignKey : true,
            unique     : false,
        },
        Name : {
            type      : DataTypes.STRING(256),
            allowNull : false,
        },
        Description : {
            type      : DataTypes.TEXT,
            allowNull : true,
        },
        Version : {
            type         : DataTypes.STRING(32),
            allowNull    : false,
            defaultValue : '1.0.0',
        },
        OwnerUserId : {
            type      : DataTypes.UUID,
            allowNull : true
        },
        Tags : {
            type         : DataTypes.TEXT,
            allowNull    : false,
            defaultValue : '[]',
        },
        IsActive : {
            type         : DataTypes.BOOLEAN,
            allowNull    : false,
            defaultValue : true,
        },

        CreatedAt : DataTypes.DATE,
        UpdatedAt : DataTypes.DATE,
        DeletedAt : DataTypes.DATE,
    };
    
    static Model: any = sequelize.define(
        CareplanModel.ModelName,
        CareplanModel.Schema,
        {
            createdAt       : 'CreatedAt',
            updatedAt       : 'UpdatedAt',
            deletedAt       : 'DeletedAt',
            freezeTableName : true,
            timestamps      : true,
            paranoid        : true,
            tableName       : CareplanModel.TableName,
        });

    static associate = (models) => {
        models.Careplan.belongsTo(models.CareplanCategory, {
            sourceKey : 'CategoryId',
            targetKey : 'id',
            as        : 'Category',
        });

    };

}
