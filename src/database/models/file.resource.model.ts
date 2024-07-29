import * as db from '../database.connector';
import { DataTypes } from 'sequelize';
const sequelize = db.default.sequelize;

////////////////////////////////////////////////////////////////////////

export class FileResourceModel {

    static TableName = 'file_resources';

    static ModelName = 'FileResource';

    static Schema = {
        id : {
            type         : DataTypes.UUID,
            allowNull    : false,
            defaultValue : DataTypes.UUIDV4,
            primaryKey   : true
        },
        StorageKey : {
            type      : DataTypes.TEXT,
            allowNull : true
        },
        OriginalFilename : {
            type      : DataTypes.STRING(512),
            allowNull : false
        },
        MimeType : {
            type      : DataTypes.STRING(256),
            allowNull : false
        },
        Public : {
            type         : DataTypes.BOOLEAN,
            allowNull    : false,
            defaultValue : false
        },
        Size : {
            type      : DataTypes.INTEGER,
            allowNull : true,
        },
        Tags : {
            type         : DataTypes.TEXT,
            allowNull    : false,
            defaultValue : '[]'
        },
        DownloadCount : {
            type         : DataTypes.INTEGER,
            allowNull    : false,
            defaultValue : 0
        },
        UserId : {
            type       : DataTypes.UUID,
            allowNull  : true,
            foreignKey : true
        },

        CreatedAt : DataTypes.DATE,
        UpdatedAt : DataTypes.DATE,
        DeletedAt : DataTypes.DATE
    };

    static Model: any = sequelize.define(
        FileResourceModel.ModelName,
        FileResourceModel.Schema,
        {
            createdAt       : 'CreatedAt',
            updatedAt       : 'UpdatedAt',
            deletedAt       : 'DeletedAt',
            freezeTableName : true,
            timestamps      : true,
            paranoid        : true,
            tableName       : FileResourceModel.TableName,
        });

    static associate = (models) => {

        //Add associations here...

        models.FileResource.belongsTo(models.User, {
            sourceKey : 'UserId',
            targetKey : 'id',
            as        : 'User'
        });

    };

}
