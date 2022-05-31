import {
    DatabaseConnector
} from '../database.connector';

////////////////////////////////////////////////////////////////////////

export class FileResourceModel {

    static TableName = 'file_resources';

    static ModelName = 'FileResource';

    static Schema = () => {

        const db = DatabaseConnector.db();
        const Sequelize: any = db.Sequelize;

        return {
            id : {
                type         : Sequelize.UUID,
                allowNull    : false,
                defaultValue : Sequelize.UUIDV4,
                primaryKey   : true
            },
            FileName : {
                type      : Sequelize.STRING(256),
                allowNull : true
            },
            UserId : {
                type       : Sequelize.UUID,
                allowNull  : false,
                foreignKey : true,
                unique     : false
            },
            IsPublicResource : {
                type         : Sequelize.BOOLEAN,
                allowNull    : false,
                defaultValue : true
            },
            Tags : {
                type         : Sequelize.TEXT,
                allowNull    : false,
                defaultValue : []
            },
            MimeType : {
                type         : Sequelize.STRING(128),
                allowNull    : true,
                defaultValue : true
            },

            CreatedAt : Sequelize.DATE,
            UpdatedAt : Sequelize.DATE,
            DeletedAt : Sequelize.DATE
        };
    }

    static Model: any = () => {

        const db = DatabaseConnector.db();
        const sequelize = db.sequelize;
        const schema = FileResourceModel.Schema();

        return sequelize.define(
            FileResourceModel.ModelName,
            schema, {
                createdAt       : 'CreatedAt',
                updatedAt       : 'UpdatedAt',
                deletedAt       : 'DeletedAt',
                freezeTableName : true,
                timestamps      : true,
                paranoid        : true,
                tableName       : FileResourceModel.TableName,
            });
    };

    static associate = (models) => {

        //Add associations here...

        models.FileResource.belongsTo(models.User, {
            sourceKey : 'UserId',
            targetKey : 'id',
            as        : 'User'
        });

    };

}
