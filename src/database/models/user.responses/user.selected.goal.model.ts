import {
    DatabaseConnector
} from '../database.connector';

////////////////////////////////////////////////////////////////////////

export class UserSelectedGoalModel {

    static TableName = 'user_selected_goals';

    static ModelName = 'UserSelectedGoal';

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
                defaultValue: 'Goal'
            },
            AdditionalDetails: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            StartDate: {
                type: Sequelize.DATE,
                allowNull: false
            },
            EndDate: {
                type: Sequelize.DATE,
                allowNull: false
            },
            ProgressStatus: {
                type: Sequelize.ENUM(["Pending", "In-progress", "Completed", "Cancelled", "Delayed", "Unknown"]),
                allowNull: false,
                defaultValue: 'Pending'
            },

            CreatedAt: Sequelize.DATE,
            UpdatedAt: Sequelize.DATE,
            DeletedAt: Sequelize.DATE
        };
    }

    static Model: any = () => {

        const db = DatabaseConnector.db();
        const sequelize = db.sequelize;
        const schema = UserSelectedGoalModel.Schema();

        return sequelize.define(
            UserSelectedGoalModel.ModelName,
            schema, {
                createdAt: 'CreatedAt',
                updatedAt: 'UpdatedAt',
                deletedAt: 'DeletedAt',
                freezeTableName: true,
                timestamps: true,
                paranoid: true,
                tableName: UserSelectedGoalModel.TableName,
            });
    };

    static associate = (models) => {

        //Add associations here...


        models.UserSelectedGoal.belongsTo(models.User, {
            sourceKey: 'UserId',
            targetKey: 'id',
            as: 'User'
        });

        models.UserSelectedGoal.belongsTo(models.Careplan, {
            sourceKey: 'CareplanId',
            targetKey: 'id',
            as: 'Careplan'
        });

    };

}