import {
    DatabaseConnector
} from '../../database.connector';

////////////////////////////////////////////////////////////////////////

export class ArticleModel {

    static TableName = 'asset_articles';

    static ModelName = 'Article';

    static Schema = () => {

        const db = DatabaseConnector.db();
        const Sequelize: any = db.Sequelize;

        return {
            id : {
                type          : Sequelize.INTEGER,
                allowNull     : false,
                autoIncrement : true,
                primaryKey    : true
            },
            AssetCode : {
                type      : Sequelize.STRING(256),
                allowNull : false
            },
            Name : {
                type      : Sequelize.STRING(256),
                allowNull : false
            },
            Summary : {
                type      : Sequelize.TEXT,
                allowNull : false
            },
            Url : {
                type      : Sequelize.TEXT,
                allowNull : true
            },
            FileResourceId : {
                type       : Sequelize.UUID,
                allowNull  : true,
                foreignKey : true,
                unique     : false
            },
            AssetCategory : {
                type         : Sequelize.STRING(128),
                allowNull    : false,
                defaultValue : 'Educational'
            },
            OwnerUserId : {
                type      : Sequelize.UUID,
                allowNull : true
            },
            Tags : {
                type         : Sequelize.TEXT,
                allowNull    : false,
                defaultValue : []
            },
            Version : {
                type         : Sequelize.STRING(128),
                allowNull    : false,
                defaultValue : 'V1'
            },

            CreatedAt : Sequelize.DATE,
            UpdatedAt : Sequelize.DATE,
            DeletedAt : Sequelize.DATE
        };
    }

    static Model: any = () => {

        const db = DatabaseConnector.db();
        const sequelize = db.sequelize;
        const schema = ArticleModel.Schema();

        return sequelize.define(
            ArticleModel.ModelName,
            schema, {
                createdAt       : 'CreatedAt',
                updatedAt       : 'UpdatedAt',
                deletedAt       : 'DeletedAt',
                freezeTableName : true,
                timestamps      : true,
                paranoid        : true,
                tableName       : ArticleModel.TableName,
            });
    };

    static associate = (models) => {

        //Add associations here...

        models.Article.belongsTo(models.FileResource, {
            sourceKey : 'FileResourceId',
            targetKey : 'id',
            as        : 'FileResource'
        });

    };

}
