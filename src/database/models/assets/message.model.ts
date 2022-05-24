import {
    DatabaseConnector
} from '../database.connector';

////////////////////////////////////////////////////////////////////////

export class MessageModel {

    static TableName = 'asset_messages';

    static ModelName = 'Message';

    static Schema = () => {

        const db = DatabaseConnector.db();
        const Sequelize: any = db.Sequelize;

        return {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            AssetCode: {
                type: Sequelize.STRING(256),
                allowNull: false
            },
            Name: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            Description: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            Category: {
                type: Sequelize.STRING(128),
                allowNull: false,
                defaultValue: 'Educational'
            },
            MessageType: {
                type: Sequelize.ENUM(["Educational", "Status", "Unknown"]),
                allowNull: false,
                defaultValue: 'Unknown'
            },
            OwnerUserId: {
                type: Sequelize.UUID,
                allowNull: false,
                foreignKey: true,
                unique: false
            },
            Tags: {
                type: Sequelize.TEXT,
                allowNull: false,
                defaultValue: []
            },
            Url: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            Version: {
                type: Sequelize.STRING(128),
                allowNull: false,
                defaultValue: 'V1'
            },

            CreatedAt: Sequelize.DATE,
            UpdatedAt: Sequelize.DATE,
            DeletedAt: Sequelize.DATE
        };
    }

    static Model: any = () => {

        const db = DatabaseConnector.db();
        const sequelize = db.sequelize;
        const schema = MessageModel.Schema();

        return sequelize.define(
            MessageModel.ModelName,
            schema, {
                createdAt: 'CreatedAt',
                updatedAt: 'UpdatedAt',
                deletedAt: 'DeletedAt',
                freezeTableName: true,
                timestamps: true,
                paranoid: true,
                tableName: MessageModel.TableName,
            });
    };

    static associate = (models) => {

        //Add associations here...


        models.Message.belongsTo(models.User, {
            sourceKey: 'OwnerUserId',
            targetKey: 'id',
            as: 'OwnerUser'
        });

    };

}