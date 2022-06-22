import {
    DatabaseConnector
} from '../../database.connector';

////////////////////////////////////////////////////////////////////////

export class WebLinkModel {

    static TableName = 'asset_web_links';

    static ModelName = 'WebLink';

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
            Description : {
                type      : Sequelize.TEXT,
                allowNull : false
            },
            Url : {
                type      : Sequelize.TEXT,
                allowNull : true
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
        const schema = WebLinkModel.Schema();

        return sequelize.define(
            WebLinkModel.ModelName,
            schema, {
                createdAt       : 'CreatedAt',
                updatedAt       : 'UpdatedAt',
                deletedAt       : 'DeletedAt',
                freezeTableName : true,
                timestamps      : true,
                paranoid        : true,
                tableName       : WebLinkModel.TableName,
            });
    };

    static associate = (models) => {

        //Add associations here...

    };

}
