import {
    DatabaseConnector
} from '../database.connector';

////////////////////////////////////////////////////////////////////////

export class UserSelectedPriorityModel {

    static TableName = 'user_selected_priorities';

    static ModelName = 'UserSelectedPriority';

    static Schema = () => {

        const db = DatabaseConnector.db();
        const Sequelize: any = db.Sequelize;

        return {
            id: {
                type: Sequelize.UUID,
                allowNull: false,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true
            },
            Name: {
                type: Sequelize.STRING(256),
                allowNull: false
            },
            Description: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            UserId: {
                type: Sequelize.UUID,
                allowNull: false,
                foreignKey: true,
                unique: false
            },
            CareplanId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                foreignKey: true,
                unique: false
            },
            AssetId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            AssetType: {
                type: Sequelize.STRING(128),
                allowNull: false,
                defaultValue: 'Priority'
            },
            StartDate: {
                type: Sequelize.DATE,
                allowNull: false
            },

            CreatedAt: Sequelize.DATE,
            UpdatedAt: Sequelize.DATE,
            DeletedAt: Sequelize.DATE
        };
    }

    static Model: any = () => {

        const db = DatabaseConnector.db();
        const sequelize = db.sequelize;
        const schema = UserSelectedPriorityModel.Schema();

        return sequelize.define(
            UserSelectedPriorityModel.ModelName,
            schema, {
                createdAt: 'CreatedAt',
                updatedAt: 'UpdatedAt',
                deletedAt: 'DeletedAt',
                freezeTableName: true,
                timestamps: true,
                paranoid: true,
                tableName: UserSelectedPriorityModel.TableName,
            });
    };

    static associate = (models) => {

        //Add associations here...


        models.UserSelectedPriority.belongsTo(models.User, {
            sourceKey: 'UserId',
            targetKey: 'id',
            as: 'User'
        });

        models.UserSelectedPriority.belongsTo(models.Careplan, {
            sourceKey: 'CareplanId',
            targetKey: 'id',
            as: 'Careplan'
        });

    };

}